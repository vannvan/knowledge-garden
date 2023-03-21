/*
 * Description: 100169：栈的最小值
 * Url: https://leetcode.cn/problems/min-stack-lcci/
 * Created: 2023-03-21 22:47:22
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-21 22:54:28
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import MinStack from '../MinStack'
describe('栈的最小值 测试', () => {
  it('MinStack function', () => {
    const minStack = new MinStack()
    minStack.push(-2)
    minStack.push(0)
    minStack.push(-3)
    expect(minStack.getMin()).toEqual(-3)
    minStack.pop()
    expect(minStack.top()).toEqual(0)
    expect(minStack.getMin()).toEqual(-2)
  })
})
