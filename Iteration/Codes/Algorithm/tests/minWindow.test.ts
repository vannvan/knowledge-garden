/*
 * undefined: 最小覆盖字符串
 * Created: 2023-02-26 18:01:40
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-26 19:04:23
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

import minWindow from '../minWindow'

describe('最小覆盖字符串测试', () => {
  it('minWindow function', () => {
    minWindow('ADOBECODEBANC', 'ABC')
    // return
    expect(minWindow('ADOBECODEBANC', 'ABC')).toEqual('BANC')
    expect(minWindow('a', 'aa')).toEqual('')
    expect(minWindow('a', 'a')).toEqual('a')
  })
})
