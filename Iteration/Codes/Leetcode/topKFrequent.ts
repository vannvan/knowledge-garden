/*
 * Description: 前 K 个高频元素
 * Url: https://leetcode.cn/problems/top-k-frequent-elements/
 * Tags: 数组  哈希表  分治  桶排序  计数  快速选择  排序  堆（优先队列）
 * Created: 2023-03-04 22:05:04
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-04 22:46:11
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

class Heap {
  compareFn: any
  queue: any[]
  constructor(compareFn) {
    this.compareFn = compareFn
    this.queue = []
  }

  // 添加
  push(item: any) {
    // 推入元素
    this.queue.push(item)

    // 上浮
    let index = this.size() - 1 // 记录推入元素下标
    let parent = Math.floor((index - 1) / 2) // 记录父节点下标

    while (parent >= 0 && this.compare(parent, index) > 0) {
      // 注意compare参数顺序
      ;[this.queue[index], this.queue[parent]] = [this.queue[parent], this.queue[index]]

      // 更新下标
      index = parent
      parent = Math.floor((index - 1) / 2)
    }
  }

  // 获取堆顶元素并移除
  pop() {
    // 堆顶元素
    const out = this.queue[0]

    // 移除堆顶元素 填入最后一个元素
    this.queue[0] = this.queue.pop() as number

    // 下沉
    let index = 0 // 记录下沉元素下标
    let left = 1 // left 是左子节点下标 left + 1 则是右子节点下标
    let searchChild = this.compare(left, left + 1) > 0 ? left + 1 : left

    while (searchChild !== undefined && this.compare(index, searchChild) > 0) {
      // 注意compare参数顺序
      ;[this.queue[index], this.queue[searchChild]] = [this.queue[searchChild], this.queue[index]]

      // 更新下标
      index = searchChild
      left = 2 * index + 1
      searchChild = this.compare(left, left + 1) > 0 ? left + 1 : left
    }

    return out
  }

  size() {
    return this.queue.length
  }

  // 使用传入的 compareFn 比较两个位置的元素
  compare(index1: number, index2: number) {
    // 处理下标越界问题
    if (this.queue[index1] === undefined) return 1
    if (this.queue[index2] === undefined) return -1

    return this.compareFn(this.queue[index1], this.queue[index2])
  }
}

function topKFrequent(nums: number[], k: number): number[] {
  let map: Map<number, number> = new Map()

  for (let i = 0; i < nums.length; i++) {
    map.set(nums[i], (map.get(nums[i]) || 0) + 1)
  }

  const helperHeap = new Heap((a, b) => a[1] - b[1])

  for (const entry of map.entries()) {
    helperHeap.push(entry)

    if (helperHeap.size() > k) {
      helperHeap.pop()
    }
  }

  const res: number[] = []

  for (let i = helperHeap.size() - 1; i >= 0; i--) {
    res[i] = helperHeap.pop()[0]
  }
  // console.log('helperHeap', helperHeap)

  return res
}
export default topKFrequent
