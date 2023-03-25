/*
 * Description: 389：找不同
 * Url: https://leetcode.cn/problems/find-the-difference/
 * Created: 2023-03-25 22:10:19
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-25 22:10:31
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import findTheDifference from '../findTheDifference'
describe('找不同 测试', () => {
  it('findTheDifference function', () => {
    expect(findTheDifference('abcd', 'abcde')).toEqual('e')
    expect(findTheDifference('', 'y')).toEqual('y')
  })
})
