const merge = function (nums1, m, nums2, n) {
  // 初始化两个指针的指向，初始化 nums1 尾部索引k
  let i = m - 1,
    j = n - 1,
    k = m + n - 1

  // i=2 j=2 k=5
  // 当两个数组都没遍历完时，指针同步移动
  while (i >= 0 && j >= 0) {
    // 取较大的值，从末尾往前填补
    if (nums1[i] >= nums2[j]) {
      nums1[k] = nums1[i]
      i--
      k--
    } else {
      nums1[k] = nums2[j]
      j--
      k--
    }
    console.log('nums1', nums1)
  }

  // nums2 留下的情况，特殊处理一下
  while (j >= 0) {
    nums1[k] = nums2[j]
    k--
    j--
  }
}

const nums1 = [1, 2, 3, 0, 0, 0]
const m = 3
const nums2 = [2, 5, 6]
const n = 3
merge(nums1, m, nums2, n)

console.log('nums1', nums1)
// 第一轮 nums1[2]=3 nums2[2]=6 走else nums1[5]=nums2[2]   nums1 = [1,2,3,0,0,6]  j--

// 第二轮 nums1[2]=3 nums2[1]=5 走else nums1[4]=nums2[1]  nums1 = [1,2,3,0,5,6]  j--

// 第二轮 nums1[2]=3 nums2[0]=2 走if  nums1[3]=nums1[2]  nums1 = [1,2,3,3,5,6]  i--

// 第四轮 nums1[1]=2 nums2[0]=2 走if nums1[2]=nums1[1]  nums1 = [1,2,2,3,5,6] i--

// 第五轮 num1[0]=2 nums2[0]=2 走else nums1[1]=nums2[0] nums1 = [1,2,2,3,5,6] j--

// 第六轮  两个都不走
