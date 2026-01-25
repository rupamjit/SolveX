import "dotenv/config";
import prisma from "../lib/prisma";

// Template generators for different problem types
const problemUpdates: Record<string, { codeSnippets: any; referenceSolution: any }> = {
  "Two Sum": {
    codeSnippets: {
      JAVASCRIPT: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  // Write your code here
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let lines = [];
rl.on('line', (line) => {
  lines.push(line.trim());
  if (lines.length === 2) {
    const nums = JSON.parse(lines[0]);
    const target = parseInt(lines[1]);
    const result = twoSum(nums, target);
    console.log(JSON.stringify(result));
    rl.close();
  }
});`,
      PYTHON: `from typing import List

class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Write your code here
        pass

if __name__ == "__main__":
    import sys
    import json
    lines = sys.stdin.read().strip().split('\\n')
    nums = json.loads(lines[0])
    target = int(lines[1])
    sol = Solution()
    result = sol.twoSum(nums, target)
    print(json.dumps(result))`,
      JAVA: `import java.util.*;

public class Main {
    public int[] twoSum(int[] nums, int target) {
        // Write your code here
        return new int[]{};
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String numsStr = sc.nextLine().trim();
        int target = Integer.parseInt(sc.nextLine().trim());
        
        // Parse array
        numsStr = numsStr.substring(1, numsStr.length() - 1);
        String[] parts = numsStr.split(",");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            nums[i] = Integer.parseInt(parts[i].trim());
        }
        
        Main sol = new Main();
        int[] result = sol.twoSum(nums, target);
        System.out.println("[" + result[0] + "," + result[1] + "]");
        sc.close();
    }
}`
    },
    referenceSolution: {
      JAVASCRIPT: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let lines = [];
rl.on('line', (line) => {
  lines.push(line.trim());
  if (lines.length === 2) {
    const nums = JSON.parse(lines[0]);
    const target = parseInt(lines[1]);
    const result = twoSum(nums, target);
    console.log(JSON.stringify(result));
    rl.close();
  }
});`,
      PYTHON: `from typing import List
import json

class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        prevMap = {}
        for i, n in enumerate(nums):
            diff = target - n
            if diff in prevMap:
                return [prevMap[diff], i]
            prevMap[n] = i
        return []

if __name__ == "__main__":
    import sys
    lines = sys.stdin.read().strip().split('\\n')
    nums = json.loads(lines[0])
    target = int(lines[1])
    sol = Solution()
    result = sol.twoSum(nums, target)
    print(json.dumps(result))`,
      JAVA: `import java.util.*;

public class Main {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[] {};
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String numsStr = sc.nextLine().trim();
        int target = Integer.parseInt(sc.nextLine().trim());
        
        numsStr = numsStr.substring(1, numsStr.length() - 1);
        String[] parts = numsStr.split(",");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            nums[i] = Integer.parseInt(parts[i].trim());
        }
        
        Main sol = new Main();
        int[] result = sol.twoSum(nums, target);
        System.out.println("[" + result[0] + "," + result[1] + "]");
        sc.close();
    }
}`
    }
  },
  "Palindrome Number": {
    codeSnippets: {
      JAVASCRIPT: `/**
 * @param {number} x
 * @return {boolean}
 */
function isPalindrome(x) {
  // Write your code here
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  const x = parseInt(line.trim());
  const result = isPalindrome(x);
  console.log(result ? "true" : "false");
  rl.close();
});`,
      PYTHON: `class Solution:
    def isPalindrome(self, x: int) -> bool:
        # Write your code here
        pass

if __name__ == "__main__":
    import sys
    x = int(sys.stdin.readline().strip())
    sol = Solution()
    result = sol.isPalindrome(x)
    print(str(result).lower())`,
      JAVA: `import java.util.Scanner;

public class Main {
    public boolean isPalindrome(int x) {
        // Write your code here
        return false;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int x = Integer.parseInt(sc.nextLine().trim());
        Main sol = new Main();
        System.out.println(sol.isPalindrome(x) ? "true" : "false");
        sc.close();
    }
}`
    },
    referenceSolution: {
      JAVASCRIPT: `function isPalindrome(x) {
  if (x < 0) return false;
  let rev = 0, temp = x;
  while (temp > 0) {
    rev = rev * 10 + temp % 10;
    temp = Math.floor(temp / 10);
  }
  return rev === x;
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  const x = parseInt(line.trim());
  const result = isPalindrome(x);
  console.log(result ? "true" : "false");
  rl.close();
});`,
      PYTHON: `class Solution:
    def isPalindrome(self, x: int) -> bool:
        if x < 0:
            return False
        rev = 0
        temp = x
        while temp > 0:
            rev = rev * 10 + temp % 10
            temp = temp // 10
        return rev == x

if __name__ == "__main__":
    import sys
    x = int(sys.stdin.readline().strip())
    sol = Solution()
    result = sol.isPalindrome(x)
    print(str(result).lower())`,
      JAVA: `import java.util.Scanner;

public class Main {
    public boolean isPalindrome(int x) {
        if (x < 0 || (x % 10 == 0 && x != 0)) return false;
        int revertedNumber = 0;
        while (x > revertedNumber) {
            revertedNumber = revertedNumber * 10 + x % 10;
            x /= 10;
        }
        return x == revertedNumber || x == revertedNumber / 10;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int x = Integer.parseInt(sc.nextLine().trim());
        Main sol = new Main();
        System.out.println(sol.isPalindrome(x) ? "true" : "false");
        sc.close();
    }
}`
    }
  },
  "Valid Parentheses": {
    codeSnippets: {
      JAVASCRIPT: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
  // Write your code here
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  // Remove quotes if present
  let s = line.trim();
  if (s.startsWith('"') && s.endsWith('"')) {
    s = s.slice(1, -1);
  }
  const result = isValid(s);
  console.log(result ? "true" : "false");
  rl.close();
});`,
      PYTHON: `class Solution:
    def isValid(self, s: str) -> bool:
        # Write your code here
        pass

