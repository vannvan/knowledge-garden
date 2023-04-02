/*
 * Description: 617：合并二叉树
 * Url: https://leetcode.cn/problems/merge-two-binary-trees/
 * Created: 2023-04-02 14:21:19
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-02 14:23:35
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import mergeTrees from '../mergeTrees'
import { CBTInserter, TreeNode } from '../utils/tree'
describe('合并二叉树 测试', () => {
  it('mergeTrees function', () => {
    const tree1 = new CBTInserter(new TreeNode(1))
    ;[3, 2, 5].map((val) => {
      tree1.insert(val)
    })

    const tree2 = new CBTInserter(new TreeNode(2))
    ;[1, 3, null, 4, null, 7].map((val) => {
      tree2.insert(val)
    })

    const targetTree = new CBTInserter(new TreeNode(3))
    ;[4, 5, 5, 4, null, 7].map((val) => {
      targetTree.insert(val)
    })

    expect(mergeTrees(tree1.get_root(), tree2.get_root())).toEqual(targetTree.get_root())
  })
})
