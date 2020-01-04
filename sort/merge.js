function merge(A) {
	_merge_sort(A, 0, A.length - 1);
}

function _merge_sort(A, lower, upper) {
	if (lower >= upper)
		return;

	let pivot = Math.floor((upper - lower) / 2) + lower;

	_merge_sort(A, lower, pivot); 
	_merge_sort(A, pivot + 1, upper);
	merge(A, lower, pivot, upper);
}

function merge(A, lower, pivot, upper) {
	let i = lower, j = pivot + 1;
	let right, left;
	let arr = [];

	while (true) {
		left = i <= pivot ? A[i] : undefined; 
		right = j <= upper ? A[j] : undefined; 

		if (!right && !left) {
			break;
		} else if (!right && left) {
			arr.push(left);
			i++;
			continue;
		} else if (!left && right) {
			arr.push(right);
			j++;
			continue;
		}

		if (left <= right) {
			arr.push(left);
			i++;
		} else {
			arr.push(right);
			j++;
		}
	}

	copy_into(A, arr, lower, upper); 
}

function copy_into(A, arr, lower, upper) {
	let i, j = 0; 
	for (i = lower; i <= upper; i++) {
		A[i] = arr[j];
		j = j + 1;
	}
}


module.exports = {
	merge_sort: merge
};