if __name__ == "__main__":
    import sys
    s = sys.stdin.readline().strip()
    if s.startswith('"') and s.endswith('"'):
        s = s[1:-1]
    sol = Solution()
    result = sol.isValid(s)
    print(str(result).lower())`,
      JAVA: `import java.util.*;

public class Main {
    public boolean isValid(String s) {
        // Write your code here
        return false;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine().trim();
        if (s.startsWith("\\"") && s.endsWith("\\"")) {
            s = s.substring(1, s.length() - 1);
        }
        Main sol = new Main();
        System.out.println(sol.isValid(s) ? "true" : "false");
        sc.close();
    }
}`
    },
    referenceSolution: {
      JAVASCRIPT: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (let char of s) {
    if (char in map) {
      if (stack.pop() !== map[char]) return false;
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  let s = line.trim();
  if (s.startsWith('"') && s.endsWith('"')) {
    s = s.slice(1, -1);
  }
  const result = isValid(s);
  console.log(result ? "true" : "false");
  rl.close();
});`,
      PYTHON: `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        close_to_open = { ")": "(", "]": "[", "}": "{" }
        for c in s:
            if c in close_to_open:
                if stack and stack[-1] == close_to_open[c]:
                    stack.pop()
                else:
                    return False
            else:
                stack.append(c)
        return len(stack) == 0

if __name__ == "__main__":
    import sys
    s = sys.stdin.readline().strip()
    if s.startswith('"') and s.endswith('"'):
        s = s[1:-1]
    sol = Solution()
    result = sol.isValid(s)
    print(str(result).lower())`,
      JAVA: `import java.util.*;

public class Main {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine().trim();
        if (s.startsWith("\\"") && s.endsWith("\\"")) {
            s = s.substring(1, s.length() - 1);
        }
        Main sol = new Main();
        System.out.println(sol.isValid(s) ? "true" : "false");
        sc.close();
    }
}`
    }
  },
  "Best Time to Buy and Sell Stock": {
    codeSnippets: {
      JAVASCRIPT: `/**
 * @param {number[]} prices
 * @return {number}
 */
function maxProfit(prices) {
  // Write your code here
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  const prices = JSON.parse(line.trim());
  const result = maxProfit(prices);
  console.log(result);
  rl.close();
});`,
      PYTHON: `from typing import List

class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        # Write your code here
        pass

if __name__ == "__main__":
    import sys
    import json
    prices = json.loads(sys.stdin.readline().strip())
    sol = Solution()
    result = sol.maxProfit(prices)
    print(result)`,
      JAVA: `import java.util.*;

public class Main {
    public int maxProfit(int[] prices) {
        // Write your code here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String line = sc.nextLine().trim();
        line = line.substring(1, line.length() - 1);
        String[] parts = line.split(",");
        int[] prices = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            prices[i] = Integer.parseInt(parts[i].trim());
        }
        Main sol = new Main();
        System.out.println(sol.maxProfit(prices));
        sc.close();
    }
}`
    },
    referenceSolution: {
      JAVASCRIPT: `function maxProfit(prices) {
  let minPrice = Infinity;
  let maxPro = 0;
  for (let p of prices) {
    minPrice = Math.min(minPrice, p);
    maxPro = Math.max(maxPro, p - minPrice);
  }
  return maxPro;
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  const prices = JSON.parse(line.trim());
  const result = maxProfit(prices);
  console.log(result);
  rl.close();
});`,
      PYTHON: `from typing import List
import json

class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        l, r = 0, 1
        maxP = 0
        while r < len(prices):
            if prices[l] < prices[r]:
                profit = prices[r] - prices[l]
                maxP = max(maxP, profit)
            else:
                l = r
            r += 1
        return maxP

if __name__ == "__main__":
    import sys
    prices = json.loads(sys.stdin.readline().strip())
    sol = Solution()
    result = sol.maxProfit(prices)
    print(result)`,
      JAVA: `import java.util.*;

public class Main {
    public int maxProfit(int[] prices) {
        int minprice = Integer.MAX_VALUE;
        int maxprofit = 0;
        for (int i = 0; i < prices.length; i++) {
            if (prices[i] < minprice)
                minprice = prices[i];
            else if (prices[i] - minprice > maxprofit)
                maxprofit = prices[i] - minprice;
        }
        return maxprofit;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String line = sc.nextLine().trim();
        line = line.substring(1, line.length() - 1);
        String[] parts = line.split(",");
        int[] prices = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            prices[i] = Integer.parseInt(parts[i].trim());
        }
        Main sol = new Main();
        System.out.println(sol.maxProfit(prices));
        sc.close();
    }
}`
    }
  },
  "Maximum Subarray": {
    codeSnippets: {
      JAVASCRIPT: `/**
 * @param {number[]} nums
 * @return {number}
 */
function maxSubArray(nums) {
  // Write your code here
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  const nums = JSON.parse(line.trim());
  const result = maxSubArray(nums);
  console.log(result);
  rl.close();
});`,
      PYTHON: `from typing import List

class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        # Write your code here
        pass

if __name__ == "__main__":
    import sys
    import json
    nums = json.loads(sys.stdin.readline().strip())
    sol = Solution()
    result = sol.maxSubArray(nums)
    print(result)`,
      JAVA: `import java.util.*;

public class Main {
    public int maxSubArray(int[] nums) {
        // Write your code here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String line = sc.nextLine().trim();
        line = line.substring(1, line.length() - 1);
        String[] parts = line.split(",");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            nums[i] = Integer.parseInt(parts[i].trim());
        }
        Main sol = new Main();
        System.out.println(sol.maxSubArray(nums));
        sc.close();
    }
}`
    },
    referenceSolution: {
      JAVASCRIPT: `function maxSubArray(nums) {
  let maxSoFar = nums[0], maxEndingHere = nums[0];
  for (let i = 1; i < nums.length; i++) {
    maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }
  return maxSoFar;
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  const nums = JSON.parse(line.trim());
  const result = maxSubArray(nums);
  console.log(result);
  rl.close();
});`,
      PYTHON: `from typing import List
import json

class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        maxSub = nums[0]
        curSum = 0
        for n in nums:
            if curSum < 0:
                curSum = 0
            curSum += n
            maxSub = max(maxSub, curSum)
        return maxSub

if __name__ == "__main__":
    import sys
    nums = json.loads(sys.stdin.readline().strip())
    sol = Solution()
    result = sol.maxSubArray(nums)
    print(result)`,
      JAVA: `import java.util.*;

public class Main {
    public int maxSubArray(int[] nums) {
        int n = nums.length;
        int max = Integer.MIN_VALUE, sum = 0;
        for (int i = 0; i < n; i++) {
            sum += nums[i];
            max = Math.max(sum, max);
            if (sum < 0) sum = 0;
        }
        return max;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String line = sc.nextLine().trim();
        line = line.substring(1, line.length() - 1);
        String[] parts = line.split(",");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            nums[i] = Integer.parseInt(parts[i].trim());
        }
        Main sol = new Main();
        System.out.println(sol.maxSubArray(nums));
        sc.close();
    }
}`
    }
  },
  "Longest Substring Without Repeating Characters": {
    codeSnippets: {
      JAVASCRIPT: `/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
  // Write your code here
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  let s = line.trim();
  if (s.startsWith('"') && s.endsWith('"')) {
    s = s.slice(1, -1);
  }
  const result = lengthOfLongestSubstring(s);
  console.log(result);
  rl.close();
});`,
      PYTHON: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        # Write your code here
        pass

if __name__ == "__main__":
    import sys
    s = sys.stdin.readline().strip()
    if s.startswith('"') and s.endswith('"'):
        s = s[1:-1]
    sol = Solution()
    result = sol.lengthOfLongestSubstring(s)
    print(result)`,
      JAVA: `import java.util.*;

public class Main {
    public int lengthOfLongestSubstring(String s) {
        // Write your code here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine().trim();
        if (s.startsWith("\\"") && s.endsWith("\\"")) {
            s = s.substring(1, s.length() - 1);
        }
        Main sol = new Main();
        System.out.println(sol.lengthOfLongestSubstring(s));
        sc.close();
    }
}`
    },
    referenceSolution: {
      JAVASCRIPT: `function lengthOfLongestSubstring(s) {
  let map = new Map(), maxLen = 0, left = 0;
  for (let right = 0; right < s.length; right++) {
    if (map.has(s[right])) left = Math.max(left, map.get(s[right]) + 1);
    map.set(s[right], right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  let s = line.trim();
  if (s.startsWith('"') && s.endsWith('"')) {
    s = s.slice(1, -1);
  }
  const result = lengthOfLongestSubstring(s);
  console.log(result);
  rl.close();
});`,
      PYTHON: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        charSet = set()
        l = 0
        res = 0
        for r in range(len(s)):
            while s[r] in charSet:
                charSet.remove(s[l])
                l += 1
            charSet.add(s[r])
            res = max(res, r - l + 1)
        return res

if __name__ == "__main__":
    import sys
    s = sys.stdin.readline().strip()
    if s.startswith('"') and s.endswith('"'):
        s = s[1:-1]
    sol = Solution()
    result = sol.lengthOfLongestSubstring(s)
    print(result)`,
      JAVA: `import java.util.*;

public class Main {
    public int lengthOfLongestSubstring(String s) {
        int n = s.length(), ans = 0;
        Map<Character, Integer> map = new HashMap<>();
        for (int j = 0, i = 0; j < n; j++) {
            if (map.containsKey(s.charAt(j))) {
                i = Math.max(map.get(s.charAt(j)), i);
            }
            ans = Math.max(ans, j - i + 1);
            map.put(s.charAt(j), j + 1);
        }
        return ans;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine().trim();
        if (s.startsWith("\\"") && s.endsWith("\\"")) {
            s = s.substring(1, s.length() - 1);
        }
        Main sol = new Main();
        System.out.println(sol.lengthOfLongestSubstring(s));
        sc.close();
    }
}`
    }
  },
  "Container With Most Water": {
    codeSnippets: {
      JAVASCRIPT: `/**
 * @param {number[]} height
 * @return {number}
 */
function maxArea(height) {
  // Write your code here
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  const height = JSON.parse(line.trim());
  const result = maxArea(height);
  console.log(result);
  rl.close();
});`,
      PYTHON: `from typing import List

class Solution:
    def maxArea(self, height: List[int]) -> int:
        # Write your code here
        pass

if __name__ == "__main__":
    import sys
    import json
    height = json.loads(sys.stdin.readline().strip())
    sol = Solution()
    result = sol.maxArea(height)
    print(result)`,
      JAVA: `import java.util.*;

public class Main {
    public int maxArea(int[] height) {
        // Write your code here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String line = sc.nextLine().trim();
        line = line.substring(1, line.length() - 1);
        String[] parts = line.split(",");
        int[] height = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            height[i] = Integer.parseInt(parts[i].trim());
        }
        Main sol = new Main();
        System.out.println(sol.maxArea(height));
        sc.close();
    }
}`
    },
    referenceSolution: {
      JAVASCRIPT: `function maxArea(height) {
  let l = 0, r = height.length - 1, maxA = 0;
  while (l < r) {
    maxA = Math.max(maxA, Math.min(height[l], height[r]) * (r - l));
    if (height[l] < height[r]) l++;
    else r--;
  }
  return maxA;
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  const height = JSON.parse(line.trim());
  const result = maxArea(height);
  console.log(result);
  rl.close();
});`,
      PYTHON: `from typing import List
import json

class Solution:
    def maxArea(self, height: List[int]) -> int:
        l, r = 0, len(height) - 1
        res = 0
        while l < r:
            res = max(res, min(height[l], height[r]) * (r - l))
            if height[l] < height[r]:
                l += 1
            else:
                r -= 1
        return res

if __name__ == "__main__":
    import sys
    height = json.loads(sys.stdin.readline().strip())
    sol = Solution()
    result = sol.maxArea(height)
    print(result)`,
      JAVA: `import java.util.*;

public class Main {
    public int maxArea(int[] height) {
        int l = 0, r = height.length - 1;
        int max = 0;
        while (l < r) {
            max = Math.max(max, Math.min(height[l], height[r]) * (r - l));
            if (height[l] < height[r])
                l++;
            else
                r--;
        }
        return max;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String line = sc.nextLine().trim();
        line = line.substring(1, line.length() - 1);
        String[] parts = line.split(",");
        int[] height = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            height[i] = Integer.parseInt(parts[i].trim());
        }
        Main sol = new Main();
        System.out.println(sol.maxArea(height));
        sc.close();
    }
}`
    }
  },
  "Trapping Rain Water": {
    codeSnippets: {
      JAVASCRIPT: `/**
 * @param {number[]} height
 * @return {number}
 */
function trap(height) {
  // Write your code here
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  const height = JSON.parse(line.trim());
  const result = trap(height);
  console.log(result);
  rl.close();
});`,
      PYTHON: `from typing import List

class Solution:
    def trap(self, height: List[int]) -> int:
        # Write your code here
        pass

if __name__ == "__main__":
    import sys
    import json
    height = json.loads(sys.stdin.readline().strip())
    sol = Solution()
    result = sol.trap(height)
    print(result)`,
      JAVA: `import java.util.*;

public class Main {
    public int trap(int[] height) {
        // Write your code here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String line = sc.nextLine().trim();
        line = line.substring(1, line.length() - 1);
        String[] parts = line.split(",");
        int[] height = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            height[i] = Integer.parseInt(parts[i].trim());
        }
        Main sol = new Main();
        System.out.println(sol.trap(height));
        sc.close();
    }
}`
    },
    referenceSolution: {
      JAVASCRIPT: `function trap(height) {
  let l = 0, r = height.length-1, lMax = 0, rMax = 0, res = 0;
  while (l < r) {
    if (height[l] < height[r]) {
      height[l] >= lMax ? (lMax = height[l]) : res += (lMax - height[l]);
      l++;
    } else {
      height[r] >= rMax ? (rMax = height[r]) : res += (rMax - height[r]);
      r--;
    }
  }
  return res;
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  const height = JSON.parse(line.trim());
  const result = trap(height);
  console.log(result);
  rl.close();
});`,
      PYTHON: `from typing import List
import json

class Solution:
    def trap(self, height: List[int]) -> int:
        if not height: return 0
        l, r = 0, len(height) - 1
        leftMax, rightMax = height[l], height[r]
        res = 0
        while l < r:
            if leftMax < rightMax:
                l += 1
                leftMax = max(leftMax, height[l])
                res += leftMax - height[l]
            else:
                r -= 1
                rightMax = max(rightMax, height[r])
                res += rightMax - height[r]
        return res

if __name__ == "__main__":
    import sys
    height = json.loads(sys.stdin.readline().strip())
    sol = Solution()
    result = sol.trap(height)
    print(result)`,
      JAVA: `import java.util.*;

public class Main {
    public int trap(int[] height) {
        int left = 0, right = height.length - 1;
        int ans = 0;
        int left_max = 0, right_max = 0;
        while (left < right) {
            if (height[left] < height[right]) {
                if (height[left] >= left_max) left_max = height[left];
                else ans += (left_max - height[left]);
                ++left;
            } else {
                if (height[right] >= right_max) right_max = height[right];
                else ans += (right_max - height[right]);
                --right;
            }
        }
        return ans;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String line = sc.nextLine().trim();
        line = line.substring(1, line.length() - 1);
        String[] parts = line.split(",");
        int[] height = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            height[i] = Integer.parseInt(parts[i].trim());
        }
        Main sol = new Main();
        System.out.println(sol.trap(height));
        sc.close();
    }
}`
    }
  },
  "Permutations": {
    codeSnippets: {
      JAVASCRIPT: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function permute(nums) {
  // Write your code here
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  const nums = JSON.parse(line.trim());
  const result = permute(nums);
  console.log(JSON.stringify(result));
  rl.close();
});`,
      PYTHON: `from typing import List

class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        # Write your code here
        pass

if __name__ == "__main__":
    import sys
    import json
    nums = json.loads(sys.stdin.readline().strip())
    sol = Solution()
    result = sol.permute(nums)
    print(json.dumps(result))`,
      JAVA: `import java.util.*;

public class Main {
    public List<List<Integer>> permute(int[] nums) {
        // Write your code here
        return new ArrayList<>();
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String line = sc.nextLine().trim();
        line = line.substring(1, line.length() - 1);
        String[] parts = line.split(",");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            nums[i] = Integer.parseInt(parts[i].trim());
        }
        Main sol = new Main();
        List<List<Integer>> result = sol.permute(nums);
        System.out.println(result.toString().replace(" ", ""));
        sc.close();
    }
}`
    },
    referenceSolution: {
      JAVASCRIPT: `function permute(nums) {
  const res = [];
  const backtrack = (curr) => {
    if (curr.length === nums.length) {
      res.push([...curr]);
      return;
    }
    for (let n of nums) {
      if (!curr.includes(n)) {
        curr.push(n);
        backtrack(curr);
        curr.pop();
      }
    }
  };
  backtrack([]);
  return res;
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  const nums = JSON.parse(line.trim());
  const result = permute(nums);
  console.log(JSON.stringify(result));
  rl.close();
});`,
      PYTHON: `from typing import List
