function heap(A, descending) {
	if (!descending) {
		return heap_sort_ascending(A);
	} else {
		return heap_sort_descending(A);
	}
}

function heap_sort_ascending(A) {
	build_min_heap(A); 

	let i, sorted = []; 
	for (i = A.length - 1; i > 0; i--) {
		sorted.push(A[0]);
		min_heapify(A = A.slice(1, A.length), 0);
	}

	sorted.push(A[0]);
	return sorted;
}

function heap_sort_descending(A) {
	build_max_heap(A); 

	let i, sorted = []; 
	for (i = A.length - 1; i > 0; i--) {
		sorted.push(A[0]);
		max_heapify(A = A.slice(1, A.length), 0);
	}

	sorted.push(A[0]);
	return sorted;
}

function build_max_heap(A) {
	let i; 
	for (i = Math.floor((A.length - 1) / 2); i >= 0; i--) {
		max_heapify(A, i);
	}
}

function build_min_heap(A) {
	let i; 
	for (i = Math.floor((A.length - 1) / 2); i >= 0; i--) {
		min_heapify(A, i);
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

function min_heapify(A, i) {
	let l = left(A, i);
	let r = right(A, i);

	if (!l && !r)
		return;

	let smallest = i; 
	if (l && A[l] < A[smallest]) {
		smallest = l;
	} 
	if (r && A[r] < A[smallest]) {
		smallest = r;
	}

	if (smallest === i)
		return;

	swap(A, i, smallest);
	min_heapify(A, smallest);
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
	heap_sort: heap,
	max_heapify, 
	min_heapify,
	build_max_heap,
	build_min_heap
};
