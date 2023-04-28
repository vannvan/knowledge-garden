/*
 * Description: 228：汇总区间
 * Url: https://leetcode.cn/problems/summary-ranges/
 * Created: 2023-04-28 22:35:51
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-28 23:08:26
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import summaryRanges from '../summaryRanges'
describe('汇总区间 测试', () => {
  it('summaryRanges function', () => {
    expect(summaryRanges([0, 1, 2, 4, 5, 7])).toEqual(['0->2', '4->5', '7'])
    expect(summaryRanges([0, 2, 3, 4, 6, 8, 9])).toEqual(['0', '2->4', '6', '8->9'])
    expect(summaryRanges([-1])).toEqual(['-1'])
  })
})
