/**
 * 双端队列
 */

class Deque {
  constructor() {
    this.items = {}
    this.count = 0
    this.lowestCount = 0
  }

  addFront(data) {
    if (this.isEmpty()) {
      this.addBack(data)
    } else if (this.lowestCount > 0) {
      // 往最前面的位置添加
      this.lowestCount--
      this.items[this.lowestCount] = data
    } else {
      // 此时说明lowestCount=0 就需要把已有的元素统一往后移动
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1]
      }
      this.count++
      this.lowestCount = 0
      this.items[this.lowestCount] = data
    }
  }

  addBack(data) {
    this.items[this.count] = data
  }

  removeFront() {
    if (this.count === 0) return undefined
    let res = this.items[this.lowestCount]
    delete this.items[this.lowestCount]
    this.lowestCount++
    return res
  }

  removeBack() {
    if (this.count === 0) return undefined
    let res = this.items[this.count]
    delete this.items[this.count]
    this.count--
    return res
  }

  peekFront() {
    if (this.isEmpty()) return undefined
    return this.items[this.lowestCount]
  }

  peekBack() {
    if (this.isEmpty()) return undefined
    return this.items[this.count]
  }

  isEmpty() {
    return this.count - this.lowestCount === 0
  }

  clear() {
    this.items = {}
    this.lowestCount = 0
    this.count = 0
  }

  size() {
    return this.count - this.lowestCount
  }
}
