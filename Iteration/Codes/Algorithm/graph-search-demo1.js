/*
 * Description: 图的遍历
 * Created: 2023-02-18 21:07:56
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-18 22:40:34
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

const BreadthFirstSearch = (graph, startVertex, callback) => {
  const vertices = graph.getVertices()
  const adjList = graph.getAdjList()
  const color = initColor(vertices)
  const queue = new Queue()

  queue.enQueue(startVertex)
  while (!queue.isEmpty()) {
    const u = queue.deQueue() // 要开始访问了，先出队
    const neighbors = adjList.get(u)
    // console.log('neighbors', neighbors)
    color[u] = Colors.GRAY // 标记被访问了一次
    // 依次去把它的邻居访问一下
    for (let i = 0; i < neighbors.length; i++) {
      const w = neighbors[i]
      if (color[w] === Colors.WHITE) {
        color[w] = Colors.GRAY
        queue.enQueue(w) // 入队
      }
    }
    color[u] = Colors.BLACK //  标记已被探索
    if (callback) {
      callback(u)
    }
  }
}

// BreadthFirstSearch(graph, 'A', (v) => {
//   console.log('已访问:', v)
// })

/**
 * 最短路径
 * @param {*} graph
 * @param {*} startVertex
 */
const BFS = (graph, startVertex) => {
  const vertices = graph.getVertices()
  const adjList = graph.getAdjList()
  const color = initColor(vertices)
  const predecessors = {} // 前溯节点
  const distances = {} // 距离
  const queue = new Queue()
  queue.enQueue(startVertex)

  // 初始化每个元素的距离和前溯姐弟安
  for (let i = 0; i < vertices.length; i++) {
    distances[vertices[i]] = 0
    predecessors[vertices[i]] = null
  }
  // u 是起始节点，w是遍历其邻居的下一个，下下一个...
  while (!queue.isEmpty()) {
    const u = queue.deQueue() // 要开始访问了，先出队
    const neighbors = adjList.get(u)
    color[u] = Colors.GRAY // 标记被访问了一次
    // 依次去把它的邻居访问一下
    for (let i = 0; i < neighbors.length; i++) {
      const w = neighbors[i]
      if (color[w] === Colors.WHITE) {
        color[w] = Colors.GRAY
        distances[w] = distances[u] + 1 // 后一项是前一项+1
        predecessors[w] = u // 前溯节点
        queue.enQueue(w) // 入队
      }
    }
    color[u] = Colors.BLACK //  标记已被探索
  }
  return {
    distances,
    predecessors,
  }
}

const { distances, predecessors } = BFS(graph, 'A')

// console.log('distances', distances)
// console.log('predecessors', predecessors)

// 由以上的每个节点到起始点的距离和前溯节点计算最短距离

const fromVertex = 'A' // 起始点
const vertices = graph.getVertices()

for (let i = 1; i < vertices.length; i++) {
  // 要到达的节点
  const toVertex = vertices[i]
  const path = new Stack()
  for (let v = toVertex; v !== fromVertex; v = predecessors[v]) {
    path.push(v)
    if (!v) {
      break
    }
  }
  path.push(fromVertex)
  let s = !path.isEmpty() ? path.pop() : ''
  while (!path.isEmpty()) {
    s += ' - ' + path.pop()
  }
  console.log(s)
}
