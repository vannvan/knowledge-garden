/*
 * Description: 61：旋转链表
 * Url: https://leetcode.cn/problems/rotate-list/
 * Created: 2023-04-19 23:26:27
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-03 11:10:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import rotateRight from '../rotateRight'
describe('旋转链表 测试', () => {
  it('rotateRight function', () => {
    expect(rotateRight([1, 2, 3, 4, 5], 2))
    expect(rotateRight([0, 1, 2], 4))
  })
})
