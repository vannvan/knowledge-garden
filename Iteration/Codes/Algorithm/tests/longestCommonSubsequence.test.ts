/*
 * Description:
 * Created: 2023-02-24 19:11:47
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-24 19:48:05
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

import { longestCommonSubsequence, longestCommonSubsequencePlan } from '../longestCommonSubsequence'

describe('longestCommonSubsequence测试', () => {
  it('longestCommonSubsequence function', () => {
    const s = longestCommonSubsequence('abedcf', 'daecfa')
    console.log('s', s)
    expect(s).toEqual(4)
  })

  it('longestCommonSubsequencePlan function', () => {
    const s = longestCommonSubsequencePlan('abedcf', 'daecfa')
    console.log('s', s)
    expect(s).toEqual('aecf')
  })
})
