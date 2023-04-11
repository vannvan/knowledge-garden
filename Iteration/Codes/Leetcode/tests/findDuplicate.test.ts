/*
 * Description: 287：寻找重复数
 * Url: https://leetcode.cn/problems/find-the-duplicate-number/
 * Created: 2023-04-11 21:57:04
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-11 22:21:21
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import findDuplicate from '../findDuplicate'
describe('寻找重复数 测试', () => {
  it('findDuplicate function', () => {
    expect(findDuplicate([1, 3, 4, 2, 2])).toEqual(2)
    expect(findDuplicate([3, 1, 3, 4, 2])).toEqual(3)
  })
})
