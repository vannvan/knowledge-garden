/*
 * Description:
 * Created: 2023-02-21 09:53:18
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-21 15:12:35
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

import mergeSort from '../mergeSort2'

describe('归并排序', () => {
  it('mergeSort function', () => {
    expect(mergeSort([3, 2, 1])).toEqual([1, 2, 3])
    expect(mergeSort([2, 3, 6, 5, 1, 7])).toEqual([1, 2, 3, 5, 6, 7])
    expect(mergeSort([2, 3, 6, 5, 1])).toEqual([1, 2, 3, 5, 6])
  })
})
