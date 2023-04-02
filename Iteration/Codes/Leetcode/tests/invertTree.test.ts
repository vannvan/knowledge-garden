/*
 * Description: 226：翻转二叉树
 * Url: https://leetcode.cn/problems/invert-binary-tree/
 * Created: 2023-04-02 14:13:38
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-02 14:15:56
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import invertTree from '../invertTree'
import { CBTInserter, TreeNode } from '../utils/tree'
describe('翻转二叉树 测试', () => {
  it('invertTree function', () => {
    const tree = new CBTInserter(new TreeNode(4))
    ;[2, 7, 1, 3, 6, 9].map((val) => {
      tree.insert(val)
    })

    const tree2 = new CBTInserter(new TreeNode(4))
    ;[7, 2, 9, 6, 3, 1].map((val) => {
      tree2.insert(val)
    })

    expect(invertTree(tree.get_root())).toEqual(tree2.get_root())
  })
})
