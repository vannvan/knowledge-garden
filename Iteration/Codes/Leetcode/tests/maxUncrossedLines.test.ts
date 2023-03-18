/*
 * Description: 1105：不相交的线
 * Url: https://leetcode.cn/problems/uncrossed-lines/
 * Created: 2023-03-18 17:24:41
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-18 17:25:36
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import maxUncrossedLines from '../maxUncrossedLines'
describe('不相交的线 测试', () => {
  it('maxUncrossedLines function', () => {
    expect(maxUncrossedLines([1, 4, 2], [1, 2, 4])).toEqual(2)
    expect(maxUncrossedLines([2, 5, 1, 2, 5], [10, 5, 2, 1, 5, 2])).toEqual(3)
    expect(maxUncrossedLines([1, 3, 7, 1, 7, 5], [1, 9, 2, 5, 1])).toEqual(2)
  })
})
