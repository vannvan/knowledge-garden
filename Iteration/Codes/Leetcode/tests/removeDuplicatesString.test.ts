/*
 * Description: 删除字符串中的所有相邻重复项
 * Url: https://leetcode.cn/problems/remove-all-adjacent-duplicates-in-string/
 * Created: 2023-03-04 20:05:26
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-04 20:22:35
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import removeDuplicatesString from '../removeDuplicatesString'
describe('删除字符串中的所有相邻重复项 测试', () => {
  it('removeDuplicatesString function', () => {
    removeDuplicatesString('abbaca')
    expect(removeDuplicatesString('abbaca')).toEqual('ca')
    expect(removeDuplicatesString('azxxzy')).toEqual('ay')
  })
})
