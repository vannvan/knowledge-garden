/*
 * Description: 783：二叉搜索树中的搜索
 * Url: https://leetcode.cn/problems/search-in-a-binary-search-tree/
 * Tags: 树  二叉搜索树  二叉树
 * Created: 2023-04-03 21:16:48
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-03 21:22:47
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
 * @param val
 * @returns
 */
function searchBST1(root: TreeNode | null, val: number): TreeNode | null {
  // Think for yourself for 5 minutes...
  let target: TreeNode = null
  const traversal = (node: TreeNode) => {
    if (node === null) return
    if (node.val === val) {
      target = node
    }
    node.left && traversal(node.left)
    node.right && traversal(node.right)
  }

  traversal(root)
  return target
}

/**
 * 迭代法
 * @param root
 * @param val
 */
function searchBST(root: TreeNode | null, val: number): TreeNode | null {
  while (root !== null) {
    if (root.val > val) {
      root = root.left
    } else if (root.val < val) {
      root = root.right
    } else {
      return root
    }
  }

  return null
}

export default searchBST
