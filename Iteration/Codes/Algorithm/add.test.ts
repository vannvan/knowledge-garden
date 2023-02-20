/*
 * Description:
 * Created: 2023-02-19 22:39:00
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-19 23:02:26
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
// import add from './add'

function add(a: number, b: number): number {
  return a + b
}

describe('add function', () => {
  it('1 + 1 = 2', () => {
    expect(add(1, 1)).toEqual(2)
  })
})
