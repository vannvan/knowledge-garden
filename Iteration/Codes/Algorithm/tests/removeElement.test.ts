/*
 * Description:
 * Created: 2023-02-26 13:40:29
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-26 13:52:43
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

import { removeElement, removeElement2, removeElement3 } from '../removeElement'

describe('removeElement测试', () => {
  it('removeElement function', () => {
    expect(removeElement([2, 3, 4, 9, 6], 4)).toEqual(4)
  })

  it('removeElement2 function', () => {
    expect(removeElement2([2, 3, 4, 9, 6], 2)).toEqual(4)
    expect(removeElement2([2, 3, 4, 9, 6], 3)).toEqual(4)
    expect(removeElement2([2, 3, 4, 9, 6], 6)).toEqual(4)
  })

  it('removeElement3 function', () => {
    expect(removeElement3([2, 3, 4, 9, 6], 2)).toEqual(4)
    expect(removeElement3([2, 3, 4, 9, 6], 3)).toEqual(4)
    expect(removeElement3([2, 3, 4, 9, 6], 6)).toEqual(4)
  })
})
