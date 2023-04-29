/*
 * Description: 2532：删除字符使频率相同
 * Url: https://leetcode.cn/problems/remove-letter-to-equalize-frequency/
 * Created: 2023-04-29 20:31:01
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-29 20:45:47
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import equalFrequency from '../equalFrequency'
describe('删除字符使频率相同 测试', () => {
  it('equalFrequency function', () => {
    expect(equalFrequency('abcc')).toEqual(true)
    expect(equalFrequency('ccab')).toEqual(true)
    expect(equalFrequency('cacb')).toEqual(true)
    expect(equalFrequency('aazz')).toEqual(false)
  })
})
