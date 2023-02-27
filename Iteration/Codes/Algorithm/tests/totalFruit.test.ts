/*
 * Description: 果篮问题
 * Created: 2023-02-26 17:27:42
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-27 21:14:16
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

import totalFruit from '../totalFruit'

describe('果篮问题 测试', () => {
  it('totalFruit function', () => {
    expect(totalFruit([1, 2, 1])).toEqual(3)
    expect(totalFruit([0, 1, 2, 2])).toEqual(3)
    expect(totalFruit([1, 2, 3, 2, 2])).toEqual(4)
  })
})
