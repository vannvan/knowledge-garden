/*
 * Description: 24：两两交换链表中的节点
 * Url: https://leetcode.cn/problems/swap-nodes-in-pairs/
 * Created: 2023-04-05 15:15:59
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-05 15:17:18
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import swapPairs from '../swapPairs'
import { ListNode } from '../utils/list'
describe('两两交换链表中的节点 测试', () => {
  it('swapPairs function', () => {
    const list = new ListNode()
    ;[1, 2, 3, 4].map((val) => list.add(val))
    const target = new ListNode()
    ;[2, 1, 4, 3].map((val) => target.add(val))
    expect(swapPairs(list.head)).toEqual(target.head)
  })
})
