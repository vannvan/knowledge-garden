/*
 * Description: 存在重复元素 测试
 * Created: 2023-02-28 21:34:47
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-28 21:35:54
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

import containsNearbyDuplicate from '../containsNearbyDuplicate'

describe('存在重复元素 测试', () => {
  it('containsNearbyDuplicate function', () => {
    expect(containsNearbyDuplicate([1, 2, 3, 1], 3)).toEqual(true)
    expect(containsNearbyDuplicate([1, 0, 1, 1], 1)).toEqual(true)
    expect(containsNearbyDuplicate([1, 2, 3, 1, 2, 3], 2)).toEqual(false)
  })
})
