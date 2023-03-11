/*
 * Description: 435：无重叠区间
 * Url: https://leetcode.cn/problems/non-overlapping-intervals/
 * Created: 2023-03-11 17:32:18
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-11 17:34:45
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import eraseOverlapIntervals from '../eraseOverlapIntervals'
describe('无重叠区间 测试', () => {
  it('eraseOverlapIntervals function', () => {
    expect(
      eraseOverlapIntervals([
        [1, 2],
        [2, 3],
        [3, 4],
        [1, 3],
      ])
    ).toEqual(1)
    expect(
      eraseOverlapIntervals([
        [1, 2],
        [1, 2],
        [1, 2],
      ])
    ).toEqual(2)
    expect(
      eraseOverlapIntervals([
        [1, 2],
        [2, 3],
      ])
    ).toEqual(0)
  })
})
