/*
 * Description: 572：另一棵树的子树
 * Url: https://leetcode.cn/problems/subtree-of-another-tree/
 * Created: 2023-04-02 13:59:03
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-02 14:02:22
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import isSubtree from '../isSubtree'
import { CBTInserter, TreeNode } from '../utils/tree'
describe('另一棵树的子树 测试', () => {
  it('isSubtree function', () => {
    const mainTree = new CBTInserter(new TreeNode(3))
    ;[4, 5, 1, 2].map((val) => {
      mainTree.insert(val)
    })

    const subTree = new CBTInserter(new TreeNode(4))
    ;[1, 2].map((val) => {
      subTree.insert(val)
    })

    expect(isSubtree(mainTree.get_root(), subTree.get_root())).toEqual(true)
  })
})
