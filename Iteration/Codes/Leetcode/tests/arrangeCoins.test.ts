/*
 * Description: 441：排列硬币
 * Url: https://leetcode.cn/problems/arranging-coins/
 * Created: 2023-03-25 22:32:08
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-25 22:32:30
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import arrangeCoins from '../arrangeCoins'
describe('排列硬币 测试', () => {
  it('arrangeCoins function', () => {
    expect(arrangeCoins(5)).toEqual(2)
    expect(arrangeCoins(8)).toEqual(3)
  })
})
