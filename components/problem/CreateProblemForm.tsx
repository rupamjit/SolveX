"use client"

import { z } from "zod";
import { Editor } from "@monaco-editor/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Plus,
  Trash2,
  Code2,
  FileText,
  Lightbulb,
  BookOpen,
  CheckCircle2,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";


const problemSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  tags: z.array(z.object({ name: z.string() })).min(1, "At least one tag is required"),
  constraints: z.string().min(1, "Constraints are required"),
  hints: z.string().optional(),
  editorial: z.string().optional(),
  testCases: z
    .array(
      z.object({
        input: z.string().min(1, "Input is required"),
        output: z.string().min(1, "Output is required"),
      })
    )
    .min(1, "At least one test case is required"),
  examples: z.object({
    JAVASCRIPT: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
    PYTHON: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
    JAVA: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
  }),
  codeSnippets: z.object({
    JAVASCRIPT: z.string().min(1, "JavaScript code snippet is required"),
    PYTHON: z.string().min(1, "Python code snippet is required"),
    JAVA: z.string().min(1, "Java solution is required"),
  }),
  referenceSolutions: z.object({
    JAVASCRIPT: z.string().min(1, "JavaScript solution is required"),
    PYTHON: z.string().min(1, "Python solution is required"),
    JAVA: z.string().min(1, "Java solution is required"),
  }),
});

type ProblemFormValues = z.infer<typeof problemSchema>;




const sampledpData = {
  title: "Climbing Stairs",
  description:
    "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
  difficulty: "EASY",
  tags: [{ name: "Dynamic Programming" }, { name: "Math" }, { name: "Memoization" }],
  constraints: "1 <= n <= 45",
  hints:
    "To reach the nth step, you can either come from the (n-1)th step or the (n-2)th step.",
  editorial:
    "This is a classic dynamic programming problem. The number of ways to reach the nth step is the sum of the number of ways to reach the (n-1)th step and the (n-2)th step, forming a Fibonacci-like sequence.",
  testCases: [
    {
      input: "2",
      output: "2",
    },
    {
      input: "3",
      output: "3",
    },
    {
      input: "4",
      output: "5",
    },
  ],
  examples: {
    JAVASCRIPT: {
      input: "n = 2",
      output: "2",
      explanation:
        "There are two ways to climb to the top:\n1. 1 step + 1 step\n2. 2 steps",
    },
    PYTHON: {
      input: "n = 3",
      output: "3",
      explanation:
        "There are three ways to climb to the top:\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step",
    },
    JAVA: {
      input: "n = 4",
      output: "5",
      explanation:
        "There are five ways to climb to the top:\n1. 1 step + 1 step + 1 step + 1 step\n2. 1 step + 1 step + 2 steps\n3. 1 step + 2 steps + 1 step\n4. 2 steps + 1 step + 1 step\n5. 2 steps + 2 steps",
    },
  },
  codeSnippets: {
    JAVASCRIPT: `/**
* @param {number} n
* @return {number}
*/
function climbStairs(n) {
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
const result = climbStairs(n);

console.log(result);
rl.close();
});`,
    PYTHON: `class Solution:
    def climbStairs(self, n: int) -> int:
        # Write your code here
        pass

if __name__ == "__main__":
    import sys
    
    # Parse input from stdin
    line = sys.stdin.readline()
    if line:
        n = int(line.strip())
        sol = Solution()
        print(sol.climbStairs(n))`,
    JAVA: `import java.util.Scanner;

public class Main {
    public int climbStairs(int n) {
        // Write your code here
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextLine()) {
            int n = Integer.parseInt(scanner.nextLine().trim());
            Main sol = new Main();
            System.out.println(sol.climbStairs(n));
        }
        scanner.close();
    }
}`,
  },
  referenceSolutions: {
    JAVASCRIPT: `/**
* @param {number} n
* @return {number}
*/
function climbStairs(n) {
  // Base cases
  if (n <= 2) {
    return n;
  }

  // Dynamic programming approach
  let dp = new Array(n + 1);
  dp[1] = 1;
  dp[2] = 2;

  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  if (line.trim()) {
      const n = parseInt(line.trim());
      console.log(climbStairs(n));
  }
  rl.close();
});`,
    PYTHON: `class Solution:
    def climbStairs(self, n: int) -> int:
        if n <= 2:
            return n
        
        dp = [0] * (n + 1)
        dp[1] = 1
        dp[2] = 2
        
        for i in range(3, n + 1):
            dp[i] = dp[i - 1] + dp[i - 2]
        
        return dp[n]

if __name__ == "__main__":
    import sys
    line = sys.stdin.readline()
    if line:
        n = int(line.strip())
        sol = Solution()
        print(sol.climbStairs(n))`,
    JAVA: `import java.util.Scanner;

public class Main {
    public int climbStairs(int n) {
        if (n <= 2) {
            return n;
        }
        
        int[] dp = new int[n + 1];
        dp[1] = 1;
        dp[2] = 2;
        
        for (int i = 3; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        
        return dp[n];
    }
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (!line.isEmpty()) {
                int n = Integer.parseInt(line);
                Main sol = new Main();
                System.out.println(sol.climbStairs(n));
            }
        }
        scanner.close();
    }
}`,
  },
};

