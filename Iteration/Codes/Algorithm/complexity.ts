/*
 * Description: 算法复杂度示例
 * Created: 2023-02-25 22:54:32
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-25 23:08:16
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

const isEqual = (a: string | number, b: string | number) => {
  return a === b
}

/**
 * O(1)
 * @param num
 */
const inc = (num: number) => {
  num++
}

/**
 * O(n)
 * array有n个元素，最坏的情况就会执行n次
 * @param array
 * @param value
 * @returns
 */
const search = (array: string[], value: string) => {
  for (let i = 0; i < array.length; i++) {
    if (isEqual(array[i], value)) {
      return i
    }
  }
  return -1
}

/**
 * O(n^2)
 * nums有n个元素，最坏的情况就会执行n^次
 * @param nums
 * @returns
 */
const bubbleSort = (nums: number[]) => {
  const { length } = nums
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      if (nums[j] < nums[i]) {
        ;[nums[j], nums[i]] = [nums[i], nums[j]]
      }
    }
  }
  return nums
}

/**
 * O(log2n)
 * 因为循环了x次，2x=n 因此 x=log2n
 * @param i
 * @returns
 */
function f(i) {
  var sum = 0
  for (var j = 0; j < i; j++) {
    sum += i
  }
  return sum
}

/**
 * O(log3n)
 * 因为循环了x次，3x=n 因此 x=log3n
 * @param i
 * @returns
 */
function total1(n) {
  var sum = 0
  var i = 1
  while (i <= n) {
    sum += i
    i = i * 3
  }
}

/**
 * O(m+n)
 * @param m
 * @param n
 * @returns
 */
function total(m, n) {
  var sum1 = 0
  for (var i = 0; i < n; i++) {
    sum1 += i
  }
  var sum2 = 0
  for (var i = 0; i < m; i++) {
    sum2 += i
  }
  return sum1 + sum2
}
