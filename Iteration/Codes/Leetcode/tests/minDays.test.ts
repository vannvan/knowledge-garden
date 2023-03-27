/*
 * Description: 1605：制作 m 束花所需的最少天数
 * Url: https://leetcode.cn/problems/minimum-number-of-days-to-make-m-bouquets/
 * Created: 2023-03-27 23:34:08
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-27 23:34:53
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import minDays from '../minDays'
describe('制作 m 束花所需的最少天数 测试', () => {
  it('minDays function', () => {
    expect(minDays([1, 10, 3, 10, 2], 3, 1)).toEqual(3)
    expect(minDays([1, 10, 3, 10, 2], 3, 2)).toEqual(-1)
    expect(minDays([7, 7, 7, 7, 12, 7, 7], 2, 3)).toEqual(12)
  })
})
