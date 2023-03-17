/*
 * Description: 165：比较版本号
 * Url: https://leetcode.cn/problems/compare-version-numbers/
 * Created: 2023-03-17 16:14:16
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-17 16:56:32
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import compareVersion from '../compareVersion'
describe('比较版本号 测试', () => {
  it('compareVersion function', () => {
    compareVersion('1.0.1', '1.0.0')
    // return
    expect(compareVersion('1.01', '1.001')).toEqual(0)
    expect(compareVersion('1.0', '1.0.0')).toEqual(0)
    expect(compareVersion('1.0.1', '1.0.0')).toEqual(1)
    expect(compareVersion('0.1', '1.1')).toEqual(-1)
    expect(compareVersion('1.0.0', '1.0')).toEqual(0)
    expect(compareVersion('1.0', '1.0.1')).toEqual(-1)
    expect(compareVersion('1.0', '1.0.01')).toEqual(-1)
    expect(compareVersion('1.0.1', '1.0.01')).toEqual(0)
    expect(compareVersion('1.0.1', '1.1.01')).toEqual(-1)
    expect(compareVersion('1.1.1', '1.0.01')).toEqual(1)
  })
})
