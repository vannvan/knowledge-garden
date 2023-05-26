/*
 * Description: 子集
 * Url: https://leetcode.cn/problems/subsets/
 * Created: 2023-03-06 20:32:21
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-26 21:40:07
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import subsets from '../subsets'
describe('子集 测试', () => {
  it('subsets function', () => {
    subsets([1, 2, 3])
    return
    expect(subsets([1, 2, 3])).toEqual([[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]])
    expect(subsets([0])).toEqual([[], [0]])
  })
})
