function cocktail_sort(A) {
	let i = 0, j = A.length - 1;
	while (i <= j) {
		forward(A, i, j);
		j = j - 1;
		backward(A, i, j);
		i = i + 1;
	}

	return A;
}

function forward(A, lower, upper) {
	let largest = lower;

	let i; 
	for (i = lower + 1; i <= upper; i++) {
		if (A[i] > A[largest]) {
			largest = i;
		}
	}

	swap(A, upper, largest);
}

function backward(A, lower, upper) {
	let smallest = upper;

	let i; 
	for (i = upper; i >= lower; i--) {
		if (A[i] < A[smallest]) {
			smallest = i;
		}
	}

	swap(A, lower, smallest);
}

function swap(A, ind1, ind2) {
	[A[ind1], A[ind2]] = [A[ind2], A[ind1]];
}


module.exports = {
	cocktail_sort
};