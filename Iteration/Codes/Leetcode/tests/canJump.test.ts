/*
 * Description: 55：跳跃游戏
 * Url: https://leetcode.cn/problems/jump-game/
 * Created: 2023-03-11 18:14:36
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-11 18:19:48
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import canJump from '../canJump'
describe('跳跃游戏 测试', () => {
  it('canJump function', () => {
    canJump([2, 3, 1, 1, 4])
    expect(canJump([2, 3, 1, 1, 4])).toEqual(true)
    expect(canJump([3, 2, 1, 0, 4])).toEqual(false)
  })
})
