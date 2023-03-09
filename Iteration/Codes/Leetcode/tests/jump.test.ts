/*
 * Description: 45：跳跃游戏 II
 * Url: https://leetcode.cn/problems/jump-game-ii/
 * Created: 2023-03-09 22:48:07
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-09 23:17:27
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import jump from '../jump'
describe('跳跃游戏 II 测试', () => {
  it('jump function', () => {
    jump([2, 3, 1, 1, 4])
    expect(jump([2, 3, 1, 1, 4])).toEqual(2)
    expect(jump([2, 3, 0, 1, 4])).toEqual(2)
  })
})
