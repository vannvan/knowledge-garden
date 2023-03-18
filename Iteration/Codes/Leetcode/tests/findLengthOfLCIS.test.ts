/*
 * Description: 674：最长连续递增序列
 * Url: https://leetcode.cn/problems/longest-continuous-increasing-subsequence/
 * Created: 2023-03-18 15:59:12
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-18 15:59:29
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import findLengthOfLCIS from '../findLengthOfLCIS'
describe('最长连续递增序列 测试', () => {
  it('findLengthOfLCIS function', () => {
    expect(findLengthOfLCIS([1, 3, 5, 4, 7])).toEqual(3)
    expect(findLengthOfLCIS([2, 2, 2, 2, 2])).toEqual(1)
  })
})
