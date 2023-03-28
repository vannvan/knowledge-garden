/*
 * Description: 380：O(1) 时间插入、删除和获取随机元素
 * Url: https://leetcode.cn/problems/insert-delete-getrandom-o1/
 * Created: 2023-03-28 21:23:17
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-28 21:45:20
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import RandomizedSet from '../RandomizedSet'
describe('O(1) 时间插入、删除和获取随机元素 测试', () => {
  it('RandomizedSet function', () => {
    const rs = new RandomizedSet()
    expect(rs.insert(1)).toEqual(true)
    expect(rs.insert(1)).toEqual(false)
    expect(rs.insert(2)).toEqual(true)
    expect(rs.insert(3)).toEqual(true)
    expect(rs.insert(5)).toEqual(true)
    expect(rs.remove(3)).toEqual(true)
    expect(rs.remove(7)).toEqual(false)
    let s = [1, 2, 5, 7].includes(rs.getRandom())
    expect(s).toEqual(true)
  })
})
