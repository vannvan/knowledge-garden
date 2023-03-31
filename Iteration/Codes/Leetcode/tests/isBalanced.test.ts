/*
 * Description: 110：平衡二叉树
 * Url: https://leetcode.cn/problems/balanced-binary-tree/
 * Created: 2023-03-31 23:05:42
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-31 23:16:46
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import isBalanced from '../isBalanced'
import { CBTInserter, TreeNode } from '../utils/tree'
describe('平衡二叉树 测试', () => {
  it('isBalanced function', () => {
    const tree = new CBTInserter(new TreeNode(3))
    ;[9, 20, null, null, 15, 7].map((val) => {
      tree.insert(val)
    })
    expect(isBalanced(tree.get_root())).toEqual(true)

    // CBTInserter 创建不了这种非平衡二叉树

    return
    const tree2 = new CBTInserter(new TreeNode(1))

    ;[2, 2, 3, 3, null, null, 4, 4].map((val) => {
      tree2.insert(val)
    })
    expect(isBalanced(tree2.get_root())).toEqual(false)
  })
})
