/*
 * Description: 加一 测试
 * Created: 2023-02-28 20:45:42
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-28 21:26:30
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

import plusOne from '../plusOne'

describe('加一 测试', () => {
  it('plusOne function', () => {
    plusOne([1, 9])
    expect(plusOne([9])).toEqual([1, 0])
    expect(plusOne([9, 9])).toEqual([1, 0, 0])

    expect(plusOne([1, 2, 3])).toEqual([1, 2, 4])
    expect(plusOne([1])).toEqual([2])
    expect(plusOne([0])).toEqual([1])
    expect(plusOne([1, 9])).toEqual([2, 0])
    expect(plusOne([1, 9, 9])).toEqual([2, 0, 0])
    expect(plusOne([1, 9, 9, 9])).toEqual([2, 0, 0, 0])
  })
})
