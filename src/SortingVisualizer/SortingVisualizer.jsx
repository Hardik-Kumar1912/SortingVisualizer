import React from "react";
import { getMergeSortAnimations } from "../sortingAlgorithms/mergeSortAlgorithm.js";
import { getSelectionSortAnimations } from "../sortingAlgorithms/selectionSortAlgorithm.js";
import { getBubbleSortAnimations } from "../sortingAlgorithms/bubbleSortAlgorithm.js";
import { getInsertionSortAnimations } from "../sortingAlgorithms/insertionSortAlgorithm.js";
import { getQuickSortAnimations } from "../sortingAlgorithms/quickSortAlgorithm.js";
import { getHeapSortAnimations } from "../sortingAlgorithms/heapSortAlgorithm.js";
import toast from "react-hot-toast";

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      numberOfBars: this.getNumberOfBars(),
      animationSpeed: this.getAnimationSpeed(),
      barHeight: this.getBarHeight(),
      parentHeight: this.getParentHeight(),
    };
  }

  componentDidMount() {
    this.resetArray();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  getNumberOfBars = () => (window.innerWidth < 768 ? 80 : 250);

  getAnimationSpeed = () => (window.innerWidth < 768 ? 4 : 1);

  getBarHeight = () => (window.innerWidth < 768 ? 340 : 460);

  getParentHeight = () => (window.innerWidth < 768 ? 380 : 480);

  handleResize = () => {
    this.setState(
      {
        numberOfBars: this.getNumberOfBars(),
        animationSpeed: this.getAnimationSpeed(),
        barHeight: this.getBarHeight(),
        parentHeight: this.getParentHeight(),
      },
      () => this.resetArray()
    );
  };

  resetArray() {
    const array = [];
    for (let i = 0; i < this.state.numberOfBars; i++) {
      array.push(randomIntFromInterval(5, this.state.barHeight));
    }
    this.setState({ array });
  }

  mergeSort() {
    const { animations } = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? "red" : "turquoise";
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.state.animationSpeed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * this.state.animationSpeed);
      }
    }
  }

  quickSort() {
    const { animations } = getQuickSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const [barOneIdx, barTwoIdx, type] = animations[i];

      if (type === "compare" || type === "revert") {
        const color = type === "compare" ? "red" : "turquoise";
        setTimeout(() => {
          arrayBars[barOneIdx].style.backgroundColor = color;
          arrayBars[barTwoIdx].style.backgroundColor = color;
        }, i * this.state.animationSpeed);
      } else if (type === "swap") {
        setTimeout(() => {
          arrayBars[barOneIdx].style.height = `${barTwoIdx}px`;
        }, i * this.state.animationSpeed);
      }
    }
  }

  heapSort() {
    const { animations } = getHeapSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const [barOneIdx, barTwoIdx, action] = animations[i];

      if (action === "swap") {
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 2 === 0 ? "red" : "turquoise";
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.state.animationSpeed);
      } else if (action === "height") {
        setTimeout(() => {
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${barTwoIdx}px`;
        }, i * this.state.animationSpeed);
      }
    }
  }

  selectionSort() {
    const { animations } = getSelectionSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");

    for (let i = 0; i < animations.length; i++) {
      const animation = animations[i];

      if (animation.length === 2) {
        // Case: Color Change (Comparison)
        const [barOneIdx, barTwoIdx] = animation;
        setTimeout(() => {
          arrayBars[barOneIdx].style.backgroundColor = "red";
          arrayBars[barTwoIdx].style.backgroundColor = "red";
        }, i * this.state.animationSpeed);

        // Reset color back to turquoise after a delay
        setTimeout(() => {
          arrayBars[barOneIdx].style.backgroundColor = "turquoise";
          arrayBars[barTwoIdx].style.backgroundColor = "turquoise";
        }, (i + 1) * this.state.animationSpeed);
      } else {
        // Case: Swap Operation
        setTimeout(() => {
          const [barOneIdx, barTwoIdx, isSwap] = animation;
          if (isSwap) {
            let tempHeight = arrayBars[barOneIdx].style.height;
            arrayBars[barOneIdx].style.height =
              arrayBars[barTwoIdx].style.height;
            arrayBars[barTwoIdx].style.height = tempHeight;
          }
        }, i * this.state.animationSpeed);
      }
    }
  }

  bubbleSort() {
    const { animations } = getBubbleSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");

    for (let i = 0; i < animations.length; i++) {
      const animation = animations[i];

      if (animation[2] === "compare" || animation[2] === "reset") {
        const color = animation[2] === "compare" ? "red" : "turquoise";
        setTimeout(() => {
          arrayBars[animation[0]].style.backgroundColor = color;
          arrayBars[animation[1]].style.backgroundColor = color;
        }, i * this.state.animationSpeed);
      } else if (animation[4] === "swap") {
        setTimeout(() => {
          arrayBars[animation[0]].style.height = `${animation[1]}px`;
          arrayBars[animation[2]].style.height = `${animation[3]}px`;
        }, i * this.state.animationSpeed);
      }
    }
  }

  insertionSort() {
    const { animations } = getInsertionSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");

    for (let i = 0; i < animations.length; i++) {
      const [barOneIdx, barTwoIdx, type] = animations[i];

      setTimeout(() => {
        if (type === "compare") {
          arrayBars[barOneIdx].style.backgroundColor = "red";
          arrayBars[barTwoIdx].style.backgroundColor = "red";
        } else if (type === "swap") {
          arrayBars[barOneIdx].style.height = `${barTwoIdx}px`;
        } else if (type === "reset") {
          arrayBars[barOneIdx].style.backgroundColor = "turquoise";
          arrayBars[barTwoIdx].style.backgroundColor = "turquoise";
        }
      }, i * this.state.animationSpeed);
    }
  }

  testSortingAlgorithms() {
    const array = [];
    const length = randomIntFromInterval(1, 1000);
    for (let i = 0; i < length; i++) {
      array.push(randomIntFromInterval(-1000, 1000));
    }
    const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
    const { sortedArray: mergeSortedArray } = getMergeSortAnimations(
      array.slice()
    );
    const { sortedArray: selectionSortedArray } = getSelectionSortAnimations(
      array.slice()
    );
    const { sortedArray: bubbleSortedArray } = getBubbleSortAnimations(
      array.slice()
    );
    const { sortedArray: heapSortedArray } = getHeapSortAnimations(
      array.slice()
    );
    const { sortedArray: quickSortedArray } = getQuickSortAnimations(
      array.slice()
    );
    const { sortedArray: insertionSortedArray } = getInsertionSortAnimations(
      array.slice()
    );
    if (
      arraysAreEqual(javaScriptSortedArray, mergeSortedArray) &&
      arraysAreEqual(javaScriptSortedArray, selectionSortedArray) &&
      arraysAreEqual(javaScriptSortedArray, bubbleSortedArray) &&
      arraysAreEqual(javaScriptSortedArray, heapSortedArray) &&
      arraysAreEqual(javaScriptSortedArray, quickSortedArray) &&
      arraysAreEqual(javaScriptSortedArray, insertionSortedArray)
    ) {
      toast.success("Algorithms Working Correctly");
    } else {
      toast.error("Algorithms not Working Correctly");
    }
  }

  render() {
    const { array, parentHeight } = this.state;

    return (
      <div className="w-full flex flex-col items-center p-4 bg-gray-900 min-h-screen">
        <h1 className="text-white text-2xl font-bold mb-4 mt-3">
          Sorting Visualizer
        </h1>

        <div className="flex gap-5 mt-4">
          <button
            onClick={() => this.resetArray()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
          >
            Generate New Array
          </button>
          <button
            onClick={() => this.testSortingAlgorithms()}
            className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-800 transition"
          >
            Test Sorting Algorithms
          </button>
        </div>

        {/* Sorting Bars */}
        <div
          className="flex items-end space-x-0.5 border border-gray-700 p-2 bg-gray-800 w-full max-w-5xl overflow-hidden mt-7"
          style={{ height: `${parentHeight}px` }}
        >
          {array.map((value, idx) => (
            <div
              className="array-bar bg-teal-400"
              key={idx}
              style={{
                height: `${value}px`,
                width: "2px",
              }}
            ></div>
          ))}
        </div>

        {/* Buttons */}

        <div className="flex gap-5 flex-wrap mt-5 justify-center items-center">
          <button
            onClick={() => this.mergeSort()}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800 transition"
          >
            Merge Sort
          </button>
          <button
            onClick={() => this.selectionSort()}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800 transition"
          >
            Selection Sort
          </button>
          <button
            onClick={() => this.bubbleSort()}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800 transition"
          >
            Bubble Sort
          </button>
          <button
            onClick={() => this.quickSort()}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800 transition"
          >
            Quick Sort
          </button>
          <button
            onClick={() => this.insertionSort()}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800 transition"
          >
            Insertion Sort
          </button>
          <button
            onClick={() => this.heapSort()}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800 transition"
          >
            Heap Sort
          </button>
        </div>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}
