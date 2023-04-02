/*
 * Description: 404：左叶子之和
 * Url: https://leetcode.cn/problems/sum-of-left-leaves/
 * Created: 2023-04-02 17:25:21
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-02 17:38:37
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import sumOfLeftLeaves from '../sumOfLeftLeaves'
import { CBTInserter, TreeNode } from '../utils/tree'
describe('左叶子之和 测试', () => {
  it('sumOfLeftLeaves function', () => {
    let tree = new CBTInserter(new TreeNode(3))
    // 构造不出例题的树形
    ;[9, 20, null, null, 15, 7].map((val) => {
      tree.insert(val)
    })
    expect(sumOfLeftLeaves(tree.get_root())).toEqual(24)
  })
})
