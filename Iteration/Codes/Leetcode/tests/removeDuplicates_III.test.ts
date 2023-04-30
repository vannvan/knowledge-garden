/*
 * Description: 80：删除有序数组中的重复项 II
 * Url: https://leetcode.cn/problems/remove-duplicates-from-sorted-array-ii/
 * Created: 2023-04-30 22:44:00
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-30 23:37:13
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import { removeDuplicates, removeDuplicates1, removeDuplicates2 } from '../removeDuplicates_III'
describe('删除有序数组中的重复项 II 测试', () => {
  it('removeDuplicates function', () => {
    expect(removeDuplicates([1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3])).toEqual(5)
    expect(removeDuplicates([1, 1, 1, 2, 2, 3])).toEqual(5)
    expect(removeDuplicates([0, 0, 1, 1, 1, 1, 2, 3, 3])).toEqual(7)
  })

  it('removeDuplicates1 function', () => {
    expect(removeDuplicates1([1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3])).toEqual(5)
    expect(removeDuplicates1([1, 1, 1, 2, 2, 3])).toEqual(5)
    expect(removeDuplicates1([0, 0, 1, 1, 1, 1, 2, 3, 3])).toEqual(7)
  })

  it('removeDuplicates2 function', () => {
    expect(removeDuplicates2([1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3])).toEqual(5)
    expect(removeDuplicates2([1, 1, 1, 2, 2, 3])).toEqual(5)
    expect(removeDuplicates2([0, 0, 1, 1, 1, 1, 2, 3, 3])).toEqual(7)
  })
})
