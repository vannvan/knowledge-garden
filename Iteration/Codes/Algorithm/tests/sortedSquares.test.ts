/*
 * Description: 有序数组的平方
 * Created: 2023-02-26 15:53:42
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-26 15:54:51
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

import sortedSquares from '../sortedSquares'

describe('sortedSquares测试', () => {
  it('sortedSquares function', () => {
    expect(sortedSquares([-4, -1, 0, 3, 10])).toEqual([0, 1, 9, 16, 100])
    expect(sortedSquares([-7, -3, 2, 3, 11])).toEqual([4, 9, 9, 49, 121])
  })
})
