/*
 * Description: 452：用最少数量的箭引爆气球
 * Url: https://leetcode.cn/problems/minimum-number-of-arrows-to-burst-balloons/
 * Created: 2023-03-11 17:59:27
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-11 18:03:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import findMinArrowShots from '../findMinArrowShots'
describe('用最少数量的箭引爆气球 测试', () => {
  it('findMinArrowShots function', () => {
    expect(
      findMinArrowShots([
        [10, 16],
        [2, 8],
        [1, 6],
        [7, 12],
      ])
    ).toEqual(2)
    expect(
      findMinArrowShots([
        [1, 2],
        [3, 4],
        [5, 6],
        [7, 8],
      ])
    ).toEqual(4)
    expect(
      findMinArrowShots([
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
      ])
    ).toEqual(2)
  })
})
