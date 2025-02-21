export function getSelectionSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return { sortedArray: array, animations };
  selectionSortHelper(array, animations);
  return { sortedArray: array, animations };
}

function selectionSortHelper(mainArray, animations) {
  const n = mainArray.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < n; j++) {
      animations.push([minIndex, j]);
      animations.push([minIndex, j]);

      if (mainArray[j] < mainArray[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      animations.push([i, minIndex, true]);
      [mainArray[i], mainArray[minIndex]] = [mainArray[minIndex], mainArray[i]];
    }
  }
}
