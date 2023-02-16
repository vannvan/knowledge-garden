/*
 * Description: 记忆法 斐波那契
 * Created: 2023-02-16 21:47:25
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-16 22:01:52
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

const fibonacciMemo = (n) => {
  const memo = [0, 1]
  const fibonacci = (n) => {
    if (memo[n] != null) {
      return memo[n]
    }
    return (memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo))
  }
  return fibonacci(n)
}

console.log('s', fibonacciMemo(6))
