/*
 * Description: 长度最小的子数组
 * Created: 2023-02-26 16:42:10
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-26 17:18:08
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

import { minSubArrayLen, minSubArrayLen2 } from '../minSubArrayLen'

describe('minSubArrayLen测试', () => {
  it('minSubArrayLen function', () => {
    expect(minSubArrayLen(7, [4, 3, 1, 2, 3, 3])).toEqual(2)

    // return
    expect(minSubArrayLen(7, [2, 3, 1, 2, 4, 3])).toEqual(2)

    expect(minSubArrayLen(4, [1, 4, 4])).toEqual(1)
    expect(minSubArrayLen(11, [1, 1, 1, 1, 1, 1, 1, 1])).toEqual(0)
  })

  it('minSubArrayLen2 function', () => {
    expect(minSubArrayLen2(7, [4, 3, 1, 2, 3, 3])).toEqual(2)

    // return
    expect(minSubArrayLen2(7, [2, 3, 1, 2, 4, 3])).toEqual(2)

    expect(minSubArrayLen2(4, [1, 4, 4])).toEqual(1)
    expect(minSubArrayLen2(11, [1, 1, 1, 1, 1, 1, 1, 1])).toEqual(0)
  })
})
