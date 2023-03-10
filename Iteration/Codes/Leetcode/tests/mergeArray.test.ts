/*
 * Description: 合并两个有序数组 测试
 * Created: 2023-02-28 19:06:37
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-10 22:07:16
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

import mergeArray from '../mergeArray'

describe('合并两个有序数组 测试', () => {
  it('mergeArray function', () => {
    mergeArray([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3)
    // expect(mergeArray([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 2))
  })
})
