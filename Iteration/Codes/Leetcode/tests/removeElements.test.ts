/*
 * Description: 203：移除链表元素
 * Url: https://leetcode.cn/problems/remove-linked-list-elements/
 * Created: 2023-04-05 13:05:08
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-05 13:41:12
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import removeElements from '../removeElements'
import { ListNode } from '../utils/list'
describe('移除链表元素 测试', () => {
  it('removeElements function', () => {
    const list = new ListNode()
    ;[1, 2, 6, 3, 4, 5, 6].map((val) => list.add(val))
    const ans = removeElements(list.head, 6)

    const target = new ListNode()
    ;[1, 2, 3, 4, 5].map((val) => target.add(val))
    expect(ans).toEqual(target.head)
  })
})
