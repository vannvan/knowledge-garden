/*
 * Description: 16：最接近的三数之和
 * Url: https://leetcode.cn/problems/3sum-closest/
 * Created: 2023-03-26 18:42:42
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-26 18:43:03
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import threeSumClosest from '../threeSumClosest'
describe('最接近的三数之和 测试', () => {
  it('threeSumClosest function', () => {
    expect(threeSumClosest([-1, 2, 1, -4], 1)).toEqual(2)
    expect(threeSumClosest([0, 0, 0], 1)).toEqual(0)
  })
})