const sampleStringProblem = {
  title: "Valid Palindrome",
  description:
    "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string s, return true if it is a palindrome, or false otherwise.",
  difficulty: "EASY",
  tags: [{ name: "String" }, { name: "Two Pointers" }],
  constraints:
    "1 <= s.length <= 2 * 10^5\ns consists only of printable ASCII characters.",
  hints:
    "Consider using two pointers, one from the start and one from the end, moving towards the center.",
  editorial:
    "We can use two pointers approach to check if the string is a palindrome. One pointer starts from the beginning and the other from the end, moving towards each other.",
  testCases: [
    {
      input: "A man, a plan, a canal: Panama",
      output: "true",
    },
    {
      input: "race a car",
      output: "false",
    },
    {
      input: " ",
      output: "true",
    },
  ],
  examples: {
    JAVASCRIPT: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
    PYTHON: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
    JAVA: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
  },
  codeSnippets: {
    JAVASCRIPT: `/**
   * @param {string} s
   * @return {boolean}
   */
  function isPalindrome(s) {
    // Write your code here
  }
  
  // Add readline for dynamic input handling
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
  
  // Process input line
  rl.on('line', (line) => {
    // Call solution with the input string
    const result = isPalindrome(line);
    
    // Output the result
    console.log(result ? "true" : "false");
    rl.close();
  });`,
    PYTHON: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        # Write your code here
        pass

if __name__ == "__main__":
    import sys
    # Read the input string
    s = sys.stdin.readline().strip()
    
    sol = Solution()
    result = sol.isPalindrome(s)
    print(str(result).lower())`,
    JAVA: `import java.util.Scanner;

public class Main {
    public boolean isPalindrome(String s) {
        // Write your code here
        return false;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String input = sc.nextLine();
            Main sol = new Main();
            System.out.println(sol.isPalindrome(input) ? "true" : "false");
        }
    }
}`,
  },
  referenceSolutions: {
    JAVASCRIPT: `/**
 * @param {string} s
 * @return {boolean}
 */
function isPalindrome(s) {
  // Convert to lowercase and remove non-alphanumeric characters
  s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  // Check if it's a palindrome
  let left = 0;
  let right = s.length - 1;
  
  while (left < right) {
    if (s[left] !== s[right]) {
      return false;
    }
    left++;
    right--;
  }
  
  return true;
}

// Add readline for dynamic input handling
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

// Process input line
rl.on('line', (line) => {
  const result = isPalindrome(line);
  console.log(result ? "true" : "false");
  rl.close();
});`,
    PYTHON: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        # Convert to lowercase and keep only alphanumeric characters
        filtered_chars = [c.lower() for c in s if c.isalnum()]
        
        # Check if it's a palindrome
        return filtered_chars == filtered_chars[::-1]

if __name__ == "__main__":
    import sys
    # Read the input string
    line = sys.stdin.readline()
    if line:
        s = line.strip()
        sol = Solution()
        print(str(sol.isPalindrome(s)).lower())`,
    JAVA: `import java.util.Scanner;

public class Main {
    public boolean isPalindrome(String s) {
        // Convert to lowercase and remove non-alphanumeric
        s = s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
        int left = 0, right = s.length() - 1;

        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) return false;
            left++;
            right--;
        }

        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String input = sc.nextLine();
            Main sol = new Main();
            System.out.println(sol.isPalindrome(input) ? "true" : "false");
        }
    }
}`,
  },
};

