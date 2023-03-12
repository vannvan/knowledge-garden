/*
 * Description: 2199：两栋颜色不同且距离最远的房子
 * Url: https://leetcode.cn/problems/two-furthest-houses-with-different-colors/
 * Created: 2023-03-12 17:42:12
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-12 17:51:41
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import maxDistance from '../maxDistance'
describe('两栋颜色不同且距离最远的房子 测试', () => {
  it('maxDistance function', () => {
    expect(maxDistance([1, 1, 1, 6, 1, 1, 1])).toEqual(3)
    expect(maxDistance([1, 1, 1, 6, 1, 1, 1, 1])).toEqual(4)
    expect(maxDistance([1, 1, 1, 6, 1, 1, 1, 2])).toEqual(7)
    expect(maxDistance([1, 1, 1, 6, 1, 1, 1, 2])).toEqual(7)
    expect(maxDistance([1, 1, 1, 6, 1, 1, 1, 1])).toEqual(4)
    expect(maxDistance([1, 8, 3, 8, 3])).toEqual(4)
    expect(maxDistance([0, 1])).toEqual(1)
  })
})
