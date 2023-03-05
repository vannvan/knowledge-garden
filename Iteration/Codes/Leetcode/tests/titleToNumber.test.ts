/*
 * Description: Excel 表列序号
 * Url: https://leetcode.cn/problems/excel-sheet-column-number/
 * Created: 2023-03-05 19:58:05
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-05 20:11:05
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import titleToNumber from '../titleToNumber'
describe('Excel 表列序号 测试', () => {
  it('titleToNumber function', () => {
    expect(titleToNumber('A')).toEqual(1)
    expect(titleToNumber('AB')).toEqual(28)
    expect(titleToNumber('ZY')).toEqual(701)
  })
})