import json

class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        res = []
        if len(nums) == 1:
            return [nums[:]]
        for i in range(len(nums)):
            n = nums.pop(0)
            perms = self.permute(nums)
            for perm in perms:
                perm.append(n)
            res.extend(perms)
            nums.append(n)
        return res

if __name__ == "__main__":
    import sys
    nums = json.loads(sys.stdin.readline().strip())
    sol = Solution()
    result = sol.permute(nums)
    print(json.dumps(result))`,
      JAVA: `import java.util.*;

public class Main {
    public List<List<Integer>> permute(int[] nums) {
       List<List<Integer>> list = new ArrayList<>();
       backtrack(list, new ArrayList<>(), nums);
       return list;
    }
    
    private void backtrack(List<List<Integer>> list, List<Integer> tempList, int[] nums) {
       if (tempList.size() == nums.length) {
          list.add(new ArrayList<>(tempList));
       } else {
          for (int i = 0; i < nums.length; i++) { 
             if (tempList.contains(nums[i])) continue;
             tempList.add(nums[i]);
             backtrack(list, tempList, nums);
             tempList.remove(tempList.size() - 1);
          }
       }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String line = sc.nextLine().trim();
        line = line.substring(1, line.length() - 1);
        String[] parts = line.split(",");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            nums[i] = Integer.parseInt(parts[i].trim());
        }
        Main sol = new Main();
        List<List<Integer>> result = sol.permute(nums);
        System.out.println(result.toString().replace(" ", ""));
        sc.close();
    }
}`
    }
  },
  "Number of Islands": {
    codeSnippets: {
      JAVASCRIPT: `/**
 * @param {character[][]} grid
 * @return {number}
 */
