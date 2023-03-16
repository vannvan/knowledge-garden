/*
 * Description: 494：目标和
 * Url: https://leetcode.cn/problems/target-sum/
 * Created: 2023-03-08 23:02:20
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-16 16:01:45
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import { findTargetSumWays, findTargetSumWaysByDP } from '../findTargetSumWays'
describe('目标和 测试', () => {
  it('findTargetSumWays function', () => {
    findTargetSumWays([1, 1, 1, 1, 1], 3)
    expect(findTargetSumWays([1, 1, 1, 1, 1], 3)).toEqual(5)
    expect(findTargetSumWays([1], 1)).toEqual(1)
  })

  it('findTargetSumWaysByDP function', () => {
    findTargetSumWaysByDP([1, 1, 1, 1, 1], 3)
    expect(findTargetSumWaysByDP([1, 1, 1, 1, 1], 3)).toEqual(5)
    expect(findTargetSumWaysByDP([1], 1)).toEqual(1)
  })
})
