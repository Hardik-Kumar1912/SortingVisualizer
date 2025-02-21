export function getInsertionSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return { sortedArray: array, animations };
    const arr = array.slice();
    insertionSortHelper(arr, animations);
    return { sortedArray: arr, animations };
}

function insertionSortHelper(arr, animations) {
    let n = arr.length;
    
    for (let i = 1; i < n; i++) {
        let current = arr[i];
        let j = i - 1;

        // Start comparing backwards
        while (j >= 0 && arr[j] > current) {
            // Turn bars red for comparison
            animations.push([j, j + 1, "compare"]);

            // Swap values
            arr[j + 1] = arr[j];

            // Record swap animation
            animations.push([j + 1, arr[j], "swap"]);

            // Reset color back to original after comparison
            animations.push([j, j + 1, "reset"]);

            j--;
        }

        // Insert current element at the right position
        arr[j + 1] = current;

        // Record the final insertion
        animations.push([j + 1, current, "swap"]);

        // Reset color after insertion
        if (j + 1 !== i) {
            animations.push([j + 1, j + 2, "reset"]);
        }
    }
}
