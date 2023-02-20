var search = function (nums, target) {
  let left = 0
  let right = nums.length - 1
  while (left <= right) {
    let mid = Math.floor(left + (right - left) / 2)
    if (nums[mid] == target) {
      left = mid + 1 //只有这里需要改
    } else if (nums[mid] > target) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  // 这里改为检查 right 越界的情况
  if (right < 0 || nums[right] != target) return -1
  return right
}

console.log(search([1, 2, 5, 4, 2], 4))
