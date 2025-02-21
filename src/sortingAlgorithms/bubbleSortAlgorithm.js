export function getBubbleSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return { sortedArray: array, animations };
    bubbleSortHelper(array, animations);
    return { sortedArray: array, animations };
  }
  
  function bubbleSortHelper(arr, animations) {
    const n = arr.length;
    let swapped;
  
    for (let counter = 0; counter < n - 1; counter++) {
      swapped = false;
  
      for (let i = 0; i < n - counter - 1; i++) {
    
        animations.push([i, i + 1, "compare"]);
        
        if (arr[i] > arr[i + 1]) {
          // Swap elements
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
          swapped = true;
  
          // Record swap (update heights)
          animations.push([i, arr[i], i + 1, arr[i + 1], "swap"]);
        }
        
        animations.push([i, i + 1, "reset"]);
      }
  
      if (!swapped) break;
    }
  }
  