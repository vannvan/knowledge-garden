/*
 * Description:
 * Created: 2023-02-18 16:28:55
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-19 22:21:49
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

var containsDuplicate = function (nums) {
  const map = {}
  let flag = false
  // console.log(nums)
  console.time('sss')
  while (!flag && nums.length > 0) {
    const num = nums.shift()
    if (map[num] != undefined) {
      flag = true
      console.timeEnd('sss')
      break
    }
    map[num] = num
  }
  return flag
}

var containsDuplicate2 = function (nums) {
  let set = new Set()
  console.time('ddd')
  for (let num of nums) {
    if (set.has(num)) {
      console.timeEnd('ddd')
      return true
    }
    set.add(num)
  }
  return false
}

// console.log(containsDuplicate([3, 3]))
// console.log(containsDuplicate([1, 2, 3]))
// console.log(containsDuplicate([1, 2, 3, 1]))
// console.log(containsDuplicate([1, 2, 3, 4]))

const random = (max, min) => Math.floor(Math.random() * (max - min)) + min

const arr = Array.from({ length: 100 }, (v) => random(1000, 0))

console.log(containsDuplicate(arr))
console.log(containsDuplicate2(arr))
