/*
 * undefined: 顺时针螺旋顺序输出 测试
 * Created: 2023-02-27 19:28:40
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-27 20:28:32
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

import spiralOrder from '../spiralOrder'

describe('顺时针螺旋顺序输出 测试', () => {
  it('spiralOrder function', () => {
    const source = [
      [1, 2, 3],
      [8, 9, 4],
      [7, 6, 5],
    ]

    const source2 = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]

    const source3 = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
    ]

    const target = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const target2 = [1, 2, 3, 6, 9, 8, 7, 4, 5]
    const target3 = [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]

    expect(spiralOrder(source)).toEqual(target)
    expect(spiralOrder(source2)).toEqual(target2)
    expect(spiralOrder(source3)).toEqual(target3)
  })
})
