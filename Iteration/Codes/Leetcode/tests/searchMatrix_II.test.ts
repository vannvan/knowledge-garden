/*
 * Description: 74：搜索二维矩阵
 * Url: https://leetcode.cn/problems/search-a-2d-matrix/
 * Created: 2023-04-17 21:07:52
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-17 21:08:11
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import searchMatrix from '../searchMatrix_II'
describe('搜索二维矩阵 测试', () => {
  it('searchMatrix function', () => {
    expect(
      searchMatrix(
        [
          [1, 3, 5, 7],
          [10, 11, 16, 20],
          [23, 30, 34, 60],
        ],
        3
      )
    ).toEqual(true)
    expect(
      searchMatrix(
        [
          [1, 3, 5, 7],
          [10, 11, 16, 20],
          [23, 30, 34, 60],
        ],
        13
      )
    ).toEqual(false)
  })
})
