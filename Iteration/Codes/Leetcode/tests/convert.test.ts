/*
 * Description: 6：N 字形变换
 * Url: https://leetcode.cn/problems/zigzag-conversion/
 * Created: 2023-03-25 17:40:30
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-25 17:41:07
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import convert from '../convert'
describe('N 字形变换 测试', () => {
  it('convert function', () => {
    expect(convert('PAYPALISHIRING', 3)).toEqual('PAHNAPLSIIGYIR')
    expect(convert('PAYPALISHIRING', 4)).toEqual('PINALSIGYAHRPI')
    expect(convert('A', 1)).toEqual('A')
  })
})
