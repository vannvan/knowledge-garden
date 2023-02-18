/*
 * Description: 二叉堆
 * Created: 2023-02-18 14:59:06
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-18 18:06:42
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

class MinHeap {
  constructor() {
    this.heap = []
  }

  insert(value) {
    if (value != null) {
      this.heap.push(value)
      // 上移，直到父节点小于这个值
      this.siftUp(this.heap.length - 1)
      return true
    }
    return false
  }

  siftUp(index) {
    let parent = this.getParentIndex(index)
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
   * @param {*} a
   * @param {*} b
   * @returns
   */
  compare(a, b) {
    return a >= b
  }

  /**
   * 移除最小值
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
   * siftDown 做的事情就是 将 父节点 与 左 右子节点比较 ,
   * @param {*} index
   */
  siftDown(index) {
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
    return 2 * index - 1
  }

  getRightIndex(index) {
    return 2 * index + 2
  }

  getParentIndex(index) {
    if (index == 0) {
      return undefined
    }
    return Math.floor(index - 1) / 2
  }
}

// const mh = new MinHeap()

// mh.insert(1)
// mh.insert(13)
// mh.insert(7)

// mh.insert(8)
// mh.insert(6)
// // mh.insert(5)
// mh.insert(2)

// const arr = Array.from({ length: 10 }, (v, k) => k + 1)

// arr.forEach((value) => {
//   mh.insert(value)
// })

// mh.extract()

// console.log(mh)

class MaxHeap extends MinHeap {
  constructor() {
    super()
  }
  compare(a, b) {
    return a < b
  }
}

function firstHeapSort(arr, options) {
  let res = []
  //创建一个堆
  let Heap = new MinHeap()
  if (options === -1) {
    Heap = new MaxHeap()
  }
  //将数组插到堆里
  arr.forEach((el) => Heap.insert(el))

  //每次取出最值 push进去即可
  for (let i = 0, j = Heap.size(); i < j; i++) {
    res.push(Heap.extract())
  }
  return res
}

const maxHeap = new MaxHeap()

maxHeap.insert(2)
maxHeap.insert(1)
maxHeap.insert(5)
maxHeap.insert(4)
maxHeap.insert(6)
maxHeap.insert(3)
maxHeap.insert(0)
maxHeap.insert(2)

console.log(maxHeap)

console.log('堆排序', firstHeapSort([3, 5, 1, 6, 4, 7, 2], 1))
console.log('堆排序', firstHeapSort([3, 5, 1, 6, 4, 7, 2], -1))
