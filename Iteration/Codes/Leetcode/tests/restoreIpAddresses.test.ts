/*
 * Description: 复原 IP 地址
 * Url: https://leetcode.cn/problems/restore-ip-addresses/
 * Created: 2023-03-07 21:10:36
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-07 21:51:05
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import restoreIpAddresses from '../restoreIpAddresses'
describe('复原 IP 地址 测试', () => {
  it('restoreIpAddresses function', () => {
    restoreIpAddresses('25525511135')
    return
    expect(restoreIpAddresses('25525511135')).toEqual(
      expect.arrayContaining(['255.255.11.135', '255.255.111.35'])
    )
    expect(restoreIpAddresses('0000')).toEqual(['0.0.0.0'])
    expect(restoreIpAddresses('101023')).toEqual(
      expect.arrayContaining(['1.0.10.23', '1.0.102.3', '10.1.0.23', '10.10.2.3', '101.0.2.3'])
    )
  })
})
