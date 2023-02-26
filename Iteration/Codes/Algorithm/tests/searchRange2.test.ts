/*
 * Description:
 * Created: 2023-02-26 14:49:07
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-26 16:22:18
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

import searchRange2 from '../searchRange2'

describe('searchRange2测试', () => {
  it('searchRange2 function', () => {
    const sr = new searchRange2([5, 7, 7, 8, 8, 10], 8)
    const sr1 = new searchRange2([5, 7, 7, 8, 8, 10], 6)
    const sr2 = new searchRange2([5, 7, 7, 8, 8, 10], 12)
    const sr3 = new searchRange2([5, 7, 7, 8, 8, 10], 2)

    sr.getRange()
    // return

    expect(sr.getRange()).toEqual([3, 4])
    expect(sr1.getRange()).toEqual([-1, -1])
    expect(sr2.getRange()).toEqual([-1, -1])
    expect(sr3.getRange()).toEqual([-1, -1])
  })
})
