/*
 * Description: 289：生命游戏
 * Url: https://leetcode.cn/problems/game-of-life/
 * Created: 2023-04-24 22:31:04
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-24 22:49:41
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import gameOfLife from '../gameOfLife'
describe('生命游戏 测试', () => {
  it('gameOfLife function', () => {
    expect(
      gameOfLife([
        [0, 1, 0],
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
      ])
    ).toEqual([
      [0, 0, 0],
      [1, 0, 1],
      [0, 1, 1],
      [0, 1, 0],
    ])
    expect(
      gameOfLife([
        [1, 1],
        [1, 0],
      ])
    ).toEqual([
      [1, 1],
      [1, 1],
    ])
  })
})
