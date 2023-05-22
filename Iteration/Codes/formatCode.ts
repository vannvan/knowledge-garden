function strStr(haystack: string, needle: string): number {
  const getNext = (str: string) => {
    const next: number[] = []
    let j = 0
    next[0] = 0
    for (let i = 1; i < str.length; i++) {
      while (j > 0 && str[i] !== str[j]) {
        j = next[j - 1]
      }

      if (str[i] === str[j]) {
        j++
      }

      next[i] = j
    }
    return next
  }

  if (needle.length === 0) return -1

  const next = getNext(needle)

  console.log(next)

  let j = 0
  for (let i = 0; i < haystack.length; i++) {
    while (j > 0 && haystack[i] !== needle[j]) {
      j = next[j - 1]
    }

    if (haystack[i] === needle[j]) {
      j++
    }

    if (j === needle.length) {
      return i - j + 1
    }
  }

  return -1
}
