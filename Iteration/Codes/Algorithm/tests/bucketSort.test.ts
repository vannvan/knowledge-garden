/*
 * Description: 桶排序
 * Created: 2023-02-21 18:07:01
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-21 18:12:11
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

import bucketSort from '../bucketSort'

describe('桶排序', () => {
  it('bucketSort function', () => {
    expect(bucketSort([3, 2, 7, 8, 1])).toEqual([1, 2, 3, 7, 8])
    expect(bucketSort([2, 3, 1])).toEqual([1, 2, 3])
    expect(bucketSort([11, 8, 1, 6, 5, 4])).toEqual([1, 4, 5, 6, 8, 11])
  })
})
