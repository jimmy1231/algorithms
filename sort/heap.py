def heapsort(array):
    sorted = [];
    heap = make_heap(array);

    while len(heap) != 0:
        print len(heap);
        sorted.append(get_heap_top(heap));
        bubble_down(heap, 0);

    return sorted;

def make_heap(array):
    heap = [];

    for element in array:
        heap.append(element);
        bubble_up(heap, heap.index(element));

    return heap;

def get_heap_top(heap):
    top= heap[0];

    (heap[0], heap[len(heap) - 1]) = (heap[len(heap) - 1], heap[0]);
    heap.pop(len(heap) - 1);

    return top;

def bubble_up(heap, element_index):
    # IMPORTANT: INDEX OF HEAP STARTS FROM 1 (e.g. 1, 2, 3, 4, 5, ...)
    parent_index = get_parent_index(element_index);

    if parent_index >= 0:
        parent = heap[parent_index];
        element = heap[element_index];

        if element > parent:
            # swap values of current element with its parent, then recursively call validate heap
            (heap[element_index], heap[parent_index]) = (heap[parent_index], heap[element_index]);
            bubble_up(heap, parent_index);

    return

def bubble_down(heap, element_index):
    child_index = get_child_index(heap, element_index);

    if child_index <= (len(heap) - 1):
        child = heap[child_index];
        element = heap[element_index];

        if child > element:
            # swap values of current element with its parent, then recursively call validate heap
            (heap[element_index], heap[child_index]) = (heap[child_index], heap[element_index]);
            print heap;
            bubble_down(heap, child_index);

    return

def get_parent_index(element_index):
    parent_index = 1;
    element_index += 1;

    if element_index % 2 == 0:
        parent_index = element_index / 2;
    else:
        parent_index = (element_index - 1) / 2;

    return parent_index - 1;

# 0 = left, 1 = right
def get_child_index(heap, parent_index):
    parent_index += 1;
    left_child_ind = (parent_index * 2);
    right_child_ind = (parent_index * 2) + 1;
    heap_length = len(heap);

    if left_child_ind > heap_length and right_child_ind <= heap_length:
        return right_child_ind - 1;
    elif right_child_ind > heap_length and left_child_ind <= heap_length:
        return left_child_ind - 1;
    elif right_child_ind > heap_length and left_child_ind > heap_length:
        return len(heap);
    else:
        if heap[left_child_ind - 1] > heap[right_child_ind - 1]:
            return left_child_ind - 1;
        else:
            return right_child_ind - 1;

# Place for testing
a = [5, 2, 5, 1, 10, 40, 0, 30, 25];
print heapsort(a);
