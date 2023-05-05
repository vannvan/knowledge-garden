/*
 * Description: 搜索插入位置 测试
 * Created: 2023-02-27 22:58:59
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-27 11:24:01
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

import searchInsert from '../searchInsert'

describe('搜索插入位置 测试', () => {
  it('searchInsert function', () => {
    // searchInsert([1, 3, 5, 6], 5)
    expect(searchInsert([1, 3, 5, 6], 5)).toEqual(2)
    expect(searchInsert([1, 3, 5, 6], 0)).toEqual(0)
    expect(searchInsert([1, 3, 5, 6], 0)).toEqual(0)
    expect(searchInsert([1, 3], 2)).toEqual(1)

    expect(searchInsert([1, 3, 5, 6], 2)).toEqual(1)
    expect(searchInsert([1, 3, 5, 6], 7)).toEqual(4)
  })
})
