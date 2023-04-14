/*
 * Description: 124：二叉树中的最大路径和
 * Url: https://leetcode.cn/problems/binary-tree-maximum-path-sum/
 * Tags: 树  深度优先搜索  动态规划  二叉树
 * Created: 2023-04-14 22:05:32
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-14 22:13:52
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

function maxPathSum(root: TreeNode | null): number {
  // Think for yourself for 5 minutes...
  let ans = Number.MIN_SAFE_INTEGER // 节点值存在负数的原因

  const maxPath = (node: TreeNode) => {
    if (node === null) return 0

    let leftMax = Math.max(0, maxPath(node.left))
    let rightMax = Math.max(0, maxPath(node.right))
    // 更新当前层的最大值
    ans = Math.max(ans, leftMax + rightMax + node.val)
    // 将以当前节点为根节点的最大值递给下一层
    return Math.max(leftMax + node.val, rightMax + node.val)
  }

  maxPath(root)
  return ans
}
export default maxPathSum
