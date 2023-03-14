/*
 * Description: 63：不同路径 II
 * Url: https://leetcode.cn/problems/unique-paths-ii/
 * Created: 2023-03-14 22:49:19
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-14 23:02:33
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import uniquePathsWithObstacles from '../uniquePathsWithObstacles'
describe('不同路径 II 测试', () => {
  it('uniquePathsWithObstacles function', () => {
    uniquePathsWithObstacles([
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ])
    expect(
      uniquePathsWithObstacles([
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0],
      ])
    ).toEqual(2)
    expect(
      uniquePathsWithObstacles([
        [0, 1],
        [0, 0],
      ])
    ).toEqual(1)
  })
})
