/*
 * Description: 416：分割等和子集
 * Url: https://leetcode.cn/problems/partition-equal-subset-sum/
 * Created: 2023-03-15 20:48:14
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-15 21:18:50
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import canPartition from '../canPartition'
describe('分割等和子集 测试', () => {
  it('canPartition function', () => {
    canPartition([1, 5, 11, 5])
    expect(canPartition([1, 5, 11, 5])).toEqual(true)
    expect(canPartition([1, 2, 3, 5])).toEqual(false)
  })
})
