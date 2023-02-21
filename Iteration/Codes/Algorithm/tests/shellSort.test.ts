/*
 * Description: 希尔排序
 * Created: 2023-02-21 22:28:25
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-21 23:44:00
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

import shellSort from '../shellSort'
import { genNumbers } from './utils'

describe('希尔排序', () => {
  it('shellSort function', () => {
    const { sourceNumbers, ascSortNumbers } = genNumbers(10)
    const { sourceNumbers: sourceNumbers1, ascSortNumbers: ascSortNumbers1 } = genNumbers(9)

    // console.log('sourceNumbers', sourceNumbers)
    // console.log('sourceNumbers1', sourceNumbers1)

    shellSort(sourceNumbers)
    // return

    // 偶数
    expect(shellSort(sourceNumbers)).toEqual(ascSortNumbers)

    // 奇数
    expect(shellSort(sourceNumbers1)).toEqual(ascSortNumbers1)
  })
})
