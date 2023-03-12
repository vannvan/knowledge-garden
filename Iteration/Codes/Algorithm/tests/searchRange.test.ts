/*
 * Description:
 * Created: 2023-02-26 14:13:30
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-12 14:20:04
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

import SearchRange from '../searchRange'

describe('searchRange测试', () => {
  it('searchRange function', () => {
    const sr = new SearchRange([5, 7, 7, 8, 8, 10], 8)
    const sr1 = new SearchRange([5, 7, 7, 8, 8, 10], 6)
    const sr2 = new SearchRange([5, 7, 7, 8, 8, 10], 12)
    const sr3 = new SearchRange([5, 7, 7, 8, 8, 10], 2)

    expect(sr.getRange()).toEqual([3, 4])
    expect(sr1.getRange()).toEqual([-1, -1])
    expect(sr2.getRange()).toEqual([-1, -1])
    expect(sr3.getRange()).toEqual([-1, -1])
  })
})
