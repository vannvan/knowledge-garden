/*
 * Description:  迷宫老鼠
 * 1 是可以走的点，0是被阻挡的点
 * [
 *  [1,0,0,0],
 *  [1,1,1,1],
 *  [0,0,1,0],
 *  [0,1,1,1]
 * ]
 * Created: 2023-02-25 21:01:44
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-25 21:17:56
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

const isSafe = (maze: number[][], x: number, y: number) => {
  const n = maze.length
  // 边界 x>0 && y>0 && x<n && y<n
  if (x >= 0 && y >= 0 && x < n && y < n && maze[x][y] !== 0) {
    return true
  }
  return false
}

const findWay = (maze: number[][], x: number, y: number, solution: number[][]) => {
  const n = maze.length
  // 到达终点了
  if (x === n - 1 && y === n - 1) {
    solution[x][y] = 1
    return true
  }

  if (isSafe(maze, x, y) === true) {
    solution[x][y] = 1

    // 向右移动
    if (findWay(maze, x + 1, y, solution) === true) {
      return true
    }

    // 向下移动
    if (findWay(maze, x, y + 1, solution) === true) {
      return true
    }

    solution[x][y] = 0
    return false
  }
  return false
}

const ratInAMaze = (maze: number[][]) => {
  // 先初始化解决方案
  const solution: number[][] = []
  for (let i = 0; i < maze.length; i++) {
    solution[i] = []
    for (let j = 0; j < maze.length; j++) {
      solution[i][j] = 0
    }
  }
  if (findWay(maze, 0, 0, solution) === true) {
    return solution
  }

  return 'empty'
}

export default ratInAMaze
