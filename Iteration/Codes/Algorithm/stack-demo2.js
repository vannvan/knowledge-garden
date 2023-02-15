/**
 * 对象栈
 */

class Stack {
  constructor() {
    this.count = 0
    this.items = {}
  }

  push(data) {
    this.items[this.count + 1] = data
    this.count++
  }

  /**
   * 栈顶
   */
  peek() {
    if (this.isEmpty()) return undefined
    return this.items[this.count - 1]
  }

  /**
   * 删除
   */
  pop() {
    if (this.isEmpty()) return undefined
    this.count--
    const res = this.items[this.count]
    delete this.items[this.count]
    return res
  }

  isEmpty() {
    return this.count === 0
  }

  clear() {
    this.items = {}
    this.count = 0
  }

  size() {
    return this.count
  }
}

const s = new Stack()
s.push('22')
s.push(33)
s.push('11')

console.log('pop', s.pop())

console.log('peek', s.peek())

console.log('元素', s.size())
