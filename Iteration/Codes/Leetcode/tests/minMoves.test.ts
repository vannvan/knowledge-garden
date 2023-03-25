/*
 * Description: 453：最小操作次数使数组元素相等
 * Url: https://leetcode.cn/problems/minimum-moves-to-equal-array-elements/
 * Created: 2023-03-25 22:42:32
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-25 22:42:47
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import minMoves from '../minMoves'
describe('最小操作次数使数组元素相等 测试', () => {
  it('minMoves function', () => {
    expect(minMoves([1, 2, 3])).toEqual(3)
    expect(minMoves([1, 1, 1])).toEqual(0)
  })
})
