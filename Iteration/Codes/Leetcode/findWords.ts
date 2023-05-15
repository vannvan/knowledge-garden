/*
 * Description: 212：单词搜索 II
 * Url: https://leetcode.cn/problems/word-search-ii/
 * Tags: 字典树  数组  字符串  回溯  矩阵
 * Created: 2023-05-15 23:13:11
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-15 23:49:15
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

class Trie {
  tree: {
    isEnd?: boolean
    val?: string
  }
  constructor() {
    this.tree = {}
  }

  insert(word: string) {
    let node = this.tree
    for (const ch of word) {
      if (!node[ch]) {
        node[ch] = {}
      }
      node = node[ch]
    }
    // 这里把完整字符串存下来
    node.val = word
    node.isEnd = true
  }
}

function dfsSearch(
  board: string[][],
  row: number,
  col: number,
  visited: any,
  ans: string[],
  tree: any
) {
  const m = board.length
  const n = board[0].length
  // 边界
  if (row < 0 || row >= m || col < 0 || col >= n || visited[`${row}_${col}`]) return
  console.log('row', row, 'col', col)
  let cur = tree[board[row][col]]

  if (!cur) return // 如果没有直接绕过
  visited[`${row}_${col}`] = true
  if (cur.isEnd) {
    ans.push(cur.val)
    cur.isEnd = false
  }

  // 向上
  dfsSearch(board, row - 1, col, visited, ans, cur)
  // 向下
  dfsSearch(board, row + 1, col, visited, ans, cur)
  // 向右
  dfsSearch(board, row, col + 1, visited, ans, cur)
  // 向左
  dfsSearch(board, row, col - 1, visited, ans, cur)

  // 当前节点深度遍历结束之后将标识去掉，后面的节点还要访问它
  visited[`${row}_${col}`] = false
}

function findWords(board: string[][], words: string[]): string[] {
  // Think for yourself for 5 minutes...

  const tree = new Trie()
  for (const word of words) {
    tree.insert(word)
  }

  const m = board.length
  const n = board[0].length

  const ans: string[] = []
  const visited = {}
  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      dfsSearch(board, row, col, visited, ans, tree.tree)
    }
  }

  return ans
}
export default findWords
