/*
 * Description:
 * Created: 2023-02-22 20:11:02
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-22 22:45:35
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

import { minCoinChange, minCoinChange2 } from '../minCoinChange'

describe('动态规划凑零钱', () => {
  it('minCoinChange function', () => {
    let s = minCoinChange([1, 2, 5, 10, 20], 36)
    console.log('sssssss', s)
    expect(s).toEqual([1, 5, 10, 20])
  })

  it('minCoinChange2 funtion', () => {
    let s = minCoinChange2([1, 2, 5, 10, 20], 36)
    expect(s).toEqual(4)
  })
})
