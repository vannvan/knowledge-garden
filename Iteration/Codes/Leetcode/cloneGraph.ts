/*
 * Description: 133：克隆图
 * Url: https://leetcode.cn/problems/clone-graph/
 * Tags: 深度优先搜索  广度优先搜索  图  哈希表
 * Created: 2023-05-11 23:13:06
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-11 23:25:15
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 * Definition for Node.
 * class Node {
 *     val: number
 *     neighbors: Node[]
 *     constructor(val?: number, neighbors?: Node[]) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.neighbors = (neighbors===undefined ? [] : neighbors)
 *     }
 * }
 */

class Node {
  val: number
  neighbors: Node[]
  constructor(val?: number, neighbors?: Node[]) {
    this.val = val === undefined ? 0 : val
    this.neighbors = neighbors === undefined ? [] : neighbors
  }
}

function cloneGraph(node: Node | null): Node | null {
  // Think for yourself for 5 minutes...
  if (node === null) return null
  const visited: Map<Node, Node> = new Map()

  const dfs = (node: Node) => {
    const newNode = new Node(node.val)
    visited.set(node, newNode)
    ;(node.neighbors || []).forEach((ne) => {
      if (!visited.has(ne)) {
        dfs(ne)
      }
      newNode.neighbors.push(visited.get(ne))
    })
  }

  dfs(node)
  return visited.get(node)
}
export default cloneGraph
