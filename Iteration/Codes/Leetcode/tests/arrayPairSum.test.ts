/*
 * Description: 561：数组拆分
 * Url: https://leetcode.cn/problems/array-partition/
 * Created: 2023-03-12 17:15:10
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-12 17:15:26
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import arrayPairSum from '../arrayPairSum'
describe('数组拆分 测试', () => {
  it('arrayPairSum function', () => {
    expect(arrayPairSum([1, 4, 3, 2])).toEqual(4)
    expect(arrayPairSum([6, 2, 6, 5, 1, 2])).toEqual(9)
  })
})
