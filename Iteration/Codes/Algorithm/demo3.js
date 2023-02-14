/**
 * 时间复杂度
 */

function traverse(arr) {
  var len = arr.length // 1次
  // i=0 1次  i<len n+1次 i++ n次  for循环n次
  for (var i = 0; i < len; i++) {
    console.log(arr[i]) // n次
  }
}

// 因此 1+1+n+1+n+n = 3n+1 次

function traverse(arr) {
  var outLen = arr.length // 1次
  // i=0 1次  i<outlen n+1 次 i++ n次
  for (var i = 0; i < outLen; i++) {
    var inLen = arr[i].length // 1次
    // j=0 n次  j<inlen n*(n+1)次 j++ n*n 次
    for (var j = 0; j < inLen; j++) {
      console.log(arr[i][j]) // n*n次
    }
  }
}

// 因此 1+n+1+n+n+n*(n+1)+n*n+n*n = 3n^2+5n+3 次

// 规模为 n 的一维数组遍历时，最内层的循环会执行 n 次，其对应的时间复杂度是 O(n)；规模为 n*n 的二维数组遍历时，最内层的循环会执行 n*n 次，其对应的时间复杂度是 O(n^2)。
