/*
 * Description: 100169：栈的最小值
 * Url: https://leetcode.cn/problems/min-stack-lcci/
 * Tags: 栈  设计
 * Created: 2023-03-21 22:47:22
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-21 22:54:36
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

class MinStack {
  stack: number[]
  minStack: number[]
  constructor() {
    this.stack = []
    this.minStack = [Infinity]
  }

  push(x: number): void {
    this.stack.push(x)
    this.minStack.push(Math.min(this.minStack[this.minStack.length - 1], x))
  }

  pop(): void {
    this.stack.pop()
    this.minStack.pop()
  }

  top(): number {
    return this.stack[this.stack.length - 1]
  }

  getMin(): number {
    return this.minStack[this.minStack.length - 1]
  }
}

export default MinStack
