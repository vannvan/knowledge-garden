/*
 * Description: 876：一手顺子
 * Url: https://leetcode.cn/problems/hand-of-straights/
 * Created: 2023-03-12 17:52:01
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-12 18:32:46
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import isNStraightHand from '../isNStraightHand'
describe('一手顺子 测试', () => {
  it('isNStraightHand function', () => {
    isNStraightHand([1, 2, 3, 6, 2, 3, 4, 7, 8], 3)
    expect(isNStraightHand([1, 2, 3, 6, 2, 3, 4, 7, 9], 3)).toEqual(false)

    // return
    expect(isNStraightHand([1, 2, 3, 6, 2, 3, 4, 7, 8], 3)).toEqual(true)
    expect(isNStraightHand([1, 2, 3, 4, 5], 4)).toEqual(false)
  })
})
