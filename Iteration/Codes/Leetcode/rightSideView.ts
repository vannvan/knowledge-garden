/*
 * Description: 199：二叉树的右视图
 * Url: https://leetcode.cn/problems/binary-tree-right-side-view/
 * Tags: 树  深度优先搜索  广度优先搜索  二叉树
 * Created: 2023-04-05 00:05:23
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-05 00:06:48
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

/**
 * 根右左遍历，并记录深度，来判断是否是该深度第一次访问的节点
 * @param root
 * @returns
 */
function rightSideView(root: TreeNode | null): number[] {
  // Think for yourself for 5 minutes...
  const ans = []
  function dfs(node, depth) {
    if (!node) {
      return
    }
    if (ans.length === depth) {
      ans.push(node.val)
    }
    dfs(node.right, depth + 1)
    dfs(node.left, depth + 1)
  }
  dfs(root, 0)
  return ans
}
export default rightSideView
