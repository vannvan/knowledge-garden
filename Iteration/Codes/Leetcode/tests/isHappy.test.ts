/*
 * Description: 202：快乐数
 * Url: https://leetcode.cn/problems/happy-number/
 * Created: 2023-03-13 20:19:53
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-13 20:36:35
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import isHappy from '../isHappy'
describe('快乐数 测试', () => {
  it('isHappy function', () => {
    expect(isHappy(19)).toEqual(true)
    // expect(isHappy(199)).toEqual()
    expect(isHappy(2)).toEqual(false)
  })
})
