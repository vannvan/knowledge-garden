/*
 * Description:
 * Created: 2023-02-20 23:19:33
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-27 22:06:33
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

import { twoSum, twoSumBetter } from '../two-sum-demo1'

describe('两数之和', () => {
  it('twoSum function', () => {
    expect(twoSum([1, 2, 6, 4], 8)).toEqual(expect.arrayContaining([2, 1]))
  })

  it('twoSumBetter function', () => {
    twoSumBetter([2, 7, 11, 15], 9)
    // return
    expect(twoSumBetter([2, 7, 11, 15], 9)).toEqual(expect.arrayContaining([0, 1]))
    expect(twoSumBetter([1, 2, 6, 4], 8)).toEqual(expect.arrayContaining([2, 1]))
  })
})
