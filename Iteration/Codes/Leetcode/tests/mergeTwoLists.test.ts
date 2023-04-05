/*
 * Description: 21：合并两个有序链表
 * Url: https://leetcode.cn/problems/merge-two-sorted-lists/
 * Created: 2023-04-05 16:07:06
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-05 16:11:32
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import mergeTwoLists from '../mergeTwoLists'
import { ListNode } from '../utils/list'
describe('合并两个有序链表 测试', () => {
  it('mergeTwoLists function', () => {
    let list1 = new ListNode()
    ;[1, 2, 4].map((val) => list1.add(val))

    let list2 = new ListNode()
    ;[1, 3, 4].map((val) => list2.add(val))

    let target = new ListNode()
    ;[1, 1, 2, 3, 4, 4].map((val) => target.add(val))

    expect(mergeTwoLists(list1.head, list2.head)).toEqual(target.head)
  })
})
