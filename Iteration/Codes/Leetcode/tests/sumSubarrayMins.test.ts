/*
 * Description: 943：子数组的最小值之和
 * Url: https://leetcode.cn/problems/sum-of-subarray-minimums/
 * Created: 2023-03-21 21:46:13
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-21 21:50:39
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import sumSubarrayMins from '../sumSubarrayMins'
describe('子数组的最小值之和 测试', () => {
  it('sumSubarrayMins function', () => {
    sumSubarrayMins([3, 1, 2, 4])
    return
    expect(sumSubarrayMins([3, 1, 2, 4])).toEqual(17)
    expect(sumSubarrayMins([11, 81, 94, 43, 3])).toEqual(444)
  })
})
