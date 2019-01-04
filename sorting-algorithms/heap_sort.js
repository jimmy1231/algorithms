function heap_sort(A, descending) {
	let comparator = (n1, n2) => {
		if (n1 > n2) return 1;
		if (n1 < n2) return -1;
		return 0;
	};

	if (!descending) {
		return heap_sort_ascending(A, comparator);
	} else {
		return heap_sort_descending(A, comparator);
	}
}

function heap_sort_ascending(A, comparator) {
	build_min_heap(A, comparator); 

	let i, sorted = []; 
	for (i = A.length - 1; i > 0; i--) {
		swap(A, 0, A.length - 1);
		sorted.push(A[A.length - 1]);

		min_heapify(A = A.slice(0, A.length - 1), 0, comparator);
	}

	sorted.push(A[0]);
	return sorted;
}

function heap_sort_descending(A, comparator) {
	build_max_heap(A, comparator); 

	let i, sorted = []; 
	for (i = A.length - 1; i > 0; i--) {
		swap(A, 0, A.length - 1);
		sorted.push(A[A.length - 1]);

		max_heapify(A = A.slice(0, A.length - 1), 0, comparator);
	}

	sorted.push(A[0]);
	return sorted;
}

function build_max_heap(A, comparator) {
	let i; 
	for (i = Math.floor((A.length - 1) / 2); i >= 0; i--) {
		max_heapify(A, i, comparator);
	}
}

function build_min_heap(A, comparator) {
	let i; 
	for (i = Math.floor((A.length - 1) / 2); i >= 0; i--) {
		min_heapify(A, i, comparator);
	}
}

function max_heapify(A, i, comparator) {
	let l = left(A, i);
	let r = right(A, i);

	if (!l && !r)
		return;

	let largest = i;
	if (l && (comparator(A[l], A[largest]) > 0)) {
		largest = l;
	} 
	if (r && (comparator(A[r], A[largest]) > 0)) {
		largest = r;
	}

	if (largest === i)
		return;

	swap(A, i, largest);
	max_heapify(A, largest, comparator);
}

function min_heapify(A, i, comparator) {
	let l = left(A, i);
	let r = right(A, i);

	if (!l && !r)
		return;

	let smallest = i; 
	if (l && (comparator(A[l], A[smallest]) < 0)) {
		smallest = l;
	} 
	if (r && (comparator(A[r], A[smallest]) < 0)) {
		smallest = r;
	}

	if (smallest === i)
		return;

	swap(A, i, smallest);
	min_heapify(A, smallest, comparator);
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
	min_heapify,
	build_max_heap,
	build_min_heap
};