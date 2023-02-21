/*
 * Description:
 * Created: 2023-02-21 17:04:45
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-21 17:59:04
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

import countingSort from '../countingSort'

describe('计数排序', () => {
  it('countingSort function', () => {
    expect(countingSort([3, 2, 1, 5, 6]))
    expect(countingSort([3, 2, 1, 5, 6])).toEqual([1, 2, 3, 5, 6])
    expect(countingSort([3, 2, 1])).toEqual([1, 2, 3])
    expect(countingSort([1, 3, 7, 9, 4, 5])).toEqual([1, 3, 4, 5, 7, 9])
  })
})
