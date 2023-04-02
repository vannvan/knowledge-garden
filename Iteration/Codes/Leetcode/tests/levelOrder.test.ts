/*
 * Description: 102：二叉树的层序遍历
 * Url: https://leetcode.cn/problems/binary-tree-level-order-traversal/
 * Created: 2023-04-02 21:31:03
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-02 21:35:35
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import levelOrder from '../levelOrder'
import { CBTInserter, TreeNode } from '../utils/tree'
describe('二叉树的层序遍历 测试', () => {
  it('levelOrder function', () => {
    const tree = new CBTInserter(new TreeNode(3))
    ;[9, 20, null, null, 15, 7].map((val) => {
      tree.insert(val)
    })

    expect(levelOrder(tree.get_root())).toEqual([[3], [9, 20], [null, null, 15, 7]])
  })
})
