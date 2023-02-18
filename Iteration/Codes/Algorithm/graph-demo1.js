/*
 * Description: 图
 * Created: 2023-02-18 20:21:42
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-18 22:08:20
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

const Dictionary = require('./dictionary-demo2')

class Graph {
  constructor(isDirected = false) {
    this.isDirected = isDirected
    this.vertices = []
    this.adjList = new Dictionary()
  }

  /**
   * 添加顶点
   * @param {*} v 顶点
   */
  addVertex(v) {
    if (!this.vertices.includes(v)) {
      this.vertices.push(v)
      this.adjList.set(v, [])
    }
  }
  /**
   * 添加边
   * @param {*} v
   * @param {*} w
   */
  addEdge(v, w) {
    if (!this.adjList.get(v)) {
      this.addVertex(v)
    }
    if (!this.adjList.get(w)) {
      this.addVertex(w)
    }

    this.adjList.get(v).push(w)
    if (!this.isDirected) {
      // 如果是无向图
      this.adjList.get(w).push(v)
    }
  }

  getVertices() {
    return this.vertices
  }

  getAdjList() {
    return this.adjList
  }

  toString() {
    let s = ''
    for (let i = 0; i < this.getVertices().length; i++) {
      s += `${this.vertices[i]}->`
      const neighbors = this.adjList.get(this.vertices[i])
      for (let j = 0; j < neighbors.length; j++) {
        s += `${neighbors[j]} `
      }
      s += `\n`
    }
    return s
  }
}

const gh = new Graph()

function Random(min, max) {
  return Math.round(Math.random() * (max - min)) + min
}

const strArray = Array.from({ length: 10 }, (v, k) =>
  String.fromCharCode(97 + k).toUpperCase()
)

strArray.forEach((str) => {
  gh.addVertex(str)
})

// Array.from({ length: 10 }, (v, k) => {
//   let a = strArray[Random(0, 9)]
//   let b = strArray[Random(0, 9)]
//   if (a != b) {
//     gh.addEdge(a, b) // 随机指向
//   }
// })

gh.addEdge('A', 'B')
gh.addEdge('A', 'C')
gh.addEdge('A', 'D')
gh.addEdge('C', 'D')
gh.addEdge('C', 'G')
gh.addEdge('D', 'G')
gh.addEdge('D', 'H')
gh.addEdge('B', 'E')
gh.addEdge('B', 'F')
gh.addEdge('E', 'I')

// console.dir(gh)
// console.log(gh.toString())

module.exports = gh
