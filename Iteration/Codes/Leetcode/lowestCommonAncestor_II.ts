/*
 * Description: 235：二叉搜索树的最近公共祖先
 * Url: https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-search-tree/
 * Tags: 树  深度优先搜索  二叉搜索树  二叉树
 * Created: 2023-04-04 21:46:12
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-04 21:49:03
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
 * 递归法
 * @param root
 * @param p
 * @param q
 */
function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null
): TreeNode | null {
  // Think for yourself for 5 minutes...
  const x = root.val
  if (p.val < x && q.val < x) {
    return lowestCommonAncestor(root.left, p, q)
  }

  if (p.val > x && q.val > x) {
    return lowestCommonAncestor(root.right, p, q)
  }
  return root
}

/**
 * 迭代法
 * @param root
 * @param p
 * @param q
 */
function lowestCommonAncestor1(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null
): TreeNode | null {
  while (root) {
    if (p.val < root.val && q.val < root.val) {
      root = root.left
    } else if (p.val > root.val && q.val > root.val) {
      root = root.right
    } else {
      return root
    }
  }

  return null
}

export default lowestCommonAncestor
