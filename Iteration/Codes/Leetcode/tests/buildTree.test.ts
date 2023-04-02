/*
 * Description: 106：从中序与后序遍历序列构造二叉树
 * Url: https://leetcode.cn/problems/construct-binary-tree-from-inorder-and-postorder-traversal/
 * Created: 2023-04-02 21:15:52
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-02 21:28:26
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import buildTree from '../buildTree'
import { CBTInserter, TreeNode } from '../utils/tree'
describe('从中序与后序遍历序列构造二叉树 测试', () => {
  it('buildTree function', () => {
    const tree = new CBTInserter(new TreeNode(3))

    ;[9, 20, null, null, 15, 7].map((val) => {
      tree.insert(val)
    })

    const res = buildTree([9, 3, 15, 20, 7], [9, 15, 7, 20, 3])

    expect(tree.levelOrder(res)).toEqual([3, 9, 20, 15, 7])
  })
})
