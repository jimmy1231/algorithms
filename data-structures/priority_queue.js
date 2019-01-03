const Heap = require('../sorting-algorithms/heap_sort');


class PriorityQueue {
    constructor(comparator) {
        this.queue = []; 
        this.comparator = comparator;

        if (!this.comparator) {
            this.comparator = (n1, n2) => {
                if (n1 > n2) return 1; 
                if (n1 < n2) return -1; 
                return 0;
            };
        }
    }

    get top() {
        return this.queue[0];
    }

    get list() {
        return this.queue.slice();
    }

    push(obj) {
        this.queue.push(obj);
        this.reheap();
    }

    pop() {
        let obj = this.queue.shift(); 
        this.reheap();
    }

    reheap() {
        Heap.build_min_heap(
            this.queue, this.comparator
        );
    }
}

module.exports = PriorityQueue; 