/*
 * Description: 583：两个字符串的删除操作
 * Url: https://leetcode.cn/problems/delete-operation-for-two-strings/
 * Created: 2023-03-18 21:24:38
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-18 21:24:57
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import minDistance from '../minDistance'
describe('两个字符串的删除操作 测试', () => {
  it('minDistance function', () => {
    expect(minDistance('sea', 'eat')).toEqual(2)
    expect(minDistance('leetcode', 'etco')).toEqual(4)
  })
})
