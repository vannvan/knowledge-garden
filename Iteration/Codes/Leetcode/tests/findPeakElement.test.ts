/*
 * Description: 162：寻找峰值
 * Url: https://leetcode.cn/problems/find-peak-element/
 * Created: 2023-04-23 23:49:31
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-26 12:00:30
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import findPeakElement from '../findPeakElement'
describe('寻找峰值 测试', () => {
  it('findPeakElement function', () => {
    expect(findPeakElement([1, 2, 3, 1])).toEqual(2)
    expect(findPeakElement([1, 2])).toEqual(1)
    expect(findPeakElement([1, 2, 1, 3, 4, 5, 6])).toEqual(6)
  })
})
