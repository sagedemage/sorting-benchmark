package main

import (
	"fmt"
	"time"
	"runtime"
	"math"
)

func bubblesort(nums []int) []int {
	/*
	Time complexity:
	- Best: O(n)
	- Average: O(n^2)
	- Worst: O(n^2)
	Space complexity: O(1)
	*/
	for i := 0; i < len(nums); i++ {
		var unsorted bool = false
		for j := 0; j < len(nums)-1; j++ {
			if nums[j] > nums[j+1] {
				key := nums[j]
				unsorted = true
				nums[j] = nums[j+1]
				nums[j+1] = key
			}
		}
		if unsorted == false {
			break
		}
	}
	return nums
}

func partition(nums []int, low int, high int) int {
	pivot := nums[high]

	i := low - 1
	for j := low; j < high; j++ {
		if (nums[j] <= pivot) {
			i++
			key := nums[i]
			nums[i] = nums[j]
			nums[j] = key
		}
	}

	key := nums[i+1]
	nums[i+1] = nums[high]
	nums[high] = key

	return i+1
}

func quicksort(nums []int, low int, high int) []int {
	/*
    Time complexity:
    - Best: O(nlogn)
    - Average: O(nlogn)
    - Worst: O(n^2)
    Space complexity: O(logn)
    */
	if low < high {
		partition_index := partition(nums, low, high)

		quicksort(nums, low, partition_index-1)
		quicksort(nums, partition_index+1, high)
	}

	return nums
}

func merge(left []int, right []int) []int {
	var result []int
	var i int = 0
	var j int = 0

	for i < len(left) && j < len(right) {
		if left[i] <= right[j] {
			result = append(result, left[i])
			i++
		} else {
			result = append(result, right[j])
			j++
		}
	}

	for i < len(left) {
		result = append(result, left[i])
		i++
	}

	for j < len(right) {
		result = append(result, right[j])
		j++
	}
	return result
}

func mergesort(nums []int) []int {
	/*
    Time complexity:
    - Best: O(nlogn)
    - Average: O(nlogn)
    - Worst: O(nlogn)
    Space complexity: O(n)
    */
	if len(nums) < 2 {
		return nums
	}

	var mid int = len(nums)/2

	left := nums[:mid]
	right := nums[mid:]

	return merge(mergesort(left), mergesort(right))
}

func main() {
	var nums []int = []int{
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
	}

	var total_t int64 = 0
	var used_mem, used_mem1, used_mem2 float64
	var result []int

	for i := 0; i < 100; i++ {
		var temp_nums = make([]int, len(nums))
		copy(temp_nums, nums)
		start_t := time.Now()
		result = bubblesort(temp_nums)
		exe_t := time.Now().Sub(start_t).Microseconds()
		total_t += exe_t
	}

	avg_exe_t := total_t / 100

	var m1 runtime.MemStats
	var m2 runtime.MemStats

	var temp_nums = make([]int, len(nums))
	copy(temp_nums, nums)

	runtime.GC()

	runtime.ReadMemStats(&m1)

	result = bubblesort(temp_nums)

	runtime.ReadMemStats(&m2)

	used_mem1 = float64(m1.Mallocs - m1.Frees)
	used_mem2 = float64(m2.Mallocs - m2.Frees)
	used_mem = math.Round((used_mem2-used_mem1)/1024*1000) / 1000

	fmt.Println("bubble sort")
	fmt.Println(result)
	fmt.Println(fmt.Sprint(avg_exe_t) + " us")
	fmt.Println(fmt.Sprint(used_mem) + " KiB\n")

	total_t = 0

	for i := 0; i < 100; i++ {
		var temp_nums = make([]int, len(nums))
		copy(temp_nums, nums)
		start_t := time.Now()
		result = quicksort(temp_nums, 0, len(temp_nums)-1)
		exe_t := time.Now().Sub(start_t).Microseconds()
		total_t += exe_t
	}

	avg_exe_t = total_t / 100

	temp_nums = make([]int, len(nums))
	copy(temp_nums, nums)

	runtime.GC()

	runtime.ReadMemStats(&m1)

	result = quicksort(temp_nums, 0, len(temp_nums)-1)

	runtime.ReadMemStats(&m2)

	used_mem1 = float64(m1.Mallocs - m1.Frees)
	used_mem2 = float64(m2.Mallocs - m2.Frees)
	used_mem = math.Round((used_mem2-used_mem1)/1024*1000) / 1000

	fmt.Println("quick sort")
	fmt.Println(result)
	fmt.Println(fmt.Sprint(avg_exe_t) + " us")
	fmt.Println(fmt.Sprint(used_mem) + " KiB\n")

	total_t = 0

	for i := 0; i < 100; i++ {
		var temp_nums = make([]int, len(nums))
		copy(temp_nums, nums)
		start_t := time.Now()
		result = mergesort(temp_nums)
		exe_t := time.Now().Sub(start_t).Microseconds()
		total_t += exe_t
	}

	avg_exe_t = total_t / 100

	temp_nums = make([]int, len(nums))
	copy(temp_nums, nums)

	runtime.GC()

	runtime.ReadMemStats(&m1)

	result = mergesort(temp_nums)

	runtime.ReadMemStats(&m2)

	used_mem1 = float64(m1.Mallocs - m1.Frees)
	used_mem2 = float64(m2.Mallocs - m2.Frees)
	used_mem = math.Round((used_mem2-used_mem1)/1024*1000) / 1000

	fmt.Println("merge sort")
	fmt.Println(result)
	fmt.Println(fmt.Sprint(avg_exe_t) + " us")
	fmt.Println(fmt.Sprint(used_mem) + " KiB\n")
}
