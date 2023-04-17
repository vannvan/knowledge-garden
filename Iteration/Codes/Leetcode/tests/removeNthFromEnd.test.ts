/*
 * Description: 19：删除链表的倒数第 N 个结点
 * Url: https://leetcode.cn/problems/remove-nth-node-from-end-of-list/
 * Created: 2023-04-05 16:31:12
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-06 19:38:17
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import removeNthFromEnd from '../removeNthFromEnd'
import { ListNode } from '../utils/list'
describe('删除链表的倒数第 N 个结点 测试', () => {
  it('removeNthFromEnd function', () => {
    const list = new ListNode()
    ;[1, 2, 3, 4, 5, 6, 7].map((val) => list.add(val))

    const target = new ListNode()
    ;[1, 2, 3, 4, 5, 7].map((val) => target.add(val))
    expect(removeNthFromEnd(list.head, 2)).toEqual(target.head)

    // expect(removeNthFromEnd([1, 2, 3, 4, 5], 2));
    // expect(removeNthFromEnd([1], 1));
    // expect(removeNthFromEnd([1, 2], 1));
  })
})
