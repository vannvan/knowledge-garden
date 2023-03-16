/*
 * Description:
 * Created: 2023-02-23 23:05:40
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-16 11:28:30
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

import { knapSack, weightBagProblem } from '../knapSack'

describe('背包问题', () => {
  it('knapSack function', () => {
    expect(knapSack([2, 3, 4, 5], [3, 4, 5, 6], 15, 3)).toEqual(12)
  })

  it('weightBagProblem function', () => {
    expect(weightBagProblem([1, 3, 4, 5], [15, 20, 30, 55], 6)).toEqual(70)
  })
})
