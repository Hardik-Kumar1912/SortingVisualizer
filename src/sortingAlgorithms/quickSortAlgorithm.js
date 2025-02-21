export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return { sortedArray: array, animations };
    const auxiliaryArray = array.slice();
    quickSortHelper(auxiliaryArray, 0, auxiliaryArray.length - 1, animations);
    return { sortedArray: auxiliaryArray, animations };
  }
  
  function quickSortHelper(array, low, high, animations) {
    if (low >= high) return;
    const pivotIdx = partition(array, low, high, animations);
    quickSortHelper(array, low, pivotIdx - 1, animations);
    quickSortHelper(array, pivotIdx + 1, high, animations);
  }
  
  function partition(array, low, high, animations) {
    let pivotValue = array[high]; // Choose last element as pivot
    let pivotIdx = low;
  
    for (let i = low; i < high; i++) {
      // Mark elements being compared
      animations.push([i, high, "compare"]); // Turn red
      animations.push([i, high, "revert"]);  // Turn turquoise
  
      if (array[i] < pivotValue) {
        // Swap elements
        animations.push([i, array[pivotIdx], "swap"]);
        animations.push([pivotIdx, array[i], "swap"]);
        [array[i], array[pivotIdx]] = [array[pivotIdx], array[i]];
        pivotIdx++;
      }
    }
  
    // Swap pivot with final position
    animations.push([pivotIdx, high, "compare"]);
    animations.push([pivotIdx, high, "revert"]);
    animations.push([pivotIdx, array[high], "swap"]);
    animations.push([high, array[pivotIdx], "swap"]);
    [array[pivotIdx], array[high]] = [array[high], array[pivotIdx]];
  
    return pivotIdx;
  }
  