/*
 * Description: SearchRange的优化版
 * Created: 2023-02-26 14:49:07
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-26 16:21:33
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

class SearchRange2 {
  nums: number[]
  target: number
  constructor(nums: number[], target: number) {
    this.nums = nums
    this.target = target
  }

  getRange() {
    let leftBorder = this.getBorder(this.nums, this.target, 'left')
    let rightBorder = this.getBorder(this.nums, this.target, 'right')
    return [leftBorder, rightBorder]
  }

  getBorder(nums: number[], target: number, flag: 'left' | 'right') {
    let left = 0
    let right = nums.length - 1
    let border = -1
    while (left <= right) {
      let mid = Math.floor(left + (right - left) / 2)
      console.log('flag-', flag, 'left-', left, 'mid-', mid, 'right-', right, 'border-', border)
      if (nums[mid] > target) {
        right = mid - 1
        console.log('右边左移<-----')
      } else if (nums[mid] < target) {
        left = mid + 1
        console.log('左边右移---->')
      } else {
        // 此时mid=target了
        if (flag == 'left') {
          console.log('继续往左', mid - 1) // 这一次的下一轮就是答案
          right = mid - 1 // 看当前的
        } else {
          left = mid + 1
          console.log('继续往右', mid - 1) // 这一次的下一轮就是答案
        }
        border = mid
      }
    }
    return border
  }
}

export default SearchRange2
