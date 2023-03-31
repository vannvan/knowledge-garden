/*
 * Description: 222：完全二叉树的节点个数
 * Url: https://leetcode.cn/problems/count-complete-tree-nodes/
 * Created: 2023-03-31 21:32:18
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-31 22:55:36
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import countNodes from '../countNodes'
import { TreeNode, CBTInserter } from '../utils/tree'
describe('完全二叉树的节点个数 测试', () => {
  it('countNodes function', () => {
    let root = new TreeNode(1)
    const bst = new CBTInserter(root)

    ;[2, 3, 4, 5, 6].map((el) => {
      bst.insert(el)
    })

    expect(countNodes(bst.get_root())).toEqual(6)
  })
})
