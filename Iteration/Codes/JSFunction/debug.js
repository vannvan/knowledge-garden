/*
 * Description:
 * Created: 2023-03-08 10:50:37
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-08 10:50:49
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

var count = 0
function printIndent(n) {
  for (var i = 0; i < n; i++) {
    console.log('   ')
  }
}

function dp(ring, i, key, j) {
  // printIndent(count++);
  // console.log("i = " + i + ", j = " + j);

  if (j === key.length) {
    // printIndent(count--);
    // console.log("return 0");
    return 0
  }

  var res = Number.MAX_SAFE_INTEGER
  for (var k of charToIndex[key[j]]) {
    res = Math.min(res, dp(ring, j, key, i + 1))
  }

  // printIndent(count--);
  // console.log("return " + res);
  return res
}
