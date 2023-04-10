/*
 * Description: 96：不同的二叉搜索树
 * Url: https://leetcode.cn/problems/unique-binary-search-trees/
 * Created: 2023-04-10 22:40:23
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-10 22:40:44
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import numTrees from '../numTrees'
describe('不同的二叉搜索树 测试', () => {
  it('numTrees function', () => {
    expect(numTrees(3)).toEqual(5)
    expect(numTrees(1)).toEqual(1)
  })
})
