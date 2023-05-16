/*
 * Description:
 * Created: 2023-05-16 21:40:45
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-16 22:16:43
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

Array.prototype.mmap = function (fn) {
  let ans = []
  for (let i = 0; i < this.length; i++) {
    if (!this.hasOwnProperty(i)) continue
    ans.push(fn(this[i], i, this))
  }

  return ans
}

Array.prototype.mfilter = function (fn) {
  let ans = []
  for (let i = 0; i < this.length; i++) {
    if (!this.hasOwnProperty(i)) continue
    fn(this[i], i, this) && ans.push(this[i])
  }
  return ans
}

Array.prototype.mreduce = function (fn, init) {
  let result = init === undefined ? this[0] : init

  for (let i = init === undefined ? 1 : 0; i < this.length; i++) {
    if (!this.hasOwnProperty(i)) continue
    result = fn(result, this[i], i, this)
  }

  return result
}

const arr = ['a', 'b', , 'c', 'd']

// arr.mmap((item, index) => {
//   console.log(item, index)
// })

// arr.map((item) => {
//   console.log(item)
// })

let res = arr.mfilter((item) => item !== 'a')

console.log(res)
const nums = [1, 2, 3, 4, 5]

let ans = nums.mreduce((prev, curr) => {
  return prev + curr
}, 2)

console.log(
  nums.reduce((prev, curr) => {
    return prev + curr
  }, 2)
)

console.log(ans)
