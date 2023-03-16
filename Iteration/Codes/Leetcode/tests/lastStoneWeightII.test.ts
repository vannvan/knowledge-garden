/*
 * Description: 1130：最后一块石头的重量 II
 * Url: https://leetcode.cn/problems/last-stone-weight-ii/
 * Created: 2023-03-16 14:46:23
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-16 15:06:47
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import lastStoneWeightII from '../lastStoneWeightII'
describe('最后一块石头的重量 II 测试', () => {
  it('lastStoneWeightII function', () => {
    lastStoneWeightII([2, 7, 4, 1, 8, 1])
    expect(lastStoneWeightII([2, 7, 4, 1, 8, 1])).toEqual(1)
    expect(lastStoneWeightII([31, 26, 33, 21, 40])).toEqual(5)
  })
})
