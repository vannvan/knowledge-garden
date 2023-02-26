/*
 * Description:
 * Created: 2023-02-26 13:40:29
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-26 13:47:34
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

import { removeElement, removeElement2 } from '../removeElement'

describe('removeElement测试', () => {
  it('removeElement function', () => {
    expect(removeElement([2, 3, 4, 9, 6], 4)).toEqual(4)
  })

  it('removeElement2 function', () => {
    expect(removeElement2([2, 3, 4, 9, 6], 4)).toEqual(4)
  })
})
