/*
 * Description: 贪心算法硬币找零
 * Created: 2023-02-25 20:47:41
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-25 20:52:32
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

import minCoinChange2 from '../minCoinChange2'

describe('minCoinChange2测试', () => {
  it('minCoinChange2 function', () => {
    const s = minCoinChange2([1, 2, 5, 10, 20], 36)
    console.log('s', s)
    expect(s).toEqual([20, 10, 5, 1])
  })
})
