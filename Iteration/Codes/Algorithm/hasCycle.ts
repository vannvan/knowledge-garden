/*
 * Description: 是否有环
 * Created: 2023-02-21 09:24:24
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-21 18:05:57
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

const hasCycle = (head) => {
  let slow = head
  let fast = head
  while (fast != null && fast.next != null) {
    slow = fast.next
    fast = fast.next.next
    if (slow == fast) {
      return true
    }
  }
  return false
}
