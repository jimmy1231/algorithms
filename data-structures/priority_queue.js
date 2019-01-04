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

    get size() {
        return this.queue.length;
    }

    push(obj) {
        this.queue.unshift(obj);
        this.heapify();
    }

    pop() {
        if (!this.queue.length) {
            return null;
        }

        let obj = this.queue[0];
        this.swap(0, this.queue.length - 1); 
        this.queue = this.queue.slice(0, this.queue.length - 1);

        this.heapify();
        return obj;
    }

    heapify() {
        Heap.min_heapify(this.queue, 0, this.comparator);
    }

    swap(ind1, ind2) {
        let A = this.queue;
        [A[ind1], A[ind2]] = [A[ind2], A[ind1]];
    }
}

module.exports = PriorityQueue; 