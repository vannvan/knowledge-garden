/*
 * Description: 89：格雷编码
 * Url: https://leetcode.cn/problems/gray-code/
 * Created: 2023-03-26 19:44:34
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-26 19:45:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import grayCode from '../grayCode'
describe('格雷编码 测试', () => {
  it('grayCode function', () => {
    expect(grayCode(2)).toEqual([0, 1, 3, 2])
    expect(grayCode(1)).toEqual([0, 1])
  })
})
