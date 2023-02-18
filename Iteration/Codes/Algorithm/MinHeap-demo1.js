/*
 * Description: 二叉堆
 * Created: 2023-02-18 14:59:06
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-18 16:50:02
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
      this.swap(this.heap, parent, index)
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

const mh = new MinHeap()

// mh.insert(1)
// mh.insert(13)
// mh.insert(7)

// mh.insert(8)
// mh.insert(6)
// // mh.insert(5)
// mh.insert(2)

const arr = Array.from({ length: 10 }, (v, k) => k + 1)

arr.forEach((value) => {
  mh.insert(value)
})
console.log(arr)

mh.extract()

console.log(mh)
