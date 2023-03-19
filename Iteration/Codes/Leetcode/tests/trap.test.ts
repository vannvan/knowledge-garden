/*
 * Description: 42：接雨水
 * Url: https://leetcode.cn/problems/trapping-rain-water/
 * Created: 2023-03-19 18:32:17
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-19 18:32:47
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import trap from '../trap'
describe('接雨水 测试', () => {
  it('trap function', () => {
    expect(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])).toEqual(6)
    expect(trap([4, 2, 0, 3, 2, 5])).toEqual(9)
  })
})
