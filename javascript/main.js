/**
 * Bubblesort
 * @param {any[]} nums
 * @returns {any[]}
 */
function bubblesort(nums) {
	/*
	Time complexity:
	- Best: O(n)
	- Average: O(n^2)
	- Worst: O(n^2)
	Space complexity: O(1)
	*/
	for (let i = 0; i < nums.length; i++) {
		let unsorted = false;
		for (let j = 0; j < nums.length; j++) {
			if (nums[j] > nums[j + 1]) {
				let key = nums[j];
				unsorted = true;
				nums[j] = nums[j + 1];
				nums[j + 1] = key;
			}
		}
		if (!unsorted) {
			break;
		}
	}
	return nums;
}

/**
 * Partition
 * @param {any[]} nums
 * @param {number} low
 * @param {number} high
 * @returns {number}
 */
function partition(nums, low, high) {
	let pivot = nums[high];

	let i = low - 1;

	for (let j = low; j < high; j++) {
		if (nums[j] <= pivot) {
			i++;
			let key = nums[i];
			nums[i] = nums[j];
			nums[j] = key;
		}
	}

	let key = nums[i + 1];
	nums[i + 1] = nums[high];
	nums[high] = key;

	return i + 1;
}

/**
 * Quicksort
 * @param {any[]} nums
 * @param {number} low
 * @param {number} high
 * @returns {any[]}
 */
function quicksort(nums, low, high) {
	/*
	Time complexity:
	- Best: O(nlogn)
	- Average: O(nlogn)
	- Worst: O(n^2)
	Space complexity: O(logn)
	*/
	if (low < high) {
		const partition_index = partition(nums, low, high);

		quicksort(nums, low, partition_index - 1);
		quicksort(nums, partition_index + 1, high);
	}

	return nums;
}

/**
 * Merge
 * @param {any[]} left
 * @param {any[]} right
 * @returns {any[]}
 */
function merge(left, right) {
	let result = [];
	let i = 0;
	let j = 0;

	while (i < left.length && j < right.length) {
		if (left[i] <= right[j]) {
			result.push(left[i]);
			i++;
		}
		else {
			result.push(right[j]);
			j++;
		}
	}

	while (i < left.length) {
		result.push(left[i]);
		i++;
	}
	while (j < right.length) {
		result.push(right[j]);
		j++;
	}

	return result;

}

/**
 * Mergesort
 * @param {any[]} nums
 * @returns {any[]}
 */
function mergesort(nums) {
	/*
	Time complexity:
	- Best: O(nlogn)
	- Average: O(nlogn)
	- Worst: O(nlogn)
	Space complexity: O(n)
	*/
	if (nums.length < 2) {
		return nums;
	}

	let mid = parseInt(nums.length / 2);
	let left = nums.slice(0, mid);
	let right = nums.slice(mid, nums.length);

	return merge(mergesort(left), mergesort(right));
}

/**
 * Heapify
 * @param {any[]} nums
 * @param {number} count
 * @param {number} i
 * @returns {any[]}
 */
function heapify(nums, count, i) {
	let largest = i;
	let left = 2 * i + 1;
	let right = 2 * i + 2;

	if (left < count && nums[left] > nums[largest]) {
		largest = left;
	}
	if (right < count && nums[right] > nums[largest]) {
		largest = right;
	}

	if (largest != i) {
		let key = nums[i];
		nums[i] = nums[largest];
		nums[largest] = key;

		heapify(nums, count, largest);
	}
}

/**
 * Heapsort
 * @param {any[]} nums
 * @returns {any[]}
 */
function heapsort(nums) {
	/*
	Time complexity:
	- Best: O(nlogn)
	- Average: O(nlogn)
	- Worst: O(nlogn)
	Space complexity: O(1)
	*/

	let count = nums.length;

	for (let i = parseInt(count / 2) - 1; i >= 0; i--) {
		heapify(nums, count, i);
	}

	for (let i = count - 1; i >= 0; i--) {
		let key = nums[0];
		nums[0] = nums[i];
		nums[i] = key;

		heapify(nums, i, 0);
	}

	return nums;
}

let total_t = 0;
let result = [];

let nums = [
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
];

/* Bubble sort bechmark */

for (let i = 0; i < 100; i++) {
	let temp_nums = JSON.parse(JSON.stringify(nums));

	let start = process.hrtime()[1];
	result = bubblesort(temp_nums);
	let exe_t = process.hrtime()[1] - start;
	total_t += exe_t;
}

let temp_nums = JSON.parse(JSON.stringify(nums));

let used_mem1 = process.memoryUsage();

result = bubblesort(temp_nums);

let used_mem2 = process.memoryUsage();

let used_mem = Math.round((used_mem2.heapUsed - used_mem1.heapUsed) / 1024 * 1000) / 1000;

let avg_t = parseInt((total_t / 1000) / 100);

console.log("bubblesort");
console.log(result);
console.log(avg_t + " us");
console.log(used_mem + " KiB\n");

/* Quick sort bechmark */

total_t = 0;

for (let i = 0; i < 100; i++) {
	let temp_nums = JSON.parse(JSON.stringify(nums));

	let start = process.hrtime()[1];
	result = quicksort(temp_nums, 0, temp_nums.length - 1);
	let exe_t = process.hrtime()[1] - start;
	total_t += exe_t;
}

temp_nums = JSON.parse(JSON.stringify(nums));

used_mem1 = process.memoryUsage();

result = quicksort(temp_nums, 0, temp_nums.length - 1);

used_mem2 = process.memoryUsage();

used_mem = Math.round((used_mem2.heapUsed - used_mem1.heapUsed) / 1024 * 1000) / 1000;

avg_t = parseInt((total_t / 1000) / 100);

console.log("quicksort");
console.log(result);
console.log(avg_t + " us");
console.log(used_mem + " KiB\n");

/* Merge sort bechmark */

total_t = 0;

for (let i = 0; i < 100; i++) {
	let temp_nums = JSON.parse(JSON.stringify(nums));

	let start = process.hrtime()[1];
	result = mergesort(temp_nums);
	let exe_t = process.hrtime()[1] - start;
	total_t += exe_t;
}

temp_nums = JSON.parse(JSON.stringify(nums));

used_mem1 = process.memoryUsage();

result = mergesort(temp_nums);

used_mem2 = process.memoryUsage();

used_mem = Math.round((used_mem2.heapUsed - used_mem1.heapUsed) / 1024 * 1000) / 1000;

avg_t = parseInt((total_t / 1000) / 100);

console.log("mergesort");
console.log(result);
console.log(avg_t + " us");
console.log(used_mem + " KiB\n");

/* Heap sort bechmark */

total_t = 0;

for (let i = 0; i < 100; i++) {
	let temp_nums = JSON.parse(JSON.stringify(nums));

	let start = process.hrtime()[1];
	result = heapsort(temp_nums);
	let exe_t = process.hrtime()[1] - start;
	total_t += exe_t;
}

temp_nums = JSON.parse(JSON.stringify(nums));

used_mem1 = process.memoryUsage();

result = heapsort(temp_nums);

used_mem2 = process.memoryUsage();

used_mem = Math.round((used_mem2.heapUsed - used_mem1.heapUsed) / 1024 * 1000) / 1000;

avg_t = parseInt((total_t / 1000) / 100);

console.log("heapsort");
console.log(result);
console.log(avg_t + " us");
console.log(used_mem + " KiB\n");
