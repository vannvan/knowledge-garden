/*
 * Description: 排序算法 测试
 * Created: 2023-04-15 12:37:44
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-15 13:10:02
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

import { bubbleSort, insertSort, mergeSort, selectSort, quickSort } from '../sort'

describe('排序算法 测试', () => {
  it('sort function', () => {
    const nums = [5, 9, 3, 1, 2, 8, 4, 6, 7]
    const target = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    expect(bubbleSort(nums)).toEqual(target)

    expect(selectSort(nums)).toEqual(target)

    expect(insertSort(nums)).toEqual(target)

    expect(mergeSort(nums)).toEqual(target)

    expect(quickSort(nums)).toEqual(target)
  })
})
