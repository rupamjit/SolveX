import "dotenv/config";
import prisma from "../lib/prisma";

const updatedCodeSnippets = {
  JAVASCRIPT: `/**
 * @param {number} n
 * @return {string[]}
 */
function generateParenthesis(n) {
  // Write your code here
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  const n = parseInt(line.trim());
  const result = generateParenthesis(n);
  console.log(JSON.stringify(result));
  rl.close();
});`,
  PYTHON: `from typing import List

class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        # Write your code here
        pass

if __name__ == "__main__":
    import sys
    import json
    line = sys.stdin.readline()
    if line:
        n = int(line.strip())
        sol = Solution()
        result = sol.generateParenthesis(n)
        print(json.dumps(result))`,
  JAVA: `import java.util.*;

public class Main {
    public List<String> generateParenthesis(int n) {
        // Write your code here
        return new ArrayList<>();
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            int n = Integer.parseInt(sc.nextLine().trim());
            Main sol = new Main();
            List<String> result = sol.generateParenthesis(n);
            StringBuilder sb = new StringBuilder("[");
            for (int i = 0; i < result.size(); i++) {
                sb.append("\\"").append(result.get(i)).append("\\"");
                if (i < result.size() - 1) sb.append(",");
            }
            sb.append("]");
            System.out.println(sb.toString());
        }
        sc.close();
    }
}`
};

const updatedReferenceSolutions = {
  JAVASCRIPT: `/**
 * @param {number} n
 * @return {string[]}
 */
function generateParenthesis(n) {
  const result = [];
  
  function backtrack(current, open, close) {
    if (current.length === 2 * n) {
      result.push(current);
      return;
    }
    if (open < n) {
      backtrack(current + "(", open + 1, close);
    }
    if (close < open) {
      backtrack(current + ")", open, close + 1);
    }
  }
  
  backtrack("", 0, 0);
  return result;
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  const n = parseInt(line.trim());
  const result = generateParenthesis(n);
  console.log(JSON.stringify(result));
  rl.close();
});`,
  PYTHON: `from typing import List
import json

class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        result = []
        
        def backtrack(current, open_count, close_count):
            if len(current) == 2 * n:
                result.append(current)
                return
            if open_count < n:
                backtrack(current + "(", open_count + 1, close_count)
            if close_count < open_count:
                backtrack(current + ")", open_count, close_count + 1)
        
        backtrack("", 0, 0)
        return result

if __name__ == "__main__":
    import sys
    line = sys.stdin.readline()
    if line:
        n = int(line.strip())
        sol = Solution()
        result = sol.generateParenthesis(n)
        print(json.dumps(result))`,
  JAVA: `import java.util.*;

public class Main {
    public List<String> generateParenthesis(int n) {
        List<String> result = new ArrayList<>();
        backtrack(result, "", 0, 0, n);
        return result;
    }
    
    private void backtrack(List<String> list, String str, int open, int close, int max) {
        if (str.length() == max * 2) {
            list.add(str);
            return;
        }
        if (open < max) {
            backtrack(list, str + "(", open + 1, close, max);
        }
        if (close < open) {
            backtrack(list, str + ")", open, close + 1, max);
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            int n = Integer.parseInt(sc.nextLine().trim());
            Main sol = new Main();
            List<String> result = sol.generateParenthesis(n);
            StringBuilder sb = new StringBuilder("[");
            for (int i = 0; i < result.size(); i++) {
                sb.append("\\"").append(result.get(i)).append("\\"");
                if (i < result.size() - 1) sb.append(",");
            }
            sb.append("]");
            System.out.println(sb.toString());
        }
        sc.close();
    }
}`
};

async function updateProblem() {
  console.log("Updating Generate Parentheses problem...");
  
  const problem = await prisma.problem.findFirst({
    where: { title: "Generate Parentheses" }
  });
  
  if (!problem) {
    console.log("Problem not found!");
    return;
  }
  
  await prisma.problem.update({
    where: { id: problem.id },
    data: {
      codeSnippets: updatedCodeSnippets,
      referenceSolution: updatedReferenceSolutions
    }
  });
  
  console.log("✅ Generate Parentheses updated with stdin/stdout handling!");
}

updateProblem()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
