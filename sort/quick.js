function quick_sort_copy(A, lower, upper) {
	let A_c = A.slice();
	quick(A_c, lower, upper);
	return A_c;
}

function quick(A) {
	_quick_sort(A, 0, A.length - 1);
}

function _quick_sort(A, lower, upper) {
	if (lower >= upper) {
		return;
	}

	let p = partition(A, lower, upper);
	_quick_sort(A, lower, p - 1); 
	_quick_sort(A, p + 1, upper);
}

function partition(A, lower, upper) {
	let pivot = A[upper]; 
	let i = lower - 1;

	let j; 
	for (j = lower; j < upper; j++ ) {
		if (A[j] <= pivot) {
			i = i + 1; 
			swap(A, i, j);
		}
	}
	swap(A, i + 1, upper);
	return i + 1;
}

function swap(A, ind1, ind2) {
	let tmp = A[ind1]; 
	A[ind1] = A[ind2]; 
	A[ind2] = tmp;
}


module.exports = {
	quick_sort: quick,
	quick_sort_copy
};
