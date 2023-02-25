/*
 * Description:
 * Created: 2023-02-25 21:01:44
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-25 21:18:22
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

import ratInAMaze from '../ratInAMaze'

describe('ratInAMaze测试', () => {
  it('ratInAMaze function', () => {
    const matrix = [
      [1, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 1, 0],
      [0, 1, 1, 1],
    ]
    const s = ratInAMaze(matrix)
    console.log('s', s)
    const result = [
      [1, 0, 0, 0],
      [1, 1, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 1],
    ]
    expect(ratInAMaze(matrix)).toEqual(result)
  })
})
