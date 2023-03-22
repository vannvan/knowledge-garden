/*
 * Description: 1482：有多少小于当前数字的数字
 * Url: https://leetcode.cn/problems/how-many-numbers-are-smaller-than-the-current-number/
 * Created: 2023-03-22 20:44:28
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-22 20:58:59
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import smallerNumbersThanCurrent from '../smallerNumbersThanCurrent'
describe('有多少小于当前数字的数字 测试', () => {
  it('smallerNumbersThanCurrent function', () => {
    expect(smallerNumbersThanCurrent([8, 1, 2, 2, 3])).toEqual([4, 0, 1, 1, 3]) // 0 1 3 3 4
    expect(smallerNumbersThanCurrent([6, 5, 4, 8])).toEqual([2, 1, 0, 3])
    expect(smallerNumbersThanCurrent([7, 7, 7, 7])).toEqual([0, 0, 0, 0])
  })
})
