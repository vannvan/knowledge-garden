/*
 * Description:
 * Created: 2023-02-20 23:19:33
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-20 23:40:34
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

import { twoSum } from '../two-sum-demo1'

describe('两数之和', () => {
  it('twoSum function', () => {
    expect(twoSum([1, 2, 6, 4], 8)).toEqual(expect.arrayContaining([2, 1]))
  })

  it('twoSumBetter function', () => {
    expect(twoSum([1, 2, 6, 4], 8)).toEqual(expect.arrayContaining([2, 1]))
  })
})
