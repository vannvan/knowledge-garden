/*
 * Description: 169：多数元素
 * Url: https://leetcode.cn/problems/majority-element/
 * Created: 2023-03-26 19:49:29
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-26 19:49:45
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import majorityElement from '../majorityElement'
describe('多数元素 测试', () => {
  it('majorityElement function', () => {
    expect(majorityElement([3, 2, 3])).toEqual(3)
    expect(majorityElement([2, 2, 1, 1, 1, 2, 2])).toEqual(2)
  })
})
