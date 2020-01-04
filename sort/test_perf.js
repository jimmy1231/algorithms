const { bubble_sort    } = require('./bubble');
const { cocktail_sort  } = require('./cocktail');
const { heap_sort      } = require('./heap');
const { merge_sort     } = require('./merge');
const { quick_sort     } = require('./quick');
const { insertion_sort } = require('./insertion');

function test_perf(A) {
	let B = timed(A.slice(), bubble_sort, 'Bubble Sort');
	let C = timed(A.slice(), cocktail_sort, 'Cocktail Sort');
	let I = timed(A.slice(), insertion_sort, 'Insertion Sort');
	let H = timed(A.slice(), heap_sort, 'Heap Sort');
	let M = timed(A.slice(), merge_sort, 'Merge Sort');
	let Q = timed(A.slice(), quick_sort, 'Quick Sort');
}

function timed(A, algo, name) {
	let start = new Date().getTime();
	algo(A);
	let end = new Date().getTime(); 

	console.log(`${name}\t: ${(end - start) / 1000} Seconds`);
	return A;
}


test_perf([...Array(10000)].map(() => Math.random() * 10000));
