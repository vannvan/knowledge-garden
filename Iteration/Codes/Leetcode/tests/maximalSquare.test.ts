/*
 * Description: 221：最大正方形
 * Url: https://leetcode.cn/problems/maximal-square/
 * Created: 2023-05-07 20:55:53
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-07 22:02:57
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import { maximalSquare, maximalSquare1 } from '../maximalSquare'
describe('最大正方形 测试', () => {
  it('maximalSquare function', () => {
    expect(
      maximalSquare([
        ['1', '1', '1', '1', '0'],
        ['1', '1', '1', '1', '0'],
        ['1', '1', '1', '1', '1'],
        ['1', '1', '1', '1', '1'],
        ['0', '0', '1', '1', '1'],
      ])
    ).toEqual(16)
    expect(
      maximalSquare([
        ['1', '0', '1', '0', '0'],
        ['1', '0', '1', '1', '1'],
        ['1', '1', '1', '1', '1'],
        ['1', '0', '0', '1', '0'],
      ])
    ).toEqual(4)

    expect(
      maximalSquare([
        ['0', '1'],
        ['1', '0'],
      ])
    ).toEqual(1)
    expect(maximalSquare([['0']])).toEqual(0)
  })

  it('maximalSquare1 function', () => {
    expect(
      maximalSquare1([
        ['1', '1', '1', '1', '0'],
        ['1', '1', '1', '1', '0'],
        ['1', '1', '1', '1', '1'],
        ['1', '1', '1', '1', '1'],
        ['0', '0', '1', '1', '1'],
      ])
    ).toEqual(16)
    expect(
      maximalSquare1([
        ['1', '0', '1', '0', '0'],
        ['1', '0', '1', '1', '1'],
        ['1', '1', '1', '1', '1'],
        ['1', '0', '0', '1', '0'],
      ])
    ).toEqual(4)

    expect(
      maximalSquare1([
        ['0', '1'],
        ['1', '0'],
      ])
    ).toEqual(1)
    expect(maximalSquare1([['0']])).toEqual(0)
  })
})
