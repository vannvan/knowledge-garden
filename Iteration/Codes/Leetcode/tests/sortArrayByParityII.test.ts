/*
 * Description: 958：按奇偶排序数组 II
 * Url: https://leetcode.cn/problems/sort-array-by-parity-ii/
 * Created: 2023-03-23 20:49:30
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-23 21:07:42
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import sortArrayByParityII from '../sortArrayByParityII'
describe('按奇偶排序数组 II 测试', () => {
  it('sortArrayByParityII function', () => {
    expect(sortArrayByParityII([4, 2, 5, 7])).toEqual([4, 5, 2, 7])
    expect(sortArrayByParityII([2, 3])).toEqual([2, 3])
  })
})
