/*
 * Description: 908：链表的中间结点
 * Url: https://leetcode.cn/problems/middle-of-the-linked-list/
 * Created: 2023-04-05 16:56:23
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-05 17:01:19
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import middleNode from '../middleNode'
import { ListNode } from '../utils/list'
describe('链表的中间结点 测试', () => {
  it('middleNode function', () => {
    const list = new ListNode()
    ;[1, 2, 3, 4, 5].map((val) => list.add(val))

    const target = new ListNode(3)

    expect(middleNode(list.head).val).toEqual(target.val)
  })
})
