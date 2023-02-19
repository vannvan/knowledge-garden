/*
 * Description: Dijkstra 算法 贪心算法
 * Created: 2023-02-19 14:16:26
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-19 14:49:32
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

const graph = [
  [0, 2, 4, 0, 0, 0],
  [0, 0, 1, 4, 2, 0],
  [0, 0, 0, 0, 3, 0],
  [0, 0, 0, 0, 0, 2],
  [0, 0, 0, 3, 0, 2],
  [0, 0, 0, 0, 0, 0],
]

const INF = Number.MAX_SAFE_INTEGER

const minDistance = (dist, visited) => {
  let min = INF
  let minIndex = -1
  for (let v = 0; v < dist.length; v++) {
    if (visited[v] === false && dist[v] < min) {
      min = dist[v]
      minIndex = v
    }
  }
  return minIndex
}

const dijkstra = (graph, src) => {
  const dist = []
  const visited = []
  const graphLen = graph.length
  for (let i = 0; i < graphLen; i++) {
    dist[i] = INF
    visited[i] = false
  }
  // 源点到自己的距离初始化为0
  dist[src] = 0
  for (let i = 0; i < graphLen - 1; i++) {
    const u = minDistance(dist, visited)
    // 更新访问标记
    visited[u] = true
    // console.log('u', u)
    for (let v = 0; v < graphLen; v++) {
      // 如果没有访问 且 存在更小的距离
      if (
        !visited[v] && //   未访问过
        dist[u] != INF && //
        graph[u][v] != 0 && // 0没意义
        dist[u] + graph[u][v] < dist[v] // 有更小的
      ) {
        console.log('v', v)
        dist[v] = dist[u] + graph[u][v]
      }
    }
  }

  return dist
}

const s = dijkstra(graph, 0)
console.log('最短路径', s)
