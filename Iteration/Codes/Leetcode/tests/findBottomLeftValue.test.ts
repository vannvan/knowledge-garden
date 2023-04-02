/*
 * Description: 513：找树左下角的值
 * Url: https://leetcode.cn/problems/find-bottom-left-tree-value/
 * Created: 2023-04-02 17:44:26
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-02 17:45:43
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import findBottomLeftValue from '../findBottomLeftValue'
import { CBTInserter, TreeNode } from '../utils/tree'
describe('找树左下角的值 测试', () => {
  it('findBottomLeftValue function', () => {
    const tree = new CBTInserter(new TreeNode(1))

    ;[2, 3, 4, null, 5, 6, null, null, 7].map((val) => {
      tree.insert(val)
    })

    expect(findBottomLeftValue(tree.get_root())).toEqual(7)
  })
})
