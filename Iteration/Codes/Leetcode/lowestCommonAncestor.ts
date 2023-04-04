/*
 * Description: 236：二叉树的最近公共祖先
 * Url: https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/
 * Tags: 树  深度优先搜索  二叉树
 * Created: 2023-04-04 15:43:45
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-04 16:50:26
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

function lowestCommonAncestor1(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null
): TreeNode | null {
  // Think for yourself for 5 minutes...
  // q1. 节点可以是自己的祖先
  // q2. 最近的

  const find = (node: TreeNode, p: TreeNode, q: TreeNode) => {
    if (!node) return null

    if (node.val === p.val || node.val === q.val) {
      return node
    }
    let left = find(node.left, p, q)
    let right = find(node.right, p, q)

    // 后序位置，已经知道左右子树是否存在目标值
    if (left != null && right != null) {
      // 当前节点是 LCA 节点
      return node
    }

    return left != null ? left : right
  }

  return find(root, p, q)
}

function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null
): TreeNode | null {
  if (root === null || root === p || root === q) {
    // 只要当前根节点是p和q中的任意一个，就返回（因为不能比这个更深了，再深p和q中的一个就没了）
    return root
  }

  const left = lowestCommonAncestor(root.left, p, q)
  const right = lowestCommonAncestor(root.right, p, q)

  //p和q都没找到，那就没有
  if (left == null && right == null) {
    return null
  }
  //左子树没有p也没有q，就返回右子树的结果
  if (left == null) {
    return right
  }

  //右子树没有p也没有q就返回左子树的结果
  if (right == null) {
    return left
  }
  //左右子树都找到p和q了，那就说明p和q分别在左右两个子树上，所以此时的最近公共祖先就是root
  return root
}
export default lowestCommonAncestor
