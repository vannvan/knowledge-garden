/*
 * Description:
 * Created: 2023-02-18 16:28:55
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-18 16:32:03
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0,
}
function defaultCompare(a, b) {
  if (a === b) {
    return Compare.EQUALS
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN
}

console.log('ab', defaultCompare(2, 1), defaultCompare(2, 1) == Compare.BIGGER_THAN)
