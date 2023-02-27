/*
 * undefined: 螺旋矩阵 测试
 * Created: 2023-02-27 18:44:02
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-27 19:24:30
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

import generateMatrix from '../generateMatrix'

describe('螺旋矩阵 测试', () => {
  it('generateMatrix function', () => {
    const s = generateMatrix(3)

    const result = [
      [1, 2, 3],
      [8, 9, 4],
      [7, 6, 5],
    ]

    expect(s).toEqual(result)
  })
})
