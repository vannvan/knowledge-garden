/*
 * Description: 前 K 个高频元素
 * Url: https://leetcode.cn/problems/top-k-frequent-elements/
 * Tags: 数组  哈希表  分治  桶排序  计数  快速选择  排序  堆（优先队列）
 * Created: 2023-03-04 22:05:04
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-04 23:42:02
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

class MinHeap {
  heap: any[]
  constructor() {
    this.heap = []
  }

  insert(value: any) {
    if (value != null) {
      this.heap.push(value)
      // 上移，直到父节点小于这个值
      this.siftUp(this.heap.length - 1)
      return true
    }
    return false
  }

  siftUp(index) {
    let parent: any = this.getParentIndex(index)
    while (index > 0 && this.compare(this.heap[parent], this.heap[index])) {
      this.swap(this.heap, index, parent)
      index = parent
      parent = this.getParentIndex(index)
    }
  }

  swap(arr, a, b) {
    ;[arr[a], arr[b]] = [arr[b], arr[a]]
    return arr
  }

  /**
   * 最小堆 是 a>b  最大堆改为 a<b 即可
   * 注意 因为head 元素存的是[number,number] 第二项才是频次，所以比较下标为1的元素
   * @param {*} a
   * @param {*} b
   * @returns
   */
  compare(a, b) {
    if (!a || !b) return false
    return a[1] >= b[1]
  }

  /**
   * 移除最小值或最大值
   * @param {*} value
   */
  extract() {
    if (this.isEmpty()) {
      return undefined
    }
    if (this.size() === 1) {
      return this.heap.shift()
    }

    const removedValue = this.heap[0]
    this.heap[0] = this.heap.pop() // 将 数组末尾的值 赋值给 头部,并删除末尾的值
    this.siftDown(0)
    return removedValue
  }
  /**
   * 获取堆顶元素并移除
   */
  pop() {
    let out = this.heap[0]

    // 将最后一个元素放到堆顶
    this.heap[0] = this.heap.pop()

    // 开始调整
    let index = 0
    this.siftDown(index)
    return out
  }

  /**
   * siftDown 做的事情就是 将 父节点 与 左 右子节点比较 ,
   * @param {*} index
   */
  siftDown(index: number) {
    //向下冒泡
    let left = this.getLeftIndex(index)
    let right = this.getRightIndex(index)
    if (
      this.compare(this.heap[index], this.heap[left]) &&
      this.compare(this.heap[index], this.heap[right])
    ) {
      if (!this.compare(this.heap[right], this.heap[left])) {
        this.swap(this.heap, right, index)
        this.siftDown(right)
      } else {
        this.swap(this.heap, left, index)
        this.siftDown(left)
      }
    } else if (this.compare(this.heap[index], this.heap[left])) {
      this.swap(this.heap, left, index)
      this.siftDown(left)
    } else if (this.compare(this.heap[index], this.heap[right])) {
      this.swap(this.heap, right, index)
      this.siftDown(right)
    }
  }

  isEmpty() {
    return this.size() === 0
  }

  size() {
    return this.heap.length
  }

  findMinimum() {
    return this.isEmpty() ? undefined : this.heap[0]
  }

  getLeftIndex(index) {
    return 2 * index + 1
  }

  getRightIndex(index) {
    return 2 * index + 2
  }

  getParentIndex(index) {
    if (index == 0) {
      return undefined
    }
    return Math.floor((index - 1) / 2) // 注意
  }
}

function topKFrequent(nums: number[], k: number): number[] {
  let map: Map<number, number> = new Map()

  for (let i = 0; i < nums.length; i++) {
    map.set(nums[i], (map.get(nums[i]) || 0) + 1)
  }

  const helperHeap = new MinHeap()

  for (const entry of map.entries()) {
    helperHeap.insert(entry)

    if (helperHeap.size() > k) {
      helperHeap.pop()
    }
  }
  const res: number[] = []

  for (let i = helperHeap.size() - 1; i >= 0; i--) {
    res[i] = helperHeap.pop()[0]
  }

  return res
}
export default topKFrequent
