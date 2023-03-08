/*
 * Description: 22：括号生成
 * Url: https://leetcode.cn/problems/generate-parentheses/
 * Created: 2023-03-08 21:15:15
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-08 22:04:15
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import generateParenthesis from '../generateParenthesis'
describe('括号生成 测试', () => {
  it('generateParenthesis function', () => {
    generateParenthesis(3)
    expect(generateParenthesis(3)).toEqual(
      expect.arrayContaining(['((()))', '(()())', '(())()', '()(())', '()()()'])
    )
    expect(generateParenthesis(1)).toEqual(['()'])
  })
})
