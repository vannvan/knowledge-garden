/*
 * Description: 150：逆波兰表达式求值
 * Url: https://leetcode.cn/problems/evaluate-reverse-polish-notation/
 * Created: 2023-03-25 21:03:10
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-25 21:17:02
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import evalRPN from '../evalRPN'
describe('逆波兰表达式求值 测试', () => {
  it('evalRPN function', () => {
    expect(evalRPN(['2', '1', '+', '3', '*'])).toEqual(9)
    expect(evalRPN(['4', '13', '5', '/', '+'])).toEqual(6)
    expect(evalRPN(['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+'])).toEqual(
      22
    )
  })
})