function numIslands(grid) {
  // Write your code here
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  const grid = JSON.parse(line.trim());
  const result = numIslands(grid);
  console.log(result);
  rl.close();
});`,
      PYTHON: `from typing import List

class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        # Write your code here
        pass

if __name__ == "__main__":
    import sys
    import json
    grid = json.loads(sys.stdin.readline().strip())
    sol = Solution()
    result = sol.numIslands(grid)
    print(result)`,
      JAVA: `import java.util.*;

public class Main {
    public int numIslands(char[][] grid) {
        // Write your code here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String line = sc.nextLine().trim();
        // Parse 2D array - simplified for common cases
        line = line.substring(1, line.length() - 1); // Remove outer []
        String[] rows = line.split("\\\\],\\\\[");
        char[][] grid = new char[rows.length][];
        for (int i = 0; i < rows.length; i++) {
            String row = rows[i].replace("[", "").replace("]", "").replace("\\"", "");
            String[] cells = row.split(",");
            grid[i] = new char[cells.length];
            for (int j = 0; j < cells.length; j++) {
                grid[i][j] = cells[j].trim().charAt(0);
            }
        }
        Main sol = new Main();
        System.out.println(sol.numIslands(grid));
        sc.close();
    }
}`
    },
    referenceSolution: {
      JAVASCRIPT: `function numIslands(grid) {
  let count = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === '1') {
        count++;
        dfs(grid, i, j);
      }
    }
  }
  return count;
}

