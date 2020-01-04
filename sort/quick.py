
def qsort(array, left, right):
    # ficticiously divide the array by a pivot
    pivot = partition(array, left, right);

    if pivot > left:
        qsort(array, left, pivot - 1);

    if pivot < right:
        qsort(array, pivot + 1, right);

    return;

def partition(array, left, right):

    current_value = array[left];
    pivot = right;
    pivot_value = array[right];
    wall = left;

    for i in range(left, right + 1):
        current_value = array[i];

        if i == pivot:
            (array[wall], array[pivot]) = (array[pivot], array[wall]);
            (wall, pivot) = (pivot, wall);

        elif current_value < pivot_value:
            # swap with wall
            temp = array[wall];
            array[wall] = array[i];
            array[i] = temp;

            if (wall + 1) <= right:
                wall += 1;

    return pivot;
