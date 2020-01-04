function insertion(A) {
	let i, j; 
	for (i = 0; i < A.length; i++) {
		if (i === 0) continue; 

		j = i;
		while (j > 0 && A[j] < A[j - 1]) {
			swap(A, j, j - 1);
			j = j - 1;
		}
	}
}

function swap(A, ind1, ind2) {
	[A[ind1], A[ind2]] = [A[ind2], A[ind1]];
}


module.exports = {
	insertion_sort: insertion
};