const languageMap = {
  javascript: "javascript",
  python: "python",
  java: "java",
} as const;

type SupportedLanguage = keyof typeof languageMap;

const CodeEditor = ({ 
  value, 
  onChange, 
  language = "javascript" 
}: { 
  value: string; 
  onChange: (value: string) => void; 
  language?: string; 
}) => {
  const normalizedLanguage = language.toLowerCase() as SupportedLanguage;

  return (
    <div className="flex flex-col w-full h-full bg-slate-950 rounded-lg overflow-hidden border shadow-sm group">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900/50 border-b border-slate-800 select-none">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <div className="h-4 w-px bg-slate-800 mx-2" />
          <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Code2 className="w-3 h-3 text-primary/70" />
            {language}
          </span>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-[9px] text-slate-500 font-mono font-medium">F1 for Help</span>
        </div>
      </div>

      {/* Editor Container */}
      <div className="h-[500px] w-full pt-2">
        <Editor
          height="100%"
          language={languageMap[normalizedLanguage] || "javascript"}
          theme="vs-dark"
          value={value}
          onChange={(value) => onChange(value || "")}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            readOnly: false,
            wordWrap: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            padding: { top: 12, bottom: 12 },
            fontFamily: "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
            fontLigatures: true,
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            smoothScrolling: true,
            contextmenu: true,
            renderLineHighlight: "all",
            lineHeight: 1.6,
            suggestOnTriggerCharacters: true,
            quickSuggestions: true,
            folding: true,
          }}
        />
      </div>
    </div>
  );
};

