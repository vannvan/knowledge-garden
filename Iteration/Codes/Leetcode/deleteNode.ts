/*
 * Description: 450：删除二叉搜索树中的节点
 * Url: https://leetcode.cn/problems/delete-node-in-a-bst/
 * Tags: 树  二叉搜索树  二叉树
 * Created: 2023-04-04 22:14:42
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-04 22:27:30
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

function getMin(node: TreeNode) {
  // BST 最左边的就是最小的
  while (node.left != null) node = node.left
  return node
}

function deleteNode(root: TreeNode | null, key: number): TreeNode | null {
  // Think for yourself for 5 minutes...
  if (root == null) return null
  if (root.val === key) {
    // 可以删除啦
    if (root.left === null) return root.right
    if (root.right === null) return root.left

    const minNode = getMin(root.right)
    root.right = deleteNode(root.right, minNode.val)
    minNode.left = root.left
    minNode.right = root.right
    root = minNode
  } else if (root.val > key) {
    root.left = deleteNode(root.left, key)
  } else if (root.val < key) {
    root.right = deleteNode(root.right, key)
  }

  return root
}
export default deleteNode
