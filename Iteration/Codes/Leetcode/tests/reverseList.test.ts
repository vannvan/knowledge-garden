/*
 * Description: 206：反转链表
 * Url: https://leetcode.cn/problems/reverse-linked-list/
 * Created: 2023-04-05 14:42:47
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-05 14:45:39
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import reverseList from '../reverseList'
import { ListNode } from '../utils/list'
describe('反转链表 测试', () => {
  it('reverseList function', () => {
    const list = new ListNode()
    ;[1, 2, 3, 4, 5].map((val) => list.add(val))

    const target = new ListNode()
    ;[5, 4, 3, 2, 1].map((val) => target.add(val))

    expect(reverseList(list.head)).toEqual(target.head)
  })
})
