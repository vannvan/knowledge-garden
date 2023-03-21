/*
 * Description: 886：括号的分数
 * Url: https://leetcode.cn/problems/score-of-parentheses/
 * Created: 2023-03-21 20:54:41
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-21 20:56:14
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import scoreOfParentheses from '../scoreOfParentheses'
describe('括号的分数 测试', () => {
  it('scoreOfParentheses function', () => {
    expect(scoreOfParentheses('()')).toEqual(1)
    expect(scoreOfParentheses('(())')).toEqual(2)
    expect(scoreOfParentheses('()()')).toEqual(2)
    expect(scoreOfParentheses('(()(()))')).toEqual(6)
  })
})
