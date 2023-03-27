/*
 * Description: 1056：在 D 天内送达包裹的能力
 * Url: https://leetcode.cn/problems/capacity-to-ship-packages-within-d-days/
 * Created: 2023-03-27 21:54:18
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-27 22:34:01
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import shipWithinDays from '../shipWithinDays'
describe('在 D 天内送达包裹的能力 测试', () => {
  it('shipWithinDays function', () => {
    expect(shipWithinDays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5)).toEqual(15)
    expect(shipWithinDays([3, 2, 2, 4, 1, 4], 3)).toEqual(6)
    expect(shipWithinDays([1, 2, 3, 1, 1], 4)).toEqual(3)
  })
})
