/*
 * Description: 100：相同的树
 * Url: https://leetcode.cn/problems/same-tree/
 * Created: 2023-04-02 13:46:12
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-02 13:47:57
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import isSameTree from '../isSameTree'
import { CBTInserter, TreeNode } from '../utils/tree'
describe('相同的树 测试', () => {
  it('isSameTree function', () => {
    const leftTree = new CBTInserter(new TreeNode(1))
    ;[2, 3].map((val) => {
      leftTree.insert(val)
    })

    const rightTree = new CBTInserter(new TreeNode(1))
    ;[2, 3].map((val) => {
      rightTree.insert(val)
    })

    expect(isSameTree(leftTree.get_root(), rightTree.get_root())).toEqual(true)
  })
})
