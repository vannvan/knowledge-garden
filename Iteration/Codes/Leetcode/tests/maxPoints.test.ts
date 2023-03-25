/*
 * Description: 149：直线上最多的点数
 * Url: https://leetcode.cn/problems/max-points-on-a-line/
 * Created: 2023-03-25 21:41:25
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-25 21:58:14
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import maxPoints from '../maxPoints'
describe('直线上最多的点数 测试', () => {
  it('maxPoints function', () => {
    expect(
      maxPoints([
        [1, 1],
        [2, 2],
        [3, 3],
      ])
    ).toEqual(3)
    expect(
      maxPoints([
        [1, 1],
        [3, 2],
        [5, 3],
        [4, 1],
        [2, 3],
        [1, 4],
      ])
    ).toEqual(4)
  })
})