const CreateProblemForm = () => {
    const router = useRouter()
    const [sampleType,setSampleType] = useState("DP")
    const [isLoading,setIsLoading] = useState(false)
    const [activeLanguage, setActiveLanguage] = useState<"JAVASCRIPT" | "PYTHON" | "JAVA">("JAVASCRIPT")

    const form = useForm<ProblemFormValues>({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      testCases: [{ input: "", output: "" }],
      tags: [{ name: "" }],
      examples: {
        JAVASCRIPT: { input: "", output: "", explanation: "" },
        PYTHON: { input: "", output: "", explanation: "" },
        JAVA: { input: "", output: "", explanation: "" },
      },
      codeSnippets: {
        JAVASCRIPT: `function solution() {
  // Write your code here
}`,
        PYTHON: `def solution():
    # Write your code here
    pass`,
        JAVA: `public class Main {
    public static void main(String[] args) {
        // Write your code here
    }
}`,
      },
      referenceSolutions: {
        JAVASCRIPT: `// Add your reference solution here`,
        PYTHON: `# Add your reference solution here`,
        JAVA: `// Add your reference solution here`,
      },
    },
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = form;

  const {
    fields: testCaseFields,
    append: appendTestCase,
    remove: removeTestCase,
    replace: replaceTestCases,
  } = useFieldArray({
    control,
    name: "testCases",
  });

    const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
    replace: replaceTags,
  } = useFieldArray({
    control,
    name: "tags",
  });

    const loadSampleData = () => {
    const sampleData = (sampleType === "DP" ? sampledpData : sampleStringProblem) as ProblemFormValues;
    reset(sampleData);
  };

  const onSubmit = async (data: ProblemFormValues) => {
    setIsLoading(true);
    try {
        console.log(data)
      const response = await fetch("/api/create-problem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          referenceSolution: data.referenceSolutions,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create problem");
      }

      toast.success("Problem created successfully!");
      if (result.data?.id) {
        router.push(`/problem/${result.data.id}`);
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const navItems = [
    { id: "basic-info", label: "Basic Info", icon: FileText },
    { id: "tags-section", label: "Classification", icon: BookOpen },
    { id: "test-cases", label: "Validation", icon: CheckCircle2 },
    { id: "implementation", label: "Implementation", icon: Code2 },
    { id: "additional", label: "Metadata", icon: Lightbulb },
  ];

  return (
    <div className="container mx-auto py-6 px-4 max-w-7xl animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Sidebar Navigation */}
        <aside className="lg:w-64 lg:sticky lg:top-8 w-full shrink-0">
          <div className="mb-8 px-2">
            <h1 className="text-2xl font-bold tracking-tight">Create Problem</h1>
            <p className="text-sm text-muted-foreground mt-1">Design a new logic challenge</p>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all group"
              >
                <item.icon className="w-4 h-4 group-hover:text-primary transition-colors" />
                {item.label}
              </a>
            ))}
          </nav>

          <Card className="mt-10 border-none bg-muted/30 dark:bg-muted/10">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">Workspace</span>
                <Badge variant="outline" className="text-[9px] h-4 bg-primary/5 text-primary border-primary/20">Draft</Badge>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant={sampleType === "DP" ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => setSampleType("DP")}
                    className="h-8 text-[11px] font-semibold"
                  >
                    DP
                  </Button>
                  <Button
                    type="button"
                    variant={sampleType === "string" ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => setSampleType("string")}
                    className="h-8 text-[11px] font-semibold"
                  >
                    String
                  </Button>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={loadSampleData}
                  className="w-full h-8 text-[11px] gap-2 hover:bg-primary/5 hover:text-primary"
                >
                  <Download className="w-3 h-3" />
                  Apply Template
                </Button>
              </div>

              <Separator className="bg-border/50" />

              <Button
                type="submit"
                form="problem-form"
                disabled={isLoading}
                className="w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-sm"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Publish Problem"
                )}
              </Button>
            </CardContent>
          </Card>
        </aside>

        {/* Form Content */}
        <div className="flex-1 w-full min-w-0">
          <form id="problem-form" onSubmit={handleSubmit(onSubmit)} className="space-y-10 pb-20">
            
            {/* Basic Information */}
            <section id="basic-info" className="space-y-4 scroll-mt-24">
              <div className="flex items-center gap-2 border-b pb-2 mb-6">
                <FileText className="w-4 h-4 text-primary" />
                <h2 className="text-lg font-semibold tracking-tight">Basic Information</h2>
              </div>
              
              <div className="grid gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Problem Title</Label>
                  <Input
                    id="title"
                    {...register("title")}
                    placeholder="e.g. Subarray Sum Equals K"
                    className="h-11 focus-visible:ring-primary shadow-xs"
                  />
                  {errors.title && <p className="text-[11px] text-destructive font-medium">{errors.title.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description & Objective</Label>
                  <Textarea
                    id="description"
                    {...register("description")}
                    placeholder="Clearly explain the challenge, constraints, and goal..."
                    className="min-h-[200px] leading-relaxed focus-visible:ring-primary resize-y shadow-xs"
                  />
                  {errors.description && <p className="text-[11px] text-destructive font-medium">{errors.description.message}</p>}
                </div>
              </div>
            </section>

            {/* Classification */}
            <section id="tags-section" className="space-y-4 scroll-mt-24">
              <div className="flex items-center gap-2 border-b pb-2 mb-6">
                <BookOpen className="w-4 h-4 text-primary" />
                <h2 className="text-lg font-semibold tracking-tight">Classification</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-1 shadow-xs bg-muted/5 dark:bg-muted/5 border-muted-foreground/10">
                  <CardHeader className="py-4">
                    <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Difficulty</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <Controller
                      name="difficulty"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className="w-full h-10 border-input shadow-none bg-background">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="EASY">
                              <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400 border-none shadow-none">Easy</Badge>
                            </SelectItem>
                            <SelectItem value="MEDIUM">
                              <Badge className="bg-amber-50 text-amber-700 hover:bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400 border-none shadow-none">Medium</Badge>
                            </SelectItem>
                            <SelectItem value="HARD">
                              <Badge className="bg-rose-50 text-rose-700 hover:bg-rose-50 dark:bg-rose-900/20 dark:text-rose-400 border-none shadow-none">Hard</Badge>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card className="md:col-span-2 shadow-xs bg-muted/5 dark:bg-muted/5 border-muted-foreground/10">
                  <CardHeader className="py-4 flex flex-row items-center justify-between">
                    <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Problem Tags</CardTitle>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => appendTag({ name: "" })}
                      className="h-7 text-[11px] font-bold text-primary hover:bg-primary/5"
                    >
                      <Plus className="w-3 h-3 mr-1" /> Add Tag
                    </Button>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <div className="flex flex-wrap gap-2">
                      {tagFields.map((field, index) => (
                        <div key={field.id} className="flex gap-1 items-center bg-background rounded-md border p-1 pl-3 focus-within:ring-2 focus-within:ring-primary/20 transition-all shadow-xs">
                          <input
                            {...register(`tags.${index}.name`)}
                            placeholder="Tag"
                            className="bg-transparent text-sm focus:outline-none w-20 font-medium"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeTag(index)}
                            className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive hover:bg-transparent"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Validation */}
            <section id="test-cases" className="space-y-4 scroll-mt-24">
              <div className="flex items-center justify-between border-b pb-2 mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <h2 className="text-lg font-semibold tracking-tight">Validation Tests</h2>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendTestCase({ input: "", output: "" })}
                  className="h-8 text-[11px] font-bold shadow-xs transition-colors hover:border-primary/50"
                >
                  <Plus className="w-3 h-3 mr-1" /> Add Test Case
                </Button>
              </div>

              <div className="space-y-4">
                {testCaseFields.map((field, index) => (
                  <Card key={field.id} className="shadow-xs bg-muted/5 border-muted-foreground/10 overflow-hidden transition-all group hover:bg-muted/10">
                    <CardContent className="p-5">
                      <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-[10px] font-bold shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                          <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-tight text-muted-foreground">Input (stdin)</Label>
                            <Textarea
                              {...register(`testCases.${index}.input`)}
                              className="min-h-[100px] font-mono text-sm bg-background border-input focus-visible:ring-primary shadow-xs"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-tight text-muted-foreground">Expected Output</Label>
                            <Textarea
                              {...register(`testCases.${index}.output`)}
                              className="min-h-[100px] font-mono text-sm bg-background border-input focus-visible:ring-primary shadow-xs"
                            />
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTestCase(index)}
                          className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Implementation */}
            <section id="implementation" className="space-y-4 scroll-mt-24">
              <div className="flex items-center gap-2 border-b pb-2 mb-6">
                <Code2 className="w-4 h-4 text-primary" />
                <h2 className="text-lg font-semibold tracking-tight">Implementation</h2>
              </div>

              <Card className="shadow-xs border-muted-foreground/10 overflow-hidden bg-muted/5">
                <div className="flex bg-muted/50 dark:bg-muted/20 border-b px-6 overflow-x-auto no-scrollbar">
                  {(["JAVASCRIPT", "PYTHON", "JAVA"] as const).map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setActiveLanguage(lang)}
                      className={`relative py-3 px-4 text-xs font-bold transition-all border-b-2 ${
                        activeLanguage === lang 
                          ? "text-primary border-primary" 
                          : "text-muted-foreground border-transparent hover:text-foreground"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
                
                <CardContent className="p-6 space-y-10 bg-background">
                  <div className="flex flex-col lg:flex-row gap-8 w-full">
                    {/* Starter Code Column */}
                    <div className="flex-1 min-w-0 space-y-4">
                      <div className="flex items-center justify-between px-1">
                        <div className="space-y-0.5">
                          <Label className="text-sm font-semibold tracking-tight">Starter Code</Label>
                          <p className="text-[11px] text-muted-foreground">Initial template for students</p>
                        </div>
                        <Badge variant="outline" className="text-[10px] h-5 px-2 font-mono bg-muted/50 border-muted-foreground/20">{activeLanguage}</Badge>
                      </div>
                      <div className="shadow-md rounded-lg overflow-hidden border border-slate-800">
                        <Controller
                          name={`codeSnippets.${activeLanguage}`}
                          control={control}
                          render={({ field }) => (
                            <CodeEditor
                              value={field.value}
                              onChange={field.onChange}
                              language={activeLanguage.toLowerCase()}
                            />
                          )}
                        />
                      </div>
                    </div>

                    {/* Reference Solution Column */}
                    <div className="flex-1 min-w-0 space-y-4">
                      <div className="flex items-center justify-between px-1">
                        <div className="space-y-0.5">
                          <Label className="text-sm font-semibold tracking-tight text-primary">Master Solution</Label>
                          <p className="text-[11px] text-muted-foreground">Optimal reference implementation</p>
                        </div>
                        <Badge className="text-[10px] h-5 px-2 bg-primary/10 text-primary border-none">Gold Standard</Badge>
                      </div>
                      <div className="shadow-md rounded-lg overflow-hidden border border-slate-800">
                        <Controller
                          name={`referenceSolutions.${activeLanguage}`}
                          control={control}
                          render={({ field }) => (
                            <CodeEditor
                              value={field.value}
                              onChange={field.onChange}
                              language={activeLanguage.toLowerCase()}
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <Card className="shadow-none border-dashed bg-muted/30">
                    <CardHeader className="py-3 px-4">
                      <CardTitle className="text-[11px] font-bold uppercase tracking-tight text-muted-foreground flex items-center gap-2">
                        <FileText className="w-3 h-3" /> Language Specific Example
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5 focus-within:shadow-md transition-shadow">
                          <Label className="text-[10px] uppercase font-bold text-muted-foreground/80 px-1">Input</Label>
                          <Textarea
                            {...register(`examples.${activeLanguage}.input`)}
                            className="bg-background border-input font-mono text-[13px] min-h-[60px] shadow-none focus-visible:ring-primary"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-[10px] uppercase font-bold text-muted-foreground/80 px-1">Output</Label>
                          <Textarea
                            {...register(`examples.${activeLanguage}.output`)}
                            className="bg-background border-input font-mono text-[13px] min-h-[60px] shadow-none focus-visible:ring-primary"
                          />
                        </div>
                        <div className="md:col-span-2 space-y-1.5">
                          <Label className="text-[10px] uppercase font-bold text-muted-foreground/80 px-1">Explanation</Label>
                          <Textarea
                            {...register(`examples.${activeLanguage}.explanation`)}
                            className="bg-background border-input text-[13px] min-h-[80px] shadow-none focus-visible:ring-primary"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </section>

            {/* Metadata & Editorial */}
            <section id="additional" className="space-y-4 scroll-mt-24">
              <div className="flex items-center gap-2 border-b pb-2 mb-6">
                <Lightbulb className="w-4 h-4 text-primary" />
                <h2 className="text-lg font-semibold tracking-tight">Metadata & Solution</h2>
              </div>

              <Card className="shadow-xs border-muted-foreground/10 bg-muted/5">
                <CardContent className="p-6 space-y-8">
                  <div className="space-y-2">
                    <Label className="text-[11px] font-bold uppercase text-muted-foreground tracking-tight">Constraints</Label>
                    <Textarea 
                      {...register("constraints")} 
                      className="font-mono bg-background border-input min-h-[80px] focus-visible:ring-primary shadow-xs" 
                      placeholder="e.g. 1 <= n <= 10^5"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[11px] font-bold uppercase text-muted-foreground tracking-tight flex items-center justify-between">
                        Hints <Badge variant="secondary" className="text-[9px] h-3.5 uppercase font-medium">Optional</Badge>
                      </Label>
                      <Textarea 
                        {...register("hints")} 
                        className="bg-background border-input min-h-[120px] focus-visible:ring-primary shadow-xs"
                        placeholder="Provide steps or observations..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[11px] font-bold uppercase text-muted-foreground tracking-tight flex items-center justify-between">
                        Editorial <Badge variant="secondary" className="text-[9px] h-3.5 uppercase font-medium">Optional</Badge>
                      </Label>
                      <Textarea 
                        {...register("editorial")} 
                        className="bg-background border-input min-h-[120px] focus-visible:ring-primary shadow-xs"
                        placeholder="Detailed explanation of the solution..."
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateProblemForm