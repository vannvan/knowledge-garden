/*
 * Description: 64：最小路径和
 * Url: https://leetcode.cn/problems/minimum-path-sum/
 * Created: 2023-05-05 23:14:30
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-05 23:44:52
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import { minPathSum, minPathSum1 } from '../minPathSum'
describe('最小路径和 测试', () => {
  it('minPathSum function', () => {
    expect(
      minPathSum([
        [1, 2, 3],
        [4, 5, 6],
      ])
    ).toEqual(12)
    expect(
      minPathSum([
        [1, 3, 1],
        [1, 5, 1],
        [4, 2, 1],
      ])
    ).toEqual(7)
  })

  it('minPathSum1 function', () => {
    expect(
      minPathSum1([
        [1, 2, 3],
        [4, 5, 6],
      ])
    ).toEqual(12)
    expect(
      minPathSum1([
        [1, 3, 1],
        [1, 5, 1],
        [4, 2, 1],
      ])
    ).toEqual(7)
  })
})
