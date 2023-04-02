/*
 * Description: 100289：对称的二叉树
 * Url: https://leetcode.cn/problems/dui-cheng-de-er-cha-shu-lcof/
 * Created: 2023-04-02 14:26:25
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-02 14:27:23
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import isSymmetric from '../isSymmetric'
import { CBTInserter, TreeNode } from '../utils/tree'
describe('对称的二叉树 测试', () => {
  it('isSymmetric function', () => {
    const tree = new CBTInserter(new TreeNode(1))

    ;[2, 2, 3, 4, 4, 3].map((val) => {
      tree.insert(val)
    })
    expect(isSymmetric(tree.get_root())).toEqual(true)
  })
})
