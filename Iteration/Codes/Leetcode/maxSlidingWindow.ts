/*
 * Description: 滑动窗口最大值
 * Url: https://leetcode.cn/problems/sliding-window-maximum/
 * Tags: 队列  数组  滑动窗口  单调队列  堆（优先队列）
 * Created: 2023-03-04 20:47:21
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-11 13:41:42
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function maxSlidingWindow(nums: number[], k: number): number[] {
  // 单调队列
  class Queue {
    items: number[]
    constructor() {
      this.items = []
    }

    enQueue(value: number) {
      let back = this.items[this.items.length - 1]
      // 如果新来的比之前的都大，把之前的干掉
      while (back != undefined && back < value) {
        this.items.pop()
        back = this.items[this.items.length - 1]
      }
      this.items.push(value)
    }

    deQueue(value) {
      let front = this.items[0]
      if (value == front) {
        this.items.shift() // 取队列头部
      }
    }

    front() {
      return this.items[0]
    }
  }

  let helperQueue = new Queue()
  let i = 0
  let j = 0
  let resArr: number[] = []
  // 先把第一组滑动窗口的内容放进去
  while (j < k) {
    helperQueue.enQueue(nums[j++])
  }
  // 拿到第一组的最大值
  resArr.push(helperQueue.front())

  // 接下来要开始滑动了
  while (j < nums.length) {
    helperQueue.enQueue(nums[j])
    helperQueue.deQueue(nums[i])
    resArr.push(helperQueue.front())
    i++
    j++
  }

  return resArr
}
export default maxSlidingWindow
