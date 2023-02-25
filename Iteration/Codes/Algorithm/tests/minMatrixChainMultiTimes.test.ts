/*
 * Description: 最小矩阵链计算次数
 * Created: 2023-02-25 13:48:44
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-25 14:26:27
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

import minMatrixChainMultiTimes from '../minMatrixChainMultiTimes'

describe('minMatrixChainMultiTimes测试', () => {
  it('minMatrixChainMultiTimes function', () => {
    const s = minMatrixChainMultiTimes([10, 100, 20, 50, 1])
    console.log('s', s)
    // expect(s).toEqual(4000)
    // expect(minMatrixChainMultiTimes([10, 100, 20, 50, 1]))
  })
})
