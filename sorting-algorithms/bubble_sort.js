function bubble_sort_copy(array) {
	let copy = array.slice(); 
	bubble_sort(copy);
	return copy;
}

function bubble_sort(array) {
	while(true) {
		if (!bubble(array)) {
			break;
		}
	}

	return array;
}

function bubble(array) {
	let i, elem, tmp; 
	let swapped = false; 

	for (i = 0; i < array.length - 1; i++ ) {
		elem = array[i];
		next = array[i + 1]; 

		if (elem > next) {
			[array[i], array[i + 1]] = [next, elem]; 
			swapped = true;
		}
	}

	return swapped;
}


module.exports = {
	bubble_sort, 
	bubble_sort_copy
};