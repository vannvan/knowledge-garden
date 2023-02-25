/*
 * Description:
 * Created: 2023-02-25 15:36:48
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-25 16:19:00
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

import lengthOfLIS from '../lengthOfLIS'

describe('最长子序列测试', () => {
  it('lengthOfLIS function', () => {
    const s = lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])
    expect(s).toEqual(4)
  })
})
