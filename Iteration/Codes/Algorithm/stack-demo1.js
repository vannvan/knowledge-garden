/**
 * 数组栈
 */

class Stack {
  constructor() {
    this.items = []
  }

  /**
   * 添加元素
   * @param {*} data
   */
  push(data) {
    this.items.push(data)
  }

  /**
   * 移除元素
   */
  pop() {
    return this.items.pop()
  }

  /**
   * 获取栈顶元素
   */
  peek() {
    this.items[this.items.length - 1]
  }

  /**
   * 是否为空
   */
  isEmpty() {
    this.items.length === 0
  }

  /**
   * 清除
   */
  clear() {
    this.items = []
  }

  /**
   * size
   * @returns
   */
  size() {
    return this.items.length
  }
}

const s = new Stack()

s.push(2)
s.push(1)
s.push(3)

s.pop()
console.log('size', s.size())

console.log('stack top', s.peek())
console.log('isEmpty', s.isEmpty())

s.clear()

console.log('size', s.size())
