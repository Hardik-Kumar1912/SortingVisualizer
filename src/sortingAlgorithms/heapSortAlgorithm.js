export function getHeapSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return { sortedArray: array, animations };
  
    const n = array.length;
    const auxiliaryArray = array.slice();
  
    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(auxiliaryArray, n, i, animations);
    }
  
    // Extract elements from the heap
    for (let i = n - 1; i > 0; i--) {
      // Swap root with last element
      animations.push([0, i, "swap"]); // Highlight
      animations.push([0, i, "swap"]); // Unhighlight
      [auxiliaryArray[0], auxiliaryArray[i]] = [auxiliaryArray[i], auxiliaryArray[0]];
      animations.push([i, auxiliaryArray[i], "height"]); // Change height
      animations.push([0, auxiliaryArray[0], "height"]); // Change height
  
      // Call heapify on reduced heap
      heapify(auxiliaryArray, i, 0, animations);
    }
  
    return { sortedArray: auxiliaryArray, animations };
  }
  
  function heapify(array, n, i, animations) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
  
    if (left < n && array[left] > array[largest]) {
      largest = left;
    }
  
    if (right < n && array[right] > array[largest]) {
      largest = right;
    }
  
    if (largest !== i) {
      animations.push([i, largest, "swap"]); // Highlight
      animations.push([i, largest, "swap"]); // Unhighlight
      [array[i], array[largest]] = [array[largest], array[i]];
      animations.push([i, array[i], "height"]); // Change height
      animations.push([largest, array[largest], "height"]); // Change height
  
      heapify(array, n, largest, animations);
    }
  }
  