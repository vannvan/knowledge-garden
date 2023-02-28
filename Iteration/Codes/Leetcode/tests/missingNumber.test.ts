/*
 * Description: 丢失的数字 测试
 * Created: 2023-02-28 22:01:46
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-28 22:04:50
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

import missingNumber from '../missingNumber'

describe('丢失的数字 测试', () => {
  it('missingNumber function', () => {
    expect(missingNumber([3, 0, 1])).toEqual(2)
    expect(missingNumber([0, 1])).toEqual(2)
    expect(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1])).toEqual(8)
  })
})
