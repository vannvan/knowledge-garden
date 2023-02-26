/*
 * Description: 删除重复元素
 * Created: 2023-02-20 18:41:28
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-26 13:39:23
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

const uniq = (nums) => {
  if (nums.length === 0) {
    return 0
  }

  let fast = 1
  let slow = 1
  const length = nums.length
  while (fast < length) {
    if (nums[fast] !== nums[fast - 1]) {
      nums[slow] = nums[fast]
      slow++
    }
    fast++
  }
  return slow
}

// 判断数组中当前元素第一次出现的索引是否等于当前索引，不相等，则证明当前元素在数组中存在第二个，所以，删除当前元素；此时数组长度减1，但是当下一次循环进入，索引减1，得到的元素，依旧是当前元素，可以继续判断当前元素是否有多余重复值；
const uniq2 = (nums) => {
  for (let i = nums.length - 1; i >= 0; --i) {
    console.log(i, nums.indexOf(nums[i]))
    if (nums.indexOf(nums[i]) !== i) nums.splice(i, 1)
  }
  return nums.length
}

const res = uniq2([1, 2, 2, 3])

console.log('res', res)
