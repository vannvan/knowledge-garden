/*
 * Description: 257：二叉树的所有路径
 * Url: https://leetcode.cn/problems/binary-tree-paths/
 * Created: 2023-04-02 12:58:33
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-02 13:16:24
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import binaryTreePaths from '../binaryTreePaths'
import { CBTInserter, TreeNode } from '../utils/tree'
describe('二叉树的所有路径 测试', () => {
  it('binaryTreePaths function', () => {
    const bst = new CBTInserter(new TreeNode(1))

    ;[2, 3, null, 5].map((el) => {
      bst.insert(el)
    })
    expect(binaryTreePaths(bst.get_root())).toEqual(['1->2->5', '1->3'])
  })
})
