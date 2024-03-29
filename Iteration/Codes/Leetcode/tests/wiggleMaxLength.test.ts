/*
 * Description: 376：摆动序列
 * Url: https://leetcode.cn/problems/wiggle-subsequence/
 * Created: 2023-03-10 20:53:39
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-10 22:47:16
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import wiggleMaxLength from '../wiggleMaxLength'
describe('摆动序列 测试', () => {
  it('wiggleMaxLength function', () => {
    wiggleMaxLength([1, 7, 4, 9, 2, 5])
    expect(wiggleMaxLength([1, 7, 4, 9, 2, 5])).toEqual(6)
    expect(wiggleMaxLength([1, 17, 5, 10, 13, 15, 10, 5, 16, 8])).toEqual(7)
    expect(wiggleMaxLength([1, 2, 3, 4, 5, 6, 7, 8, 9])).toEqual(2)
  })
})
