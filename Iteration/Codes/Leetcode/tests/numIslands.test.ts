/*
 * Description: 200：岛屿数量
 * Url: https://leetcode.cn/problems/number-of-islands/
 * Created: 2023-04-18 20:57:46
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-18 20:58:07
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import numIslands from '../numIslands'
describe('岛屿数量 测试', () => {
  it('numIslands function', () => {
    expect(
      numIslands([
        ['1', '1', '1', '1', '0'],
        ['1', '1', '0', '1', '0'],
        ['1', '1', '0', '0', '0'],
        ['0', '0', '0', '0', '0'],
      ])
    ).toEqual(1)
    expect(
      numIslands([
        ['1', '1', '0', '0', '0'],
        ['1', '1', '0', '0', '0'],
        ['0', '0', '1', '0', '0'],
        ['0', '0', '0', '1', '1'],
      ])
    ).toEqual(3)
  })
})
