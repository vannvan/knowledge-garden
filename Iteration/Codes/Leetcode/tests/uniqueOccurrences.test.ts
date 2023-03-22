/*
 * Description: 1319：独一无二的出现次数
 * Url: https://leetcode.cn/problems/unique-number-of-occurrences/
 * Created: 2023-03-22 21:38:21
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-22 21:38:52
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import uniqueOccurrences from '../uniqueOccurrences'
describe('独一无二的出现次数 测试', () => {
  it('uniqueOccurrences function', () => {
    expect(uniqueOccurrences([1, 2, 2, 1, 1, 3])).toEqual(true)
    expect(uniqueOccurrences([1, 2])).toEqual(false)
    expect(uniqueOccurrences([-3, 0, 1, -3, 1, 1, 1, -3, 10, 0])).toEqual(true)
  })
})