function dfs(grid, i, j) {
  if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length || grid[i][j] === '0') return;
  grid[i][j] = '0';
  dfs(grid, i + 1, j);
  dfs(grid, i - 1, j);
  dfs(grid, i, j + 1);
  dfs(grid, i, j - 1);
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  const grid = JSON.parse(line.trim());
  const result = numIslands(grid);
  console.log(result);
  rl.close();
});`,
      PYTHON: `from typing import List
import json
from collections import deque

class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        if not grid: return 0
        rows, cols = len(grid), len(grid[0])
        visit = set()
        islands = 0
        
        def bfs(r, c):
            q = deque()
            visit.add((r, c))
            q.append((r, c))
            while q:
                row, col = q.popleft()
                directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]
                for dr, dc in directions:
                    r, c = row + dr, col + dc
                    if (r in range(rows) and c in range(cols) and grid[r][c] == "1" and (r, c) not in visit):
                        q.append((r, c))
                        visit.add((r, c))
        
        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == "1" and (r, c) not in visit:
                    bfs(r, c)
                    islands += 1
        return islands

if __name__ == "__main__":
    import sys
    grid = json.loads(sys.stdin.readline().strip())
    sol = Solution()
    result = sol.numIslands(grid)
    print(result)`,
      JAVA: `import java.util.*;

