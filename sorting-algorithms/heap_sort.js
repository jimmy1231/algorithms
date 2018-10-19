function heap_sort(A) {
	build_max_heap(A); 

	let i, sorted = []; 
	for (i = A.length - 1; i > 0; i--) {
		swap(A, 0, A.length - 1);
		sorted.unshift(A[A.length - 1]);
		max_heapify(A = A.slice(0, A.length - 1), 0);
	}

	sorted.unshift(A[0]);
	return sorted;
}

function build_max_heap(A) {
	let i; 
	for (i = Math.floor((A.length - 1) / 2); i >= 0; i--) {
		max_heapify(A, i);
	}
}

function max_heapify(A, i) {
	let l = left(A, i);
	let r = right(A, i);

	if (!l && !r)
		return;

	let largest = i; 
	if (l && A[l] > A[largest]) {
		largest = l;
	} 
	if (r && A[r] > A[largest]) {
		largest = r;
	}

	if (largest === i)
		return;

	swap(A, i, largest);
	max_heapify(A, largest);
}

function left(A, i) {
	let l = 2 * i + 1;
	return l < A.length ? l : null;
}

function right(A, i) {
	let r = 2 * i + 2;
	return r < A.length ? r : null;
}

function swap(A, ind1, ind2) {
	[A[ind1], A[ind2]] = [A[ind2], A[ind1]];
}


module.exports = {
	heap_sort, 
	max_heapify, 
	build_max_heap
};