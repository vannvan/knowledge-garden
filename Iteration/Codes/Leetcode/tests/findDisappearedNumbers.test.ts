/*
 * Description: 448：找到所有数组中消失的数字
 * Url: https://leetcode.cn/problems/find-all-numbers-disappeared-in-an-array/
 * Created: 2023-04-12 21:27:24
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-12 22:02:13
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import findDisappearedNumbers from '../findDisappearedNumbers'
describe('找到所有数组中消失的数字 测试', () => {
  it('findDisappearedNumbers function', () => {
    expect(findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1])).toEqual([5, 6])
    expect(findDisappearedNumbers([1, 1])).toEqual([2])
  })
})
