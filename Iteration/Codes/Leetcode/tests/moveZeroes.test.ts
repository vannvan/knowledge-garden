/*
 * Description: 283：移动零
 * Url: https://leetcode.cn/problems/move-zeroes/
 * Created: 2023-03-17 21:01:11
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-17 21:11:37
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import moveZeroes from '../moveZeroes'
describe('移动零 测试', () => {
  it('moveZeroes function', () => {
    expect(moveZeroes([0, 1, 0, 3, 12]))
    expect(moveZeroes([0, 1, 0, 3, 12, 0]))
    expect(moveZeroes([0, 1, 0, 0, 3, 12, 0]))

    expect(moveZeroes([0]))
  })
})
