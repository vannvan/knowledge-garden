/*
 * Description: 排列序列
 * Url: https://leetcode.cn/problems/permutation-sequence/
 * Created: 2023-03-08 14:41:37
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-08 14:58:00
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import getPermutation from '../getPermutation'
describe('排列序列 测试', () => {
  it('getPermutation function', () => {
    getPermutation(3, 3)
    expect(getPermutation(3, 3)).toEqual('213')
    expect(getPermutation(4, 9)).toEqual('2314')
    expect(getPermutation(3, 1)).toEqual('123')
  })
})
