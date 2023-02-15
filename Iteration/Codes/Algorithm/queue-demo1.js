/**
 * 队列
 */

class Queue {
  constructor() {
    this.count = 0
    this.lowestCount = 0
    this.items = {}
  }

  /**
   * 只能添加至末尾
   * @param {} data
   */
  enQueue(data) {
    this.items[this.count] = data
    this.count++
  }

  /**
   * 先进先出
   */
  deQueue() {
    if (this.isEmpty()) return undefined
    const res = this.items[this.lowestCount]
    delete this.items[this.lowestCount]
    this.lowestCount++
    return res
  }

  /**
   * 获取最前面的项
   */
  peek() {
    if (this.isEmpty()) return undefined
    return this.items[this.lowestCount]
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
