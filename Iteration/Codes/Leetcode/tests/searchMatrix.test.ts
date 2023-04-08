/*
 * Description: 240：搜索二维矩阵 II
 * Url: https://leetcode.cn/problems/search-a-2d-matrix-ii/
 * Created: 2023-04-08 20:34:41
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-08 20:35:03
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import searchMatrix from '../searchMatrix'
describe('搜索二维矩阵 II 测试', () => {
  it('searchMatrix function', () => {
    expect(
      searchMatrix(
        [
          [1, 4, 7, 11, 15],
          [2, 5, 8, 12, 19],
          [3, 6, 9, 16, 22],
          [10, 13, 14, 17, 24],
          [18, 21, 23, 26, 30],
        ],
        5
      )
    ).toEqual(true)
    expect(
      searchMatrix(
        [
          [1, 4, 7, 11, 15],
          [2, 5, 8, 12, 19],
          [3, 6, 9, 16, 22],
          [10, 13, 14, 17, 24],
          [18, 21, 23, 26, 30],
        ],
        20
      )
    ).toEqual(false)
  })
})
