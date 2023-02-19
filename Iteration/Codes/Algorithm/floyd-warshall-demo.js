/*
 * Description: floyd-warshall 算法 动态规划
 * Created: 2023-02-19 14:53:27
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-19 18:38:28
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

const floydWarshall = (graph) => {
  const dist = []
  const { length } = graph
  // 初始化邻接矩阵
  for (let i = 0; i < length; i++) {
    dist[i] = []
    for (let j = 0; j < length; j++) {
      if (i === j) {
        dist[i][j] = 0
      } else if (graph[i][j] == 0) {
        dist[i][j] = Infinity
      } else {
        dist[i][j] = graph[i][j]
      }
    }
  }

  // i 是起点 j是终点 k是中转点，因为思路是一行一行往下走，因此k需要根据行数游走变更
  // 因为一开始初始化的dist[i][j]就认为其是最短路径
  // 因此if条件比较的是 从起点到这个假设的中转点+假设的中转点到终点 和 已存储的最短路径的大小
  // 下标对应 (i->k)+(k->j) 和 (i->j),如果前者更小那就更新
  for (let k = 0; k < length; k++) {
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          console.log(
            'update->',
            '下标i->k',
            `${i}-${k}-路径距离${dist[i][k]}`,
            'k->j',
            `${k}-${j}-路径距离${dist[k][j]}`,
            'i->j',
            `${i}-${j}-路径距离${dist[i][j]}`
          )
          dist[i][j] = dist[i][k] + dist[k][j]
        }
      }
    }
  }

  return dist
}

const s = floydWarshall(graph)
console.log('dist', s)
