/*
 * Description: 605：种花问题
 * Url: https://leetcode.cn/problems/can-place-flowers/
 * Created: 2023-03-12 14:29:15
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-12 14:37:05
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import canPlaceFlowers from '../canPlaceFlowers'
describe('种花问题 测试', () => {
  it('canPlaceFlowers function', () => {
    expect(canPlaceFlowers([1, 0, 0, 0, 1], 1)).toEqual(true)
    expect(canPlaceFlowers([1, 0, 0, 0, 1], 2)).toEqual(false)
    expect(canPlaceFlowers([0, 0, 0, 1, 1], 1)).toEqual(true)
    expect(canPlaceFlowers([0, 0, 0, 1, 1], 2)).toEqual(false)
    expect(canPlaceFlowers([0, 0, 0, 1, 1, 0, 0], 2)).toEqual(true)
    // expect(canPlaceFlowers([0, 0, 0, 1, 1, 0, 0], 2)).toEqual(false)
  })
})
