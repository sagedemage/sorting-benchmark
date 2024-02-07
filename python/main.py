import time
import tracemalloc


def bubblesort(nums: list):
    """
    Time complexity:
    - Best: O(n)
    - Average: O(n^2)
    - Worst: O(n^2)
    Space complexity: O(1)
    """
    for i in range(len(nums)):
        unsorted = False
        for j in range(len(nums) - 1):
            if nums[j] > nums[j + 1]:
                key = nums[j]
                unsorted = True
                nums[j] = nums[j + 1]
                nums[j + 1] = key
        if not unsorted:
            break
    return nums


def partition(nums: list, low: int, high: int):
    pivot = nums[high]

    i = low - 1
    j = low
    while j < high:
        if nums[j] <= pivot:
            i += 1
            key = nums[i]
            nums[i] = nums[j]
            nums[j] = key
        j += 1

    key = nums[i + 1]
    nums[i + 1] = nums[high]
    nums[high] = key

    return i + 1


def quicksort(nums: list, low: int, high: int):
    """
    Time complexity:
    - Best: O(nlogn)
    - Average: O(nlogn)
    - Worst: O(n^2)
    Space complexity: O(logn)
    """
    if low < high:
        partition_index = partition(nums, low, high)

        quicksort(nums, low, partition_index - 1)
        quicksort(nums, partition_index + 1, high)

    return nums


def merge(left: list, right: list):
    result = []
    i = 0
    j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    while i < len(left):
        result.append(left[i])
        i += 1
    while j < len(right):
        result.append(right[j])
        j += 1
    return result


def mergesort(nums: list):
    """
    Time complexity:
    - Best: O(nlogn)
    - Average: O(nlogn)
    - Worst: O(nlogn)
    Space complexity: O(n)
    """
    if len(nums) < 2:
        return nums

    mid = int(len(nums) / 2)

    left = nums[:mid]
    right = nums[mid:]

    return merge(mergesort(left), mergesort(right))


total_t = 0
result = []

nums = [
    200, 199, 198, 197, 196, 195, 194, 193, 192, 191,
    190, 189, 188, 187, 186, 185, 184, 183, 182, 181,
    180, 179, 178, 177, 176, 175, 174, 173, 172, 171,
    170, 169, 168, 167, 166, 165, 164, 163, 162, 161,
    160, 159, 158, 157, 156, 155, 154, 153, 152, 151,
    150, 149, 148, 127, 146, 145, 144, 143, 142, 141,
    140, 139, 138, 137, 136, 135, 134, 133, 132, 131,
    130, 129, 128, 127, 126, 125, 124, 123, 122, 121,
    120, 119, 118, 117, 116, 115, 114, 113, 112, 111,
    110, 109, 108, 107, 106, 105, 104, 103, 102, 101,
    100, 99, 98, 97, 96, 95, 94, 93, 92, 91,
    90, 89, 88, 87, 86, 85, 84, 83, 82, 81,
    80, 79, 78, 77, 76, 75, 74, 73, 72, 71,
    70, 69, 68, 67, 66, 65, 64, 63, 62, 61,
    60, 59, 58, 57, 56, 55, 54, 53, 52, 51,
    50, 49, 48, 47, 46, 45, 44, 43, 42, 41,
    40, 39, 38, 37, 36, 35, 34, 33, 32, 31,
    30, 29, 28, 27, 26, 25, 24, 23, 22, 21,
    20, 19, 18, 17, 16, 15, 14, 13, 12, 11,
    10, 9, 8, 7, 6, 5, 4, 3, 2, 1,
]

for i in range(100):
    temp_nums = nums.copy()
    start_t = time.time()
    result = bubblesort(temp_nums)
    exe_t = time.time() - start_t
    total_t += exe_t * 10 ** 6

temp_nums = nums.copy()

tracemalloc.start()

result = bubblesort(temp_nums)

used_mem = round(tracemalloc.get_traced_memory()[0] / 1024, 3)

tracemalloc.stop()

avg_t = int(total_t / 100)

print("bubble sort")
print(result)
print(str(avg_t) + " us")
print(str(used_mem) + " KiB\n")

total_t = 0
result = []

for i in range(100):
    temp_nums = nums.copy()
    start_t = time.time()
    result = quicksort(temp_nums, 0, len(nums) - 1)
    exe_t = time.time() - start_t
    total_t += exe_t * 10 ** 6

temp_nums = nums.copy()

tracemalloc.start()

result = quicksort(temp_nums, 0, len(nums) - 1)

used_mem = round(tracemalloc.get_traced_memory()[0] / 1024, 3)

tracemalloc.stop()

avg_t = int(total_t / 100)

print("quick sort")
print(result)
print(str(avg_t) + " us")
print(str(used_mem) + " KiB\n")

total_t = 0
result = []

for i in range(100):
    temp_nums = nums.copy()
    start_t = time.time()
    result = mergesort(temp_nums)
    exe_t = time.time() - start_t
    total_t += exe_t * 10 ** 6

tracemalloc.start()

result = mergesort(temp_nums)

used_mem = round(tracemalloc.get_traced_memory()[0] / 1024, 3)

tracemalloc.stop()

avg_t = int(total_t / 100)

print("merge sort")
print(result)
print(str(avg_t) + " us")
print(str(used_mem) + " KiB\n")
