import "dotenv/config";
import { Difficulty, UserRole } from "@prisma/client";
import prisma from "../lib/prisma";

const problems = [
  {
    title: "Two Sum",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    difficulty: Difficulty.EASY,
    tags: [{ name: "Array" }, { name: "Hash Table" }],
    constraints: "2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9",
    hints: "A really brute force way would be to search for all possible pairs of numbers but that would be slow. Try to use a hash map.",
    editorial: "Store elements in a hash map as we iterate. For each element, check if target - element exists in the map.",
    testCases: [
      { input: "[2,7,11,15]\n9", output: "[0,1]" },
      { input: "[3,2,4]\n6", output: "[1,2]" },
      { input: "[3,3]\n6", output: "[0,1]" }
    ],
    examples: {
      JAVASCRIPT: { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "nums[0] + nums[1] == 9, so we return [0, 1]." },
      PYTHON: { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "nums[0] + nums[1] == 9, so we return [0, 1]." },
      JAVA: { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "nums[0] + nums[1] == 9, so we return [0, 1]." }
    },
    codeSnippets: {
      JAVASCRIPT: "function twoSum(nums, target) {\n  \n}",
      PYTHON: "class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        pass",
      JAVA: "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        \n    }\n}"
    },
    referenceSolutions: {
      JAVASCRIPT: "function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) return [map.get(complement), i];\n    map.set(nums[i], i);\n  }\n}",
      PYTHON: "class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        prevMap = {}\n        for i, n in enumerate(nums):\n            diff = target - n\n            if diff in prevMap:\n                return [prevMap[diff], i]\n            prevMap[n] = i\n        return",
      JAVA: "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (map.containsKey(complement)) {\n                return new int[] { map.get(complement), i };\n            }\n            map.put(nums[i], i);\n        }\n        return new int[] {};\n    }\n}"
    }
  },
  {
    title: "Palindrome Number",
    description: "Given an integer x, return true if x is a palindrome, and false otherwise.",
    difficulty: Difficulty.EASY,
    tags: [{ name: "Math" }],
    constraints: "-2^31 <= x <= 2^31 - 1",
    hints: "Beware of overflow when you reverse the integer.",
    editorial: "Revert half of the number to avoid overflow issues.",
    testCases: [
      { input: "121", output: "true" },
      { input: "-121", output: "false" },
      { input: "10", output: "false" }
    ],
    examples: {
      JAVASCRIPT: { input: "x = 121", output: "true", explanation: "121 reads as 121 from left to right and from right to left." },
      PYTHON: { input: "x = 121", output: "true", explanation: "121 reads as 121 from left to right and from right to left." },
      JAVA: { input: "x = 121", output: "true", explanation: "121 reads as 121 from left to right and from right to left." }
    },
    codeSnippets: {
      JAVASCRIPT: "function isPalindrome(x) {\n  \n}",
      PYTHON: "class Solution:\n    def isPalindrome(self, x: int) -> bool:\n        pass",
      JAVA: "class Solution {\n    public boolean isPalindrome(int x) {\n        \n    }\n}"
    },
    referenceSolutions: {
      JAVASCRIPT: "function isPalindrome(x) {\n  if (x < 0) return false;\n  let rev = 0, temp = x;\n  while (temp > 0) {\n    rev = rev * 10 + temp % 10;\n    temp = Math.floor(temp / 10);\n  }\n  return rev === x;\n}",
      PYTHON: "class Solution:\n    def isPalindrome(self, x: int) -> bool:\n        if x < 0: return False\n        div = 1\n        while x >= 10 * div:\n            div *= 10\n        while x:\n            if x // div != x % 10: return False\n            x = (x % div) // 10\n            div = div / 100\n        return True",
      JAVA: "class Solution {\n    public boolean isPalindrome(int x) {\n        if (x < 0 || (x % 10 == 0 && x != 0)) {\n            return false;\n        }\n        int revertedNumber = 0;\n        while (x > revertedNumber) {\n            revertedNumber = revertedNumber * 10 + x % 10;\n            x /= 10;\n        }\n        return x == revertedNumber || x == revertedNumber / 10;\n    }\n}"
    }
  },
  {
    title: "Valid Parentheses",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    difficulty: Difficulty.EASY,
    tags: [{ name: "Stack" }, { name: "String" }],
    constraints: "1 <= s.length <= 10^4",
    hints: "Use a stack to keep track of opening brackets.",
    editorial: "Use a stack. Push opening brackets, pop when matching closing bracket is found.",
    testCases: [
      { input: "\"()\"", output: "true" },
      { input: "\"()[]{}\"", output: "true" },
      { input: "\"(]\"", output: "false" }
    ],
    examples: {
      JAVASCRIPT: { input: "s = \"()\"", output: "true", explanation: "" },
      PYTHON: { input: "s = \"()\"", output: "true", explanation: "" },
      JAVA: { input: "s = \"()\"", output: "true", explanation: "" }
    },
    codeSnippets: {
      JAVASCRIPT: "function isValid(s) {\n  \n}",
      PYTHON: "class Solution:\n    def isValid(self, s: str) -> bool:\n        pass",
      JAVA: "class Solution {\n    public boolean isValid(String s) {\n        \n    }\n}"
    },
    referenceSolutions: {
      JAVASCRIPT: "function isValid(s) {\n  const stack = [];\n  const map = { ')': '(', '}': '{', ']': '[' };\n  for (let char of s) {\n    if (char in map) {\n      if (stack.pop() !== map[char]) return false;\n    } else {\n      stack.push(char);\n    }\n  }\n  return stack.length === 0;\n}",
      PYTHON: "class Solution:\n    def isValid(self, s: str) -> bool:\n        stack = []\n        close_to_open = { \")\": \"(\", \"]\": \"[\", \"}\": \"{\" }\n        for c in s:\n            if c in close_to_open:\n                if stack and stack[-1] == close_to_open[c]:\n                    stack.pop()\n                else:\n                    return False\n            else:\n                stack.append(c)\n        return True if not stack else False",
      JAVA: "class Solution {\n    public boolean isValid(String s) {\n        Stack<Character> stack = new Stack<Character>();\n        for (char c : s.toCharArray()) {\n            if (c == '(')\n                stack.push(')');\n            else if (c == '{')\n                stack.push('}');\n            else if (c == '[')\n                stack.push(']');\n            else if (stack.isEmpty() || stack.pop() != c)\n                return false;\n        }\n        return stack.isEmpty();\n    }\n}"
    }
  },
  {
    title: "Merge Two Sorted Lists",
    description: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a one sorted list.",
    difficulty: Difficulty.EASY,
    tags: [{ name: "Linked List" }, { name: "Recursion" }],
    constraints: "Number of nodes in both lists is in the range [0, 50].",
    hints: "You can do this recursively or iteratively.",
    editorial: "Create a dummy node and iterate through both lists, appending the smaller value node to the result.",
    testCases: [
      { input: "[1,2,4]\n[1,3,4]", output: "[1,1,2,3,4,4]" },
      { input: "[]\n[]", output: "[]" },
      { input: "[]\n[0]", output: "[0]" }
    ],
    examples: {
      JAVASCRIPT: { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]", explanation: "" },
      PYTHON: { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]", explanation: "" },
      JAVA: { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]", explanation: "" }
    },
    codeSnippets: {
      JAVASCRIPT: "function mergeTwoLists(list1, list2) {\n  \n}",
      PYTHON: "class Solution:\n    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:\n        pass",
      JAVA: "class Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        \n    }\n}"
    },
    referenceSolutions: {
      JAVASCRIPT: "function mergeTwoLists(l1, l2) {\n  if (!l1) return l2;\n  if (!l2) return l1;\n  if (l1.val < l2.val) {\n    l1.next = mergeTwoLists(l1.next, l2);\n    return l1;\n  } else {\n    l2.next = mergeTwoLists(l1, l2.next);\n    return l2;\n  }\n}",
      PYTHON: "class Solution:\n    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:\n        dummy = ListNode()\n        tail = dummy\n        while list1 and list2:\n            if list1.val < list2.val:\n                tail.next = list1\n                list1 = list1.next\n            else:\n                tail.next = list2\n                list2 = list2.next\n            tail = tail.next\n        if list1:\n            tail.next = list1\n        elif list2:\n            tail.next = list2\n        return dummy.next",
      JAVA: "class Solution {\n    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {\n        if (l1 == null) return l2;\n        if (l2 == null) return l1;\n        if (l1.val < l2.val) {\n            l1.next = mergeTwoLists(l1.next, l2);\n            return l1;\n        } else {\n            l2.next = mergeTwoLists(l1, l2.next);\n            return l2;\n        }\n    }\n}"
    }
  },
  {
    title: "Best Time to Buy and Sell Stock",
    description: "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.",
    difficulty: Difficulty.EASY,
    tags: [{ name: "Array" }, { name: "Dynamic Programming" }],
    constraints: "1 <= prices.length <= 10^5",
    hints: "Track the minimum price so far and calculate max profit at each step.",
    editorial: "Iterate through the array, tracking the minimum price. For each price, subtract the minimum price to see if it beats the max profit.",
    testCases: [
      { input: "[7,1,5,3,6,4]", output: "5" },
      { input: "[7,6,4,3,1]", output: "0" }
    ],
    examples: {
      JAVASCRIPT: { input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5." },
      PYTHON: { input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5." },
      JAVA: { input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5." }
    },
    codeSnippets: {
      JAVASCRIPT: "function maxProfit(prices) {\n  \n}",
      PYTHON: "class Solution:\n    def maxProfit(self, prices: List[int]) -> int:\n        pass",
      JAVA: "class Solution {\n    public int maxProfit(int[] prices) {\n        \n    }\n}"
    },
    referenceSolutions: {
      JAVASCRIPT: "function maxProfit(prices) {\n  let minPrice = Infinity;\n  let maxPro = 0;\n  for (let p of prices) {\n    minPrice = Math.min(minPrice, p);\n    maxPro = Math.max(maxPro, p - minPrice);\n  }\n  return maxPro;\n}",
      PYTHON: "class Solution:\n    def maxProfit(self, prices: List[int]) -> int:\n        l, r = 0, 1\n        maxP = 0\n        while r < len(prices):\n            if prices[l] < prices[r]:\n                profit = prices[r] - prices[l]\n                maxP = max(maxP, profit)\n            else:\n                l = r\n            r += 1\n        return maxP",
      JAVA: "class Solution {\n    public int maxProfit(int[] prices) {\n        int minprice = Integer.MAX_VALUE;\n        int maxprofit = 0;\n        for (int i = 0; i < prices.length; i++) {\n            if (prices[i] < minprice)\n                minprice = prices[i];\n            else if (prices[i] - minprice > maxprofit)\n                maxprofit = prices[i] - minprice;\n        }\n        return maxprofit;\n    }\n}"
    }
  },
  {
    title: "Climbing Stairs",
    description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    difficulty: Difficulty.EASY,
    tags: [{ name: "Dynamic Programming" }, { name: "Math" }, { name: "Memoization" }],
    constraints: "1 <= n <= 45",
    hints: "To reach the nth step, you can either come from the (n-1)th step or the (n-2)th step.",
    editorial: "This is a classic dynamic programming problem. The number of ways to reach the nth step is the sum of the number of ways to reach the (n-1)th step and the (n-2)th step, forming a Fibonacci-like sequence.",
    testCases: [
      { input: "2", output: "2" },
      { input: "3", output: "3" },
      { input: "4", output: "5" }
    ],
    examples: {
      JAVASCRIPT: { input: "n = 2", output: "2", explanation: "1. 1 + 1\n2. 2" },
      PYTHON: { input: "n = 3", output: "3", explanation: "1. 1+1+1\n2. 1+2\n3. 2+1" },
      JAVA: { input: "n = 4", output: "5", explanation: "Five ways to climb." }
    },
    codeSnippets: {
      JAVASCRIPT: "function climbStairs(n) {\n  \n}",
      PYTHON: "class Solution:\n    def climbStairs(self, n: int) -> int:\n        pass",
      JAVA: "class Solution {\n    public int climbStairs(int n) {\n        \n    }\n}"
    },
    referenceSolutions: {
      JAVASCRIPT: "function climbStairs(n) {\n  if (n <= 2) return n;\n  let a = 1, b = 2;\n  for (let i = 3; i <= n; i++) {\n    let temp = a + b;\n    a = b;\n    b = temp;\n  }\n  return b;\n}",
      PYTHON: "class Solution:\n    def climbStairs(self, n: int) -> int:\n        one, two = 1, 1\n        for i in range(n - 1):\n            temp = one\n            one = one + two\n            two = temp\n        return one",
      JAVA: "class Solution {\n    public int climbStairs(int n) {\n        if (n == 1) return 1;\n        int first = 1;\n        int second = 2;\n        for (int i = 3; i <= n; i++) {\n            int third = first + second;\n            first = second;\n            second = third;\n        }\n        return second;\n    }\n}"
    }
  },
  {
    title: "Reverse Linked List",
    description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    difficulty: Difficulty.EASY,
    tags: [{ name: "Linked List" }, { name: "Recursion" }],
    constraints: "Number of nodes is in range [0, 5000].",
    hints: "Iterative or Recursive.",
    editorial: "Iterate through the list, changing the next pointer of each node to point to the previous node.",
    testCases: [
      { input: "[1,2,3,4,5]", output: "[5,4,3,2,1]" },
      { input: "[1,2]", output: "[2,1]" }
    ],
    examples: {
      JAVASCRIPT: { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]", explanation: "" },
      PYTHON: { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]", explanation: "" },
      JAVA: { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]", explanation: "" }
    },
    codeSnippets: {
      JAVASCRIPT: "function reverseList(head) {\n  \n}",
      PYTHON: "class Solution:\n    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        pass",
      JAVA: "class Solution {\n    public ListNode reverseList(ListNode head) {\n        \n    }\n}"
    },
    referenceSolutions: {
      JAVASCRIPT: "function reverseList(head) {\n  let prev = null, curr = head;\n  while (curr) {\n    let next = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = next;\n  }\n  return prev;\n}",
      PYTHON: "class Solution:\n    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        prev, curr = None, head\n        while curr:\n            nxt = curr.next\n            curr.next = prev\n            prev = curr\n            curr = nxt\n        return prev",
      JAVA: "class Solution {\n    public ListNode reverseList(ListNode head) {\n        ListNode prev = null;\n        ListNode curr = head;\n        while (curr != null) {\n            ListNode nextTemp = curr.next;\n            curr.next = prev;\n            prev = curr;\n            curr = nextTemp;\n        }\n        return prev;\n    }\n}"
    }
  },
  {
    title: "Maximum Subarray",
    description: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
    difficulty: Difficulty.MEDIUM,
    tags: [{ name: "Array" }, { name: "Divide and Conquer" }, { name: "Dynamic Programming" }],
    constraints: "1 <= nums.length <= 10^5",
    hints: "Kadane's Algorithm.",
    editorial: "Use Kadane's algorithm to solve in O(n) time.",
    testCases: [
      { input: "[-2,1,-3,4,-1,2,1,-5,4]", output: "6" },
      { input: "[1]", output: "1" },
      { input: "[5,4,-1,7,8]", output: "23" }
    ],
    examples: {
      JAVASCRIPT: { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." },
      PYTHON: { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." },
      JAVA: { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." }
    },
    codeSnippets: {
      JAVASCRIPT: "function maxSubArray(nums) {\n  \n}",
      PYTHON: "class Solution:\n    def maxSubArray(self, nums: List[int]) -> int:\n        pass",
      JAVA: "class Solution {\n    public int maxSubArray(int[] nums) {\n        \n    }\n}"
    },
    referenceSolutions: {
      JAVASCRIPT: "function maxSubArray(nums) {\n  let maxSoFar = nums[0], maxEndingHere = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);\n    maxSoFar = Math.max(maxSoFar, maxEndingHere);\n  }\n  return maxSoFar;\n}",
      PYTHON: "class Solution:\n    def maxSubArray(self, nums: List[int]) -> int:\n        maxSub = nums[0]\n        curSum = 0\n        for n in nums:\n            if curSum < 0:\n                curSum = 0\n            curSum += n\n            maxSub = max(maxSub, curSum)\n        return maxSub",
      JAVA: "class Solution {\n    public int maxSubArray(int[] nums) {\n        int n = nums.length;\n        int max = Integer.MIN_VALUE, sum = 0;\n        for (int i = 0; i < n; i++) {\n            sum += nums[i];\n            max = Math.max(sum, max);\n            if (sum < 0) sum = 0;\n        }\n        return max;\n    }\n}"
    }
  },
  {
    title: "Longest Substring Without Repeating Characters",
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    difficulty: Difficulty.MEDIUM,
    tags: [{ name: "Hash Table" }, { name: "String" }, { name: "Sliding Window" }],
    constraints: "0 <= s.length <= 5 * 10^4",
    hints: "Use a sliding window.",
    editorial: "Keep a sliding window [i, j), sliding j to the right. If we see a character again, slide i to the right.",
    testCases: [
      { input: "\"abcabcbb\"", output: "3" },
      { input: "\"bbbbb\"", output: "1" },
      { input: "\"pwwkew\"", output: "3" }
    ],
    examples: {
      JAVASCRIPT: { input: "s = \"abcabcbb\"", output: "3", explanation: "The answer is \"abc\", with the length of 3." },
      PYTHON: { input: "s = \"abcabcbb\"", output: "3", explanation: "The answer is \"abc\", with the length of 3." },
      JAVA: { input: "s = \"abcabcbb\"", output: "3", explanation: "The answer is \"abc\", with the length of 3." }
    },
    codeSnippets: {
      JAVASCRIPT: "function lengthOfLongestSubstring(s) {\n  \n}",
      PYTHON: "class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        pass",
      JAVA: "class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        \n    }\n}"
    },
    referenceSolutions: {
      JAVASCRIPT: "function lengthOfLongestSubstring(s) {\n  let map = new Map(), maxLen = 0, left = 0;\n  for (let right = 0; right < s.length; right++) {\n    if (map.has(s[right])) left = Math.max(left, map.get(s[right]) + 1);\n    map.set(s[right], right);\n    maxLen = Math.max(maxLen, right - left + 1);\n  }\n  return maxLen;\n}",
      PYTHON: "class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        charSet = set()\n        l = 0\n        res = 0\n        for r in range(len(s)):\n            while s[r] in charSet:\n                charSet.remove(s[l])\n                l += 1\n            charSet.add(s[r])\n            res = max(res, r - l + 1)\n        return res",
      JAVA: "class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        int n = s.length(), ans = 0;\n        Map<Character, Integer> map = new HashMap<>();\n        for (int j = 0, i = 0; j < n; j++) {\n            if (map.containsKey(s.charAt(j))) {\n                i = Math.max(map.get(s.charAt(j)), i);\n            }\n            ans = Math.max(ans, j - i + 1);\n            map.put(s.charAt(j), j + 1);\n        }\n        return ans;\n    }\n}"
    }
  },
  {
    title: "Container With Most Water",
    description: "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water.",
    difficulty: Difficulty.MEDIUM,
    tags: [{ name: "Array" }, { name: "Two Pointers" }, { name: "Greedy" }],
    constraints: "n == height.length\n2 <= n <= 10^5",
    hints: "Two pointers technique.",
    editorial: "Start with max width (first and last line), then move the pointer pointing to the shorter line inward.",
    testCases: [
      { input: "[1,8,6,2,5,4,8,3,7]", output: "49" },
      { input: "[1,1]", output: "1" }
    ],
    examples: {
      JAVASCRIPT: { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49", explanation: "" },
      PYTHON: { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49", explanation: "" },
      JAVA: { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49", explanation: "" }
    },
    codeSnippets: {
      JAVASCRIPT: "function maxArea(height) {\n  \n}",
      PYTHON: "class Solution:\n    def maxArea(self, height: List[int]) -> int:\n        pass",
      JAVA: "class Solution {\n    public int maxArea(int[] height) {\n        \n    }\n}"
    },
    referenceSolutions: {
      JAVASCRIPT: "function maxArea(height) {\n  let l = 0, r = height.length - 1, maxA = 0;\n  while (l < r) {\n    maxA = Math.max(maxA, Math.min(height[l], height[r]) * (r - l));\n    if (height[l] < height[r]) l++;\n    else r--;\n  }\n  return maxA;\n}",
      PYTHON: "class Solution:\n    def maxArea(self, height: List[int]) -> int:\n        l, r = 0, len(height) - 1\n        res = 0\n        while l < r:\n            res = max(res, min(height[l], height[r]) * (r - l))\n            if height[l] < height[r]:\n                l += 1\n            else:\n                r -= 1\n        return res",
      JAVA: "class Solution {\n    public int maxArea(int[] height) {\n        int l = 0, r = height.length - 1;\n        int max = 0;\n        while (l < r) {\n            max = Math.max(max, Math.min(height[l], height[r]) * (r - l));\n            if (height[l] < height[r])\n                l++;\n            else\n                r--;\n        }\n        return max;\n    }\n}"
    }
  },
  {
    title: "Trapping Rain Water",
    description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    difficulty: Difficulty.HARD,
    tags: [{ name: "Array" }, { name: "Two Pointers" }, { name: "Dynamic Programming" }, { name: "Stack" }],
    constraints: "n == height.length\n1 <= n <= 2 * 10^4",
    hints: "Using 2 pointers or a stack.",
    editorial: "For each element, we want to find the max level of water it can trap, which is min(max_left, max_right) - height.",
    testCases: [
      { input: "[0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" },
      { input: "[4,2,0,3,2,5]", output: "9" }
    ],
    examples: {
      JAVASCRIPT: { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6", explanation: "" },
      PYTHON: { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6", explanation: "" },
      JAVA: { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6", explanation: "" }
    },
    codeSnippets: {
      JAVASCRIPT: "function trap(height) {\n  \n}",
      PYTHON: "class Solution:\n    def trap(self, height: List[int]) -> int:\n        pass",
      JAVA: "class Solution {\n    public int trap(int[] height) {\n        \n    }\n}"
    },
    referenceSolutions: {
      JAVASCRIPT: "function trap(height) {\n  let l = 0, r = height.length-1, lMax = 0, rMax = 0, res = 0;\n  while (l < r) {\n    if (height[l] < height[r]) {\n      height[l] >= lMax ? (lMax = height[l]) : res += (lMax - height[l]);\n      l++;\n    } else {\n      height[r] >= rMax ? (rMax = height[r]) : res += (rMax - height[r]);\n      r--;\n    }\n  }\n  return res;\n}",
      PYTHON: "class Solution:\n    def trap(self, height: List[int]) -> int:\n        if not height: return 0\n        l, r = 0, len(height) - 1\n        leftMax, rightMax = height[l], height[r]\n        res = 0\n        while l < r:\n            if leftMax < rightMax:\n                l += 1\n                leftMax = max(leftMax, height[l])\n                res += leftMax - height[l]\n            else:\n                r -= 1\n                rightMax = max(rightMax, height[r])\n                res += rightMax - height[r]\n        return res",
      JAVA: "class Solution {\n    public int trap(int[] height) {\n        int left = 0, right = height.length - 1;\n        int ans = 0;\n        int left_max = 0, right_max = 0;\n        while (left < right) {\n            if (height[left] < height[right]) {\n                if (height[left] >= left_max) left_max = height[left];\n                else ans += (left_max - height[left]);\n                ++left;\n            } else {\n                if (height[right] >= right_max) right_max = height[right];\n                else ans += (right_max - height[right]);\n                --right;\n            }\n        }\n        return ans;\n    }\n}"
    }
  },
  {
    title: "Permutations",
    description: "Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.",
    difficulty: Difficulty.MEDIUM,
    tags: [{ name: "Backtracking" }, { name: "Array" }],
    constraints: "1 <= nums.length <= 6",
    hints: "Use backtracking.",
    editorial: "Backtrack, swapping elements to generate all permutations.",
    testCases: [
      { input: "[1,2,3]", output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]" },
      { input: "[0,1]", output: "[[0,1],[1,0]]" },
      { input: "[1]", output: "[[1]]" }
    ],
    examples: {
      JAVASCRIPT: { input: "nums = [1,2,3]", output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]", explanation: "" },
      PYTHON: { input: "nums = [1,2,3]", output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]", explanation: "" },
      JAVA: { input: "nums = [1,2,3]", output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]", explanation: "" }
    },
    codeSnippets: {
      JAVASCRIPT: "function permute(nums) {\n  \n}",
      PYTHON: "class Solution:\n    def permute(self, nums: List[int]) -> List[List[int]]:\n        pass",
      JAVA: "class Solution {\n    public List<List<Integer>> permute(int[] nums) {\n        \n    }\n}"
    },
    referenceSolutions: {
      JAVASCRIPT: "function permute(nums) {\n  const res = [];\n  const backtrack = (curr) => {\n    if (curr.length === nums.length) {\n      res.push([...curr]);\n      return;\n    }\n    for (let n of nums) {\n      if (!curr.includes(n)) {\n        curr.push(n);\n        backtrack(curr);\n        curr.pop();\n      }\n    }\n  };\n  backtrack([]);\n  return res;\n}",
      PYTHON: "class Solution:\n    def permute(self, nums: List[int]) -> List[List[int]]:\n        res = []\n        if len(nums) == 1:\n            return [nums[:]]\n        for i in range(len(nums)):\n            n = nums.pop(0)\n            perms = self.permute(nums)\n            for perm in perms:\n                perm.append(n)\n            res.extend(perms)\n            nums.append(n)\n        return res",
      JAVA: "class Solution {\n    public List<List<Integer>> permute(int[] nums) {\n       List<List<Integer>> list = new ArrayList<>();\n       backtrack(list, new ArrayList<>(), nums);\n       return list;\n    }\n    private void backtrack(List<List<Integer>> list, List<Integer> tempList, int [] nums){\n       if(tempList.size() == nums.length){\n          list.add(new ArrayList<>(tempList));\n       } else{\n          for(int i = 0; i < nums.length; i++){ \n             if(tempList.contains(nums[i])) continue; \n             tempList.add(nums[i]);\n             backtrack(list, tempList, nums);\n             tempList.remove(tempList.size() - 1);\n          }\n       }\n    }\n}"
    }
  },
  {
    title: "Number of Islands",
    description: "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.",
    difficulty: Difficulty.MEDIUM,
    tags: [{ name: "Array" }, { name: "DFS" }, { name: "BFS" }, { name: "Union Find" }],
    constraints: "m == grid.length\nn == grid[i].length",
    hints: "DFS or BFS to find connected components.",
    editorial: "Iterate through the grid. When a '1' is found, increment count and trigger DFS/BFS to mark all connected '1's as visited.",
    testCases: [
      { input: "[[\"1\",\"1\",\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"]]", output: "1" },
      { input: "[[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"1\"]]", output: "3" }
    ],
    examples: {
      JAVASCRIPT: { input: "grid = [[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"1\"]]", output: "3", explanation: "" },
      PYTHON: { input: "grid = [[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"1\"]]", output: "3", explanation: "" },
      JAVA: { input: "grid = [[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"1\"]]", output: "3", explanation: "" }
    },
    codeSnippets: {
      JAVASCRIPT: "function numIslands(grid) {\n  \n}",
      PYTHON: "class Solution:\n    def numIslands(self, grid: List[List[str]]) -> int:\n        pass",
      JAVA: "class Solution {\n    public int numIslands(char[][] grid) {\n        \n    }\n}"
    },
    referenceSolutions: {
      JAVASCRIPT: "function numIslands(grid) {\n  let count = 0;\n  for (let i = 0; i < grid.length; i++) {\n    for (let j = 0; j < grid[0].length; j++) {\n      if (grid[i][j] === '1') {\n        count++;\n        dfs(grid, i, j);\n      }\n    }\n  }\n  return count;\n}\nfunction dfs(grid, i, j) {\n  if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length || grid[i][j] === '0') return;\n  grid[i][j] = '0';\n  dfs(grid, i + 1, j); dfs(grid, i - 1, j); dfs(grid, i, j + 1); dfs(grid, i, j - 1);\n}",
      PYTHON: "class Solution:\n    def numIslands(self, grid: List[List[str]]) -> int:\n        if not grid: return 0\n        rows, cols = len(grid), len(grid[0])\n        visit = set()\n        islands = 0\n        def bfs(r, c):\n            q = collections.deque()\n            visit.add((r, c))\n            q.append((r, c))\n            while q:\n                row, col = q.popleft()\n                directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]\n                for dr, dc in directions:\n                    r, c = row + dr, col + dc\n                    if (r in range(rows) and c in range(cols) and grid[r][c] == \"1\" and (r, c) not in visit):\n                        q.append((r, c))\n                        visit.add((r, c))\n        for r in range(rows):\n            for c in range(cols):\n                if grid[r][c] == \"1\" and (r, c) not in visit:\n                    bfs(r, c)\n                    islands += 1\n        return islands",
      JAVA: "class Solution {\n    public int numIslands(char[][] grid) {\n        int count = 0;\n        for (int i = 0; i < grid.length; i++) \n            for (int j = 0; j < grid[0].length; j++) \n                if (grid[i][j] == '1') {\n                    dfs(grid, i, j);\n                    count++;\n                }\n        return count;\n    }\n    private void dfs(char[][] grid, int i, int j) {\n        if (i >= 0 && j >= 0 && i < grid.length && j < grid[0].length && grid[i][j] == '1') {\n            grid[i][j] = '0';\n            dfs(grid, i + 1, j);\n            dfs(grid, i - 1, j);\n            dfs(grid, i, j + 1);\n            dfs(grid, i, j - 1);\n        }\n    }\n}"
    }
  },
  {
    title: "Merge k Sorted Lists",
    description: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
    difficulty: Difficulty.HARD,
    tags: [{ name: "Linked List" }, { name: "Divide and Conquer" }, { name: "Heap" }],
    constraints: "k == lists.length\n0 <= k <= 10^4",
    hints: "Use a min-heap to keep track of the smallest element among the k lists.",
    editorial: "Put the head of each list into a min-priority queue. Repeatedly extract the minimum and add the next node from that list to the queue.",
    testCases: [
      { input: "[[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]" },
      { input: "[]", output: "[]" },
      { input: "[[]]", output: "[]" }
    ],
    examples: {
      JAVASCRIPT: { input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]", explanation: "" },
      PYTHON: { input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]", explanation: "" },
      JAVA: { input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]", explanation: "" }
    },
    codeSnippets: {
      JAVASCRIPT: "function mergeKLists(lists) {\n  \n}",
      PYTHON: "class Solution:\n    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:\n        pass",
      JAVA: "class Solution {\n    public ListNode mergeKLists(ListNode[] lists) {\n        \n    }\n}"
    },
    referenceSolutions: {
      JAVASCRIPT: "function mergeKLists(lists) {\n  if (lists.length === 0) return null;\n  while (lists.length > 1) {\n    let a = lists.shift();\n    let b = lists.shift();\n    const h = mergeTwoLists(a, b);\n    lists.push(h);\n  }\n  return lists[0];\n}\nfunction mergeTwoLists(l1, l2) {\n  if (!l1) return l2;\n  if (!l2) return l1;\n  if (l1.val < l2.val) { l1.next = mergeTwoLists(l1.next, l2); return l1; }\n  else { l2.next = mergeTwoLists(l1, l2.next); return l2; }\n}",
      PYTHON: "class Solution:\n    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:\n        if not lists or len(lists) == 0: return None\n        while len(lists) > 1:\n            mergedList = []\n            for i in range(0, len(lists), 2):\n                l1 = lists[i]\n                l2 = lists[i + 1] if (i + 1) < len(lists) else None\n                mergedList.append(self.mergeList(l1, l2))\n            lists = mergedList\n        return lists[0]\n    def mergeList(self, l1, l2):\n        dummy = ListNode()\n        tail = dummy\n        while l1 and l2:\n            if l1.val < l2.val:\n                tail.next = l1\n                l1 = l1.next\n            else:\n                tail.next = l2\n                l2 = l2.next\n            tail = tail.next\n        if l1: tail.next = l1\n        if l2: tail.next = l2\n        return dummy.next",
      JAVA: "class Solution {\n    public ListNode mergeKLists(ListNode[] lists) {\n        if (lists==null||lists.length==0) return null;\n        PriorityQueue<ListNode> queue= new PriorityQueue<ListNode>(lists.length, (a,b)-> a.val-b.val);\n        ListNode dummy = new ListNode(0);\n        ListNode tail=dummy;\n        for (ListNode node:lists)\n            if (node!=null)\n                queue.add(node);\n        while (!queue.isEmpty()){\n            tail.next=queue.poll();\n            tail=tail.next;\n            if (tail.next!=null)\n                queue.add(tail.next);\n        }\n        return dummy.next;\n    }\n}"
    }
  },
  {
    title: "Median of Two Sorted Arrays",
    description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
    difficulty: Difficulty.HARD,
    tags: [{ name: "Array" }, { name: "Binary Search" }, { name: "Divide and Conquer" }],
    constraints: "0 <= m, n <= 1000",
    hints: "The overall run time complexity should be O(log (m+n)).",
    editorial: "Perform binary search on the partitions of the two arrays.",
    testCases: [
      { input: "[1,3]\n[2]", output: "2.00000" },
      { input: "[1,2]\n[3,4]", output: "2.50000" }
    ],
    examples: {
      JAVASCRIPT: { input: "nums1 = [1,3], nums2 = [2]", output: "2.00000", explanation: "" },
      PYTHON: { input: "nums1 = [1,3], nums2 = [2]", output: "2.00000", explanation: "" },
      JAVA: { input: "nums1 = [1,3], nums2 = [2]", output: "2.00000", explanation: "" }
    },
    codeSnippets: {
      JAVASCRIPT: "function findMedianSortedArrays(nums1, nums2) {\n  \n}",
      PYTHON: "class Solution:\n    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:\n        pass",
      JAVA: "class Solution {\n    public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n        \n    }\n}"
    },
    referenceSolutions: {
      JAVASCRIPT: "function findMedianSortedArrays(nums1, nums2) {\n  const merged = [...nums1, ...nums2].sort((a,b) => a-b);\n  const mid = Math.floor(merged.length / 2);\n  if (merged.length % 2 === 0) return (merged[mid-1] + merged[mid]) / 2;\n  return merged[mid];\n}",
      PYTHON: "class Solution:\n    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:\n        A, B = nums1, nums2\n        total = len(nums1) + len(nums2)\n        half = total // 2\n        if len(B) < len(A):\n            A, B = B, A\n        l, r = 0, len(A) - 1\n        while True:\n            i = (l + r) // 2\n            j = half - i - 2\n            Aleft = A[i] if i >= 0 else float(\"-infinity\")\n            Aright = A[i + 1] if (i + 1) < len(A) else float(\"infinity\")\n            Bleft = B[j] if j >= 0 else float(\"-infinity\")\n            Bright = B[j + 1] if (j + 1) < len(B) else float(\"infinity\")\n            if Aleft <= Bright and Bleft <= Aright:\n                if total % 2:\n                    return min(Aright, Bright)\n                return (max(Aleft, Bleft) + min(Aright, Bright)) / 2\n            elif Aleft > Bright:\n                r = i - 1\n            else:\n                l = i + 1",
      JAVA: "class Solution {\n    public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n        int index1 = 0;\n        int index2 = 0;\n        int med1 = 0;\n        int med2 = 0;\n        for (int i=0; i<=(nums1.length+nums2.length)/2; i++) {\n            med1 = med2;\n            if (index1 == nums1.length) {\n                med2 = nums2[index2];\n                index2++;\n            } else if (index2 == nums2.length) {\n                med2 = nums1[index1];\n                index1++;\n            } else if (nums1[index1] < nums2[index2] ) {\n                med2 = nums1[index1];\n                index1++;\n            }  else {\n                med2 = nums2[index2];\n                index2++;\n            }\n        }\n        if ((nums1.length+nums2.length)%2 == 0) {\n            return (float)(med1+med2)/2;\n        }\n        return med2;\n    }\n}"
    }
  },
  {
    title: "Min Stack",
    description: "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.",
    difficulty: Difficulty.MEDIUM,
    tags: [{ name: "Stack" }, { name: "Design" }],
    constraints: "-2^31 <= val <= 2^31 - 1",
    hints: "Use two stacks.",
    editorial: "Maintain a second stack that keeps track of the minimum value at each level.",
    testCases: [
      { input: "[\"MinStack\",\"push\",\"push\",\"push\",\"getMin\",\"pop\",\"top\",\"getMin\"]\n[[],[-2],[0],[-3],[],[],[],[]]", output: "[null,null,null,null,-3,null,0,-2]" }
    ],
    examples: {
      JAVASCRIPT: { input: "MinStack, push, ...", output: "...", explanation: "" },
      PYTHON: { input: "MinStack, push, ...", output: "...", explanation: "" },
      JAVA: { input: "MinStack, push, ...", output: "...", explanation: "" }
    },
    codeSnippets: {
      JAVASCRIPT: "class MinStack {\n  constructor() {}\n  push(val) {}\n  pop() {}\n  top() {}\n  getMin() {}\n}",
      PYTHON: "class MinStack:\n    def __init__(self):\n        pass\n    def push(self, val: int) -> None:\n        pass\n    def pop(self) -> None:\n        pass\n    def top(self) -> int:\n        pass\n    def getMin(self) -> int:\n        pass",
      JAVA: "class MinStack {\n    public MinStack() {}\n    public void push(int val) {}\n    public void pop() {}\n    public int top() {}\n    public int getMin() {}\n}"
    },
    referenceSolutions: {
      JAVASCRIPT: "class MinStack {\n  constructor() {\n    this.stack = [];\n  }\n  push(val) {\n    this.stack.push({ val, min: this.stack.length === 0 ? val : Math.min(val, this.getMin()) });\n  }\n  pop() {\n    this.stack.pop();\n  }\n  top() {\n    return this.stack[this.stack.length - 1].val;\n  }\n  getMin() {\n    return this.stack[this.stack.length - 1].min;\n  }\n}",
      PYTHON: "class MinStack:\n    def __init__(self):\n        self.stack = []\n        self.minStack = []\n    def push(self, val: int) -> None:\n        self.stack.append(val)\n        val = min(val, self.minStack[-1] if self.minStack else val)\n        self.minStack.append(val)\n    def pop(self) -> None:\n        self.stack.pop()\n        self.minStack.pop()\n    def top(self) -> int:\n        return self.stack[-1]\n    def getMin(self) -> int:\n        return self.minStack[-1]",
      JAVA: "class MinStack {\n    private Node head;\n    public void push(int x) {\n        if (head == null) \n            head = new Node(x, x, null);\n        else \n            head = new Node(x, Math.min(x, head.min), head);\n    }\n    public void pop() {\n        head = head.next;\n    }\n    public int top() {\n        return head.val;\n    }\n    public int getMin() {\n        return head.min;\n    }\n    private class Node {\n        int val;\n        int min;\n        Node next;\n        private Node(int val, int min, Node next) {\n            this.val = val;\n            this.min = min;\n            this.next = next;\n        }\n    }\n}"
    }
  },
  {
    title: "Generate Parentheses",
    description: "Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.",
    difficulty: Difficulty.MEDIUM,
    tags: [{ name: "String" }, { name: "Dynamic Programming" }, { name: "Backtracking" }],
    constraints: "1 <= n <= 8",
    hints: "Backtracking.",
    editorial: "Keep track of open and close brackets count. Add open if open < n. Add close if close < open.",
    testCases: [
      { input: "3", output: "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]" },
      { input: "1", output: "[\"()\"]" }
    ],
    examples: {
      JAVASCRIPT: { input: "n = 3", output: "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]", explanation: "" },
      PYTHON: { input: "n = 3", output: "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]", explanation: "" },
      JAVA: { input: "n = 3", output: "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]", explanation: "" }
    },
    codeSnippets: {
      JAVASCRIPT: "function generateParenthesis(n) {\n  \n}",
      PYTHON: "class Solution:\n    def generateParenthesis(self, n: int) -> List[str]:\n        pass",
      JAVA: "class Solution {\n    public List<String> generateParenthesis(int n) {\n        \n    }\n}"
    },
    referenceSolutions: {
      JAVASCRIPT: "function generateParenthesis(n) {\n  const res = [];\n  const backtrack = (s, open, close) => {\n    if (s.length === 2 * n) {\n      res.push(s);\n      return;\n    }\n    if (open < n) backtrack(s + '(', open + 1, close);\n    if (close < open) backtrack(s + ')', open, close + 1);\n  };\n  backtrack('', 0, 0);\n  return res;\n}",
      PYTHON: "class Solution:\n    def generateParenthesis(self, n: int) -> List[str]:\n        stack = []\n        res = []\n        def backtrack(openN, closedN):\n            if openN == closedN == n:\n                res.append(\"\".join(stack))\n                return\n            if openN < n:\n                stack.append(\"(\")\n                backtrack(openN + 1, closedN)\n                stack.pop()\n            if closedN < openN:\n                stack.append(\")\")\n                backtrack(openN, closedN + 1)\n                stack.pop()\n        backtrack(0, 0)\n        return res",
      JAVA: "class Solution {\n    public List<String> generateParenthesis(int n) {\n        List<String> list = new ArrayList<String>();\n        backtrack(list, \"\", 0, 0, n);\n        return list;\n    }\n    public void backtrack(List<String> list, String str, int open, int close, int max){\n        if(str.length() == max*2){\n            list.add(str);\n            return;\n        }\n        if(open < max)\n            backtrack(list, str+\"(\", open+1, close, max);\n        if(close < open)\n            backtrack(list, str+\")\", open, close+1, max);\n    }\n}"
    }
  },
];

async function main() {
  console.log('Seeding...');
  
  // Upsert a default user to assign problems to
  const user = await prisma.user.upsert({
    where: { email: 'admin@solvex.com' },
    update: {},
    create: {
      email: 'admin@solvex.com',
      clerkId: 'user_seed_admin_123',
      role: UserRole.ADMIN,
      firstName: 'Admin',
      lastName: 'User',
      imageUrl: 'https://github.com/shadcn.png',
    },
  });

  console.log(`User ensured: ${user.id}`);

  // Create problems
  for (const problem of problems) {
    const existing = await prisma.problem.findFirst({
        where: { title: problem.title }
    });

    if (!existing) {
        // Map keys to schema expectation
        await prisma.problem.create({
            data: {
                title: problem.title,
                description: problem.description,
                difficulty: problem.difficulty,
                // Flatten tags object to string array if schema is String[]
                tags: problem.tags.map(t => t.name),
                userId: user.id,
                constraints: problem.constraints,
                hints: problem.hints,
                editorial: problem.editorial,
                examples: problem.examples,
                testCases: problem.testCases,
                codeSnippets: problem.codeSnippets,
                referenceSolution: problem.referenceSolutions,
            }
        });
        console.log(`Created problem: ${problem.title}`);
    } else {
        console.log(`Skipped existing problem: ${problem.title}`);
    }
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
