/*
 * Description:
 * Created: 2023-02-20 19:06:46
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-20 20:09:07
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import { find, left_bound_find, right_bound_find } from '../left-right-pointer-demo1'

describe('二分查找', () => {
  it('find function', () => {
    expect(find([1, 2, 3, 34, 4, 5], 33)).toEqual(-1)
    expect(find([1, 2, 3, 34, 4, 5], 4)).toEqual(4)
    expect(find([1, 2], 2)).toEqual(1)
  })

  it('left_bound_find function', () => {
    expect(left_bound_find([1, 2, 5, 4, 2], 4)).toEqual(3)
    expect(left_bound_find([1, 2, 5, 4], 4)).toEqual(3)
  })

  it('right_bound_find function', () => {
    expect(right_bound_find([1, 2, 5, 4], 4)).toEqual(3)
    expect(right_bound_find([1, 2, 5, 4, 5], 4)).toEqual(3)
  })
})
