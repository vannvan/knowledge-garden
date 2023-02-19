/*
 * Description: Prim 最小生成树
 * Created: 2023-02-19 20:24:59
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-19 21:12:16
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

const INF = Number.MAX_SAFE_INTEGER

const graph = [
  [0, 2, 4, 0, 0, 0],
  [2, 0, 2, 4, 2, 0],
  [4, 2, 0, 0, 3, 0],
  [0, 4, 0, 0, 3, 2],
  [0, 2, 3, 3, 0, 2],
  [0, 0, 0, 2, 2, 0],
]

const minDistance = (graph, key, visited) => {
  let min = INF
  let minIndex = 0
  for (let v = 0; v < graph.length; v++) {
    if (visited[v] === false && key[v] < min) {
      min = key[v]
      minIndex = v
    }
  }
  return minIndex
}

const prim = (graph) => {
  const parent = []
  const key = []
  const visited = []
  const { length } = graph
  for (let i = 0; i < length; i++) {
    key[i] = INF
    visited[i] = false
  }
  key[0] = 0
  parent[0] = -1 // 该顶点没有父节点
  // 对于  n个顶点的图，最需选择 n-1 条路径，即可构成最小生成树
  for (let i = 0; i < length - 1; i++) {
    const u = minDistance(graph, key, visited) //从未处理的顶点集合中选出key值最小的顶点
    visited[u] = true
    for (let v = 0; v < length; v++) {
      // graph[u][v] 表示图的一条路径
      if (graph[u][v] && !visited[v] && graph[u][v] < key[v]) {
        // 更新 parent 数组记录的各个顶点父节点的信息
        parent[v] = u
        // 更新 key 数组
        key[v] = graph[u][v]
      }
    }
  }

  return parent
}

const parent = prim(graph)
console.log('parent', parent)

console.log('Edge   Weight')
// parent 数组下标值表示各个顶点，各个下标对应的值为该顶点的父节点,因此从1开始
for (let i = 1; i < graph.length; i++) {
  console.log(parent[i] + ' - ' + i + '   ' + graph[i][parent[i]])
}
