/*
 * Description: 436：寻找右区间
 * Url: https://leetcode.cn/problems/find-right-interval/
 * Created: 2023-04-16 21:43:29
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-16 22:07:59
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import findRightInterval from '../findRightInterval'
describe('寻找右区间 测试', () => {
  it('findRightInterval function', () => {
    expect(findRightInterval([[1, 2]]))
    expect(
      findRightInterval([
        [3, 4],
        [2, 3],
        [1, 2],
      ])
    ).toEqual([-1, 0, 1])
    expect(
      findRightInterval([
        [1, 4],
        [2, 3],
        [3, 4],
      ])
    ).toEqual([-1, 2, -1])
  })
})
