"use client";

import { getProblemById } from "@/modules/problems/actions/problem";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Problem } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  List,
  Play,
  CloudUpload,
  Settings,
  Maximize2,
  MoreHorizontal,
  FileText,
  Beaker,
  CheckCircle2,
  Code2,
} from "lucide-react";
import Editor from "@monaco-editor/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

const Page = () => {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState("// Start coding here...");
  const [activeTabLeft, setActiveTabLeft] = useState("description");
  const [activeTabRight, setActiveTabRight] = useState("code");
  const [isLoading, setIsLoading] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const params = useParams<{ id: string }>();

  // Fetch Problem Data
  useEffect(() => {
    const fetchProblem = async () => {
      try {
        if (params.id) {
          setIsLoading(true);
          const response = await getProblemById(params.id);
          if (response.success && response.data) {
            setProblem(response.data);
          }
        }
      } catch (error) {
        console.error("Error fetching problem:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProblem();
  }, [params.id]);

  useEffect(() => {
    if (problem?.codeSnippets) {
      const snippets = problem.codeSnippets as Record<string, string>;
      const langKey = selectedLanguage.toUpperCase();
      const snippet = snippets[langKey] || "";

      if (snippet) {
        setCode(snippet);
      } else {
        setCode("// No starter code available for this language.");
      }
    }
  }, [problem, selectedLanguage]);


  const handleRun = async () => {
    setIsRunning(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Run functionality coming soon!");
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {

  };


  const formatValue = (val: any): string => {
    if (typeof val === "string") {
      try {
        const parsed = JSON.parse(val);
        if (typeof parsed === "object" && parsed !== null) {
          return JSON.stringify(parsed);
        }
        return val;
      } catch {
        return val;
      }
    }
    return JSON.stringify(val);
  };

  const getExamples = (prob: Problem | null, lang: string): any[] => {
    if (!prob || !prob.examples) return [];
    const exObj = prob.examples as Record<string, any>;
    const langKey = lang.toUpperCase();

    let examples = exObj[langKey];
    if (!examples) {
      const firstKey = Object.keys(exObj)[0];
      examples = firstKey ? exObj[firstKey] : null;
    }

    if (!examples) return [];

    // Handle both array format and single object format
    if (Array.isArray(examples)) return examples;
    if (typeof examples === "object" && examples !== null) return [examples];
    return [];
  };
  const displayExamples = getExamples(problem, selectedLanguage);

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "EASY":
        return "text-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20";
      case "MEDIUM":
        return "text-yellow-500 bg-yellow-500/10 hover:bg-yellow-500/20";
      case "HARD":
        return "text-red-500 bg-red-500/10 hover:bg-red-500/20";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center text-muted-foreground">
        Loading...
      </div>
    );
  if (!problem)
    return (
      <div className="h-screen flex items-center justify-center">
        Problem not found
      </div>
    );

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      <header className="h-12 border-b bg-background flex items-center justify-between px-4 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link
            href="/problems"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <List className="h-4 w-4" />
            <span className="text-sm font-medium hidden sm:inline">
              Problem List
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="h-7 bg-muted text-muted-foreground hover:text-foreground px-3 gap-2"
            onClick={handleRun}
            disabled={isRunning}
          >
            <Play className="h-3 w-3 fill-current" />
            Run
          </Button>
          <Button
            size="sm"
            className={cn("h-7 px-3 gap-2", isSubmitting ? "opacity-50" : "")}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="animate-spin h-3 w-3 border-2 border-current border-t-transparent rounded-full" />
            ) : (
              <CloudUpload className="h-3 w-3" />
            )}
            Submit
          </Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-1/2 flex flex-col border-r bg-card/50">
          <div className="h-10 border-b flex items-center px-2 bg-muted/20 gap-1">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-8 gap-2 text-xs font-medium rounded-t-md relative",
                activeTabLeft === "description"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground",
              )}
              onClick={() => setActiveTabLeft("description")}
            >
              <FileText className="h-3.5 w-3.5 text-blue-500" />
              Description
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-8 gap-2 text-xs font-medium",
                activeTabLeft === "editorial"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground",
              )}
              onClick={() => setActiveTabLeft("editorial")}
            >
              <Beaker className="h-3.5 w-3.5 text-orange-500" />
              Editorial
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-8 gap-2 text-xs font-medium",
                activeTabLeft === "solutions"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground",
              )}
              onClick={() => setActiveTabLeft("solutions")}
            >
              <Beaker className="h-3.5 w-3.5 text-purple-500" />
              Solutions
            </Button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-hidden relative">
            {activeTabLeft === "description" && (
              <ScrollArea className="h-full">
                <div className="p-5 space-y-6 max-w-4xl mx-auto">
                  {/* Title & Badges */}
                  <div className="space-y-3">
                    <h1 className="text-2xl font-bold tracking-tight">
                      {problem.title}
                    </h1>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className={cn(
                          "rounded-md px-2 py-0.5 font-medium border-0",
                          getDifficultyColor(problem.difficulty),
                        )}
                      >
                        {problem.difficulty}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-xs text-muted-foreground rounded-md border-transparent bg-muted/50 hover:bg-muted cursor-pointer transition-colors"
                      >
                        Topics
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-xs text-muted-foreground rounded-md border-transparent bg-muted/50 hover:bg-muted cursor-pointer transition-colors"
                      >
                        Companies
                      </Badge>
                    </div>
                  </div>

                  {/* Description Text */}
                  <div className="prose dark:prose-invert max-w-none text-sm text-foreground/90 leading-relaxed font-normal">
                    {problem.description}
                  </div>

                  {/* Examples */}
                  {displayExamples.length > 0 && (
                    <div className="space-y-6">
                      {displayExamples.map((example: any, index: number) => (
                        <div key={index} className="space-y-3">
                          <h3 className="font-semibold text-sm text-foreground">
                            Example {index + 1}:
                          </h3>
                          <div className="space-y-2 pl-2">
                            <div className="flex gap-2 text-sm">
                              <span className="font-bold text-foreground">
                                Input:
                              </span>
                              <code className="text-foreground font-mono text-sm whitespace-pre-wrap">
                                {formatValue(
                                  example.input || example.inputText,
                                )}
                              </code>
                            </div>
                            <div className="flex gap-2 text-sm">
                              <span className="font-bold text-foreground">
                                Output:
                              </span>
                              <code className="text-foreground font-mono text-sm whitespace-pre-wrap">
                                {formatValue(
                                  example.output || example.outputText,
                                )}
                              </code>
                            </div>
                            {example.explanation && (
                              <div className="flex gap-2 text-sm">
                                <span className="font-bold text-foreground">
                                  Explanation:
                                </span>
                                <span className="text-muted-foreground text-sm">
                                  {example.explanation}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Constraints */}
                  {problem.constraints && (
                    <div className="space-y-3 pt-4">
                      <h3 className="font-semibold text-sm">Constraints:</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground font-mono">
                        {problem.constraints
                          .split("\n")
                          .map((constraint, i) => (
                            <li key={i}>{constraint}</li>
                          ))}
                      </ul>
                    </div>
                  )}
                </div>
              </ScrollArea>
            )}

            {activeTabLeft === "editorial" && (
              <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                Editorial content not available.
              </div>
            )}
            {activeTabLeft === "solutions" && (
              <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                Solutions not available.
              </div>
            )}
          </div>
        </div>


        <div className="w-1/2 flex flex-col bg-background h-full">
          {/* Tabs Header */}
          <div className="h-10 border-b flex items-center px-2 bg-muted/20 justify-between">
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-8 gap-2 text-xs font-medium rounded-t-md",
                  activeTabRight === "code"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground",
                )}
                onClick={() => setActiveTabRight("code")}
              >
                <Code2 className="h-3.5 w-3.5 text-green-500" />
                Code
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-8 gap-2 text-xs font-medium",
                  activeTabRight === "testcase"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground",
                )}
                onClick={() => setActiveTabRight("testcase")}
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground" />
                Testcase
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Select
                value={selectedLanguage}
                onValueChange={(value) => {
                  if (value) setSelectedLanguage(value);
                }}
              >
                <SelectTrigger className="h-6 text-[10px] w-auto gap-2 border-none bg-transparent hover:bg-muted focus:ring-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/*  Editor*/}
          <div className="flex-1 overflow-hidden relative border-l">
            {activeTabRight === "code" ? (
              <Editor
                height="100%"
                language={
                  selectedLanguage.toLowerCase() === "javascript"
                    ? "javascript"
                    : selectedLanguage.toLowerCase()
                }
                value={code}
                onChange={(value) => setCode(value || "")}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 2,
                  fontFamily: "'JetBrains Mono', monospace",
                  padding: { top: 10 },
                }}
              />
            ) : (
              <ScrollArea className="h-full p-4">
                <div className="space-y-4">
                  {problem.testCases && Array.isArray(problem.testCases) ? (
                    (problem.testCases as any[]).map((testCase, index) => (
                      <div key={index} className="space-y-2">
                        <div className="text-xs font-medium text-muted-foreground uppercase">
                          Case {index + 1}
                        </div>
                        <div className="grid gap-2">
                          <div className="space-y-1">
                            <div className="text-xs text-muted-foreground">
                              Input:
                            </div>
                            <div className="bg-muted/50 p-2 rounded-md font-mono text-sm whitespace-pre-wrap">
                              {formatValue(testCase.input)}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-xs text-muted-foreground">
                              Expected Output:
                            </div>
                            <div className="bg-muted/50 p-2 rounded-md font-mono text-sm whitespace-pre-wrap">
                              {formatValue(testCase.output)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      No test cases available.
                    </div>
                  )}
                </div>
              </ScrollArea>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
