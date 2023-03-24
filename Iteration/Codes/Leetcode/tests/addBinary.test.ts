/*
 * Description: 67：二进制求和
 * Url: https://leetcode.cn/problems/add-binary/
 * Created: 2023-03-24 21:54:25
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-24 22:28:02
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import addBinary from '../addBinary'
describe('二进制求和 测试', () => {
  it('addBinary function', () => {
    expect(addBinary('11', '1')).toEqual('100')
    expect(addBinary('1010', '1011')).toEqual('10101')
  })
})
