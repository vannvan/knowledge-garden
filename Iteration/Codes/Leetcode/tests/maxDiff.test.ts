/*
 * Description: 1529：改变一个整数能得到的最大差值
 * Url: https://leetcode.cn/problems/max-difference-you-can-get-from-changing-an-integer/
 * Created: 2023-03-16 22:21:50
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-16 23:05:48
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import maxDiff from '../maxDiff'
describe('改变一个整数能得到的最大差值 测试', () => {
  it('maxDiff function', () => {
    maxDiff(555)
    expect(maxDiff(555)).toEqual(888)
    expect(maxDiff(9)).toEqual(8)
    expect(maxDiff(123456)).toEqual(820000)
    expect(maxDiff(10000)).toEqual(80000)
    expect(maxDiff(9288)).toEqual(8700)
  })
})
