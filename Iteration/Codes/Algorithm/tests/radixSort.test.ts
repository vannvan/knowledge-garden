/*
 * Description: 基数排序
 * Created: 2023-02-21 21:22:30
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-21 22:19:31
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

import radixSort from '../radixSort'

describe('基数排序', () => {
  it('radixSort function', () => {
    expect(radixSort([672, 1, 101, 302, 444, 989, 782]))
    // return
    expect(radixSort([672, 1, 101, 302, 444, 989, 782])).toEqual([1, 101, 302, 444, 672, 782, 989])
    expect(radixSort([110, 367, 3982, 2189, 121, 232, 4343, 765, 767])).toEqual([
      110, 121, 232, 367, 765, 767, 2189, 3982, 4343,
    ])
  })
})