public class Main {
    public int numIslands(char[][] grid) {
        int count = 0;
        for (int i = 0; i < grid.length; i++) 
            for (int j = 0; j < grid[0].length; j++) 
                if (grid[i][j] == '1') {
                    dfs(grid, i, j);
                    count++;
                }
        return count;
    }
    
    private void dfs(char[][] grid, int i, int j) {
        if (i >= 0 && j >= 0 && i < grid.length && j < grid[0].length && grid[i][j] == '1') {
            grid[i][j] = '0';
            dfs(grid, i + 1, j);
            dfs(grid, i - 1, j);
            dfs(grid, i, j + 1);
            dfs(grid, i, j - 1);
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String line = sc.nextLine().trim();
        line = line.substring(1, line.length() - 1);
        String[] rows = line.split("\\\\],\\\\[");
        char[][] grid = new char[rows.length][];
        for (int i = 0; i < rows.length; i++) {
            String row = rows[i].replace("[", "").replace("]", "").replace("\\"", "");
            String[] cells = row.split(",");
            grid[i] = new char[cells.length];
            for (int j = 0; j < cells.length; j++) {
                grid[i][j] = cells[j].trim().charAt(0);
            }
        }
        Main sol = new Main();
        System.out.println(sol.numIslands(grid));
        sc.close();
    }
}`
    }
  }
};

async function updateAllProblems() {
  console.log("🔄 Updating all problems with stdin/stdout handling...\n");
  
  for (const [title, data] of Object.entries(problemUpdates)) {
    const problem = await prisma.problem.findFirst({
      where: { title }
    });
    
    if (!problem) {
      console.log(`⚠️  Problem not found: ${title}`);
      continue;
    }
    
    await prisma.problem.update({
      where: { id: problem.id },
      data: {
        codeSnippets: data.codeSnippets,
        referenceSolution: data.referenceSolution
      }
    });
    
    console.log(`✅ Updated: ${title}`);
  }
  
  console.log("\n🎉 All problems updated successfully!");
}

updateAllProblems()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
