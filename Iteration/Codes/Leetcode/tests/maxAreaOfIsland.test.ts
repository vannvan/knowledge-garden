/*
 * Description: 695：岛屿的最大面积
 * Url: https://leetcode.cn/problems/max-area-of-island/
 * Created: 2023-04-18 22:05:33
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-18 22:06:57
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import maxAreaOfIsland from '../maxAreaOfIsland'
describe('岛屿的最大面积 测试', () => {
  it('maxAreaOfIsland function', () => {
    expect(
      maxAreaOfIsland([
        [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
        [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
      ])
    ).toEqual(6)
    expect(maxAreaOfIsland([[0, 0, 0, 0, 0, 0, 0, 0]])).toEqual(0)
  })
})
