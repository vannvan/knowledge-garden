/*
 * Description: 687：最长同值路径
 * Url: https://leetcode.cn/problems/longest-univalue-path/
 * Tags: 树  深度优先搜索  二叉树
 * Created: 2023-04-14 22:23:02
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-14 22:27:07
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

function longestUnivaluePath(root: TreeNode | null): number {
  // Think for yourself for 5 minutes...
  let ans = 0
  const longestPath = (node: TreeNode) => {
    if (node === null) return 0
    let left = longestPath(node.left)
    let right = longestPath(node.right)
    if (node.left && node.left.val === node.val) {
      left++
    } else {
      left = 0
    }

    if (node.right && node.right.val == node.val) {
      right++
    } else {
      right = 0
    }
    ans = Math.max(ans, left + right)
    return Math.max(left, right)
  }

  longestPath(root)
  return ans
}
export default longestUnivaluePath
