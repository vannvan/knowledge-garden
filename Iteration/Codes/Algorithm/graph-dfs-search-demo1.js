/*
 * Description: 图的遍历，深度遍历
 * Created: 2023-02-18 23:00:42
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-18 23:15:14
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

const graph = require('./graph-demo1')

const Queue = require('./queue-demo1')

const Stack = require('./stack-demo1')

const Colors = {
  WHITE: 0, // 未访问
  GRAY: 1, // 访问但未探索
  BLACK: 2, // 已访问且已探索
}

// 给图初始化标记颜色
const initColor = (vertices) => {
  const color = {}
  for (let i = 0; i < vertices.length; i++) {
    color[vertices[i]] = Colors.WHITE
  }
  return color
}

const depthFirstSearch = (graph, callback) => {
  const vertices = graph.getVertices()
  const adjList = graph.getAdjList()
  const color = initColor(vertices)

  const depthFirstSearchVisit = (u, color, adjList, callback) => {
    if (!u) return
    // 既然将要开始访问了，标记为已探索
    color[u] = Colors.GRAY
    if (callback) {
      callback(u)
    }

    const neighbors = adjList.get(u)
    for (let i = 0; i < neighbors.length; i++) {
      const w = neighbors[i]
      if (color[w] === Colors.WHITE) {
        // 对没访问的继续探索
        depthFirstSearchVisit(w, color, adjList, callback)
      }
    }
    color[u] = Colors.BLACK
  }

  for (let i = 0; i < vertices.length; i++) {
    if (color[vertices[i]] === Colors.WHITE) {
      depthFirstSearchVisit(vertices[i], color, adjList, callback)
    }
  }
}

depthFirstSearch(graph, (v) => {
  console.log('visited', v)
})
