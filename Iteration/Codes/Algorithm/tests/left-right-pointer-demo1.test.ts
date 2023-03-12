/*
 * Description: 双指针
 * Created: 2023-02-20 19:06:46
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-12 14:10:14
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import {
  find,
  left_bound_find,
  left_bound_find_2,
  left_bound_find_3,
  right_bound_find,
  right_bound_find_2,
} from '../left-right-pointer-demo1'

describe('二分查找', () => {
  it('find function', () => {
    expect(find([1, 2, 3, 34, 4, 5], 33)).toEqual(-1)
    expect(find([1, 2, 3, 34, 4, 5], 4)).toEqual(4)
    expect(find([1, 2, 3, 34, 4, 5], 2)).toEqual(1)
    expect(find([1, 2], 2)).toEqual(1)
  })

  it('left_bound_find function', () => {
    expect(left_bound_find([1, 2, 5, 4, 2], 2)).toEqual(1)
    expect(left_bound_find([1, 2, 3, 4, 5, 34], 4)).toEqual(3)
    expect(left_bound_find([-1, 0, 3, 5, 9, 12], 9)).toEqual(4)
  })

  it('right_bound_find function', () => {
    expect(right_bound_find([1, 2, 4, 5], 4)).toEqual(2)
    expect(right_bound_find([1, 2, 3, 6, 7, 9], 3)).toEqual(2)
  })

  // it('left_bound_find_2', () => {
  //   expect(left_bound_find_2([1, 2, 4, 5], 4)).toEqual(2)
  //   expect(left_bound_find_2([2, 3, 5, 7], 8)).toEqual(-1)
  // })

  it('left_bound_find_3 function', () => {
    expect(left_bound_find_3([1, 2, 4, 5, 6], 5)).toEqual(3)
  })

  it('right_bound_find_2 function', () => {
    expect(right_bound_find_2([1, 3, 4, 5, 6], 5)).toEqual(3)
  })
})
