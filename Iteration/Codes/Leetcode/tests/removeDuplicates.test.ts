/*
 * undefined: 删除有序数组中的重复项 测试
 * Created: 2023-02-27 22:28:20
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-27 22:55:38
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

import removeDuplicates from '../removeDuplicates'

describe('删除有序数组中的重复项 测试', () => {
  it('removeDuplicates function', () => {
    expect(removeDuplicates([1, 1, 2])).toEqual(2)
    expect(removeDuplicates([1, 2, 3, 3])).toEqual(3)
    expect(removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4])).toEqual(5)
  })
})
