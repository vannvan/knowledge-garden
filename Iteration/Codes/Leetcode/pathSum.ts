/*
 * Description: 113：路径总和 II
 * Url: https://leetcode.cn/problems/path-sum-ii/
 * Tags: 树  深度优先搜索  回溯  二叉树
 * Created: 2023-04-02 18:34:25
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-02 19:09:16
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
 * 不对
 * @param root
 * @param targetSum
 * @returns
 */
function pathSum1(root: TreeNode | null, targetSum: number): number[][] {
  // Think for yourself for 5 minutes...

  const ans: number[][] = []

  const sum = (nums: number[]) => {
    if (nums.length) {
      return nums.reduce((prev, curr) => prev + curr)
    }
    return 0
  }

  const traverse = (node: TreeNode, path: number[]) => {
    // 递归到叶子节点就终止
    if (!node) return
    if (node.left === null && node.right === null && node.val !== null) {
      path.push(node.val)
      if (sum(path) === targetSum) {
        ans.push(path)
      }
      return
    }
    path.push(node.val)
    node.left && traverse(node.left, path)
    node.right && traverse(node.right, path)
  }

  traverse(root, [])

  return ans
}

/**
 *递归通俗版
 * @param root
 * @param targetSum
 * @returns
 */
function pathSum1(root: TreeNode | null, targetSum: number): number[][] {
  const ans: number[][] = []

  const traverse = (node: TreeNode, cnt: number, path: number[]) => {
    if (cnt === 0 && !node.left && !node.right) {
      ans.push([...path])
      return
    }

    if (!node.left && !node.right) return

    if (node.left) {
      path.push(node.left.val)
      traverse(node.left, cnt - node.left.val, path)
      path.pop()
    }

    if (node.right) {
      path.push(node.right.val)
      traverse(node.right, cnt - node.right.val, path)
      path.pop()
    }

    return
  }

  if (!root) return ans
  traverse(root, targetSum - root.val, [root.val])
  return ans
}

/**
 * 递归精简版
 * @param root
 * @param targetSum
 */
function pathSum(root: TreeNode | null, targetSum: number): number[][] {
  const ans: number[][] = []

  const track: number[] = []

  const traverse = (node: TreeNode, sum: number) => {
    track.push(node.val)
    sum -= node.val
    if (node.left === null && node.right === null && sum === 0) {
      ans.push([...track])
    }

    node.left && traverse(node.left, sum)
    node.right && traverse(node.right, sum)
    // 回溯
    const cur = track.pop()
    sum -= cur
  }

  if (!root) return ans

  traverse(root, targetSum)

  return ans
}
export default pathSum
