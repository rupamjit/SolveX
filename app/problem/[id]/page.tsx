"use client";

import {
  getProblemById,
  executeCode,
  getUserProblemData,
} from "@/modules/problems/actions/problem";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Problem } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  List,
  Play,
  CloudUpload,
  FileText,
  Beaker,
  CheckCircle2,
  Code2,
  Clock,
  Lightbulb,
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
import { getJudge0LanguageId } from "@/lib/judge0";
import { SubmissionDetails } from "@/components/problem/SubmissionDetails";
import { TestCaseTable } from "@/components/problem/TestCaseTable";
import { SubmissionHistory } from "@/components/problem/SubmissionHistory";

const Page = () => {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState("// Start coding here...");
  const [activeTabLeft, setActiveTabLeft] = useState("description");
  const [activeTabRight, setActiveTabRight] = useState("code");
  const [isLoading, setIsLoading] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionHistory, setSubmissionHistory] = useState<any[]>([]);
  const [executionResponse, setExecutionResponse] = useState<any>(null);
  const [showHint, setShowHint] = useState(false);

  const params = useParams<{ id: string }>();

  //  Helpers 

  const extractCleanSnippet = (snippet: string, language: string): string => {
    switch (language.toLowerCase()) {
      case "javascript": {
        const lines = snippet.split("\n");
        const cutoff = lines.findIndex(
          (l) =>
            l.includes("require('readline')") ||
            l.includes("createInterface")
        );
        return cutoff > 0
          ? lines.slice(0, cutoff).join("\n").trimEnd()
          : snippet;
      }
      case "python": {
        const lines = snippet.split("\n");
        const cutoff = lines.findIndex((l) => l.includes("if __name__"));
        return cutoff > 0
          ? lines.slice(0, cutoff).join("\n").trimEnd()
          : snippet;
      }
      case "java": {
        const lines = snippet.split("\n");
        const cutoff = lines.findIndex((l) =>
          l.trimStart().startsWith("public static void main")
        );
        return cutoff > 0
          ? lines.slice(0, cutoff).join("\n").trimEnd() + "\n}"
          : snippet; // already clean, return as-is
      }
      default:
        return snippet;
    }
  };

  const buildSubmissionCode = (
    userCode: string,
    language: string,
    prob: Problem
  ): string => {
    const snippets = prob.codeSnippets as Record<string, string>;
    const langKey = language.toUpperCase();
    const fullSnippet =
      snippets[langKey] || snippets[Object.keys(snippets)[0]] || "";

    switch (language.toLowerCase()) {
      case "javascript": {
        const lines = fullSnippet.split("\n");
        const boilerplateStart = lines.findIndex(
          (l) =>
            l.includes("require('readline')") ||
            l.includes("createInterface")
        );
        const boilerplate =
          boilerplateStart > 0
            ? lines.slice(boilerplateStart).join("\n")
            : "";
        return boilerplate ? `${userCode}\n\n${boilerplate}` : userCode;
      }
      case "python": {
        const lines = fullSnippet.split("\n");
        const mainStart = lines.findIndex((l) => l.includes("if __name__"));
        const boilerplate =
          mainStart > 0 ? lines.slice(mainStart).join("\n") : "";
        return boilerplate ? `${userCode}\n\n${boilerplate}` : userCode;
      }
      case "java": {
        const lines = fullSnippet.split("\n");
        const mainStart = lines.findIndex((l) =>
          l.trimStart().startsWith("public static void main")
        );
        if (mainStart > 0) {
          // userCode already has closing }, so remove last } and inject main back
          const userLines = userCode.split("\n");
          const lastBrace = userLines.map(l => l.trim()).lastIndexOf("}");
          const codeWithoutLastBrace = userLines.slice(0, lastBrace).join("\n");
          const mainBoilerplate = lines.slice(mainStart).join("\n");
          return `${codeWithoutLastBrace}\n\n    ${mainBoilerplate}`;
        }
        return userCode;
      }
      default:
        return userCode;
    }
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
    if (Array.isArray(examples)) return examples;
    if (typeof examples === "object" && examples !== null) return [examples];
    return [];
  };

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

  //  Effects 

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        if (params.id) {
          setIsLoading(true);
          const response = await getProblemById(params.id);
          if (response.success && response.data) {
            setProblem(response.data);
          }
          const userData = await getUserProblemData(params.id);
          if (userData.success) {
            if (userData.submissions) {
              setSubmissionHistory(
                userData.submissions.map((s: any) => ({
                  id: s.id,
                  status: s.status,
                  language: s.language,
                  memory: s.memory,
                  time: s.time,
                  createdAt: s.createdAt,
                }))
              );
            }
          }
        }
      } catch (error) {
        console.error("Error fetching problem:", error);
        toast.error("Failed to load problem");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProblem();
  }, [params.id]);

  useEffect(() => {
    if (problem) {
      const snippets = problem.codeSnippets as Record<string, string>;
      if (snippets) {
        const langKey = selectedLanguage.toUpperCase();
        const snippet =
          snippets[langKey] || snippets[Object.keys(snippets)[0]];
        if (snippet) {
          const cleanSnippet = extractCleanSnippet(snippet, selectedLanguage);
          setCode(cleanSnippet);
        }
      }
    }
  }, [problem, selectedLanguage]);

  // ─── Handlers ────────────────────────────────────────────────────────────────

  const handleRun = async () => {
    if (!problem) return;
    setIsRunning(true);
    setExecutionResponse(null);
    try {
      const language_id = getJudge0LanguageId(selectedLanguage);
      const testCases = problem.testCases as { input: string; output: string }[];
      const stdin = testCases.map((tc) => tc.input);
      const expected_outputs = testCases.map((tc) => tc.output);
      const submissionCode = buildSubmissionCode(code, selectedLanguage, problem);

      const res = await executeCode({
        id: problem.id,
        source_code: submissionCode,
        language_id,
        stdin,
        expected_outputs,
      });

      if (res.success) {
        toast.success("Code executed successfully");
        setExecutionResponse(res);
        setActiveTabRight("results");
        const submission = res.submission;
        if (submission) {
          setSubmissionHistory((prev) => [
            {
              id: submission.id || `run-${Date.now()}`,
              status: submission.status,
              language: submission.language || selectedLanguage,
              memory: submission.memory,
              time: submission.time,
              createdAt: submission.createdAt || new Date().toISOString(),
            },
            ...prev,
          ]);
        }
      } else {
        toast.error(res.message || "Execution failed");
      }
    } catch (error) {
      toast.error("Error executing code");
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    if (!problem) return;
    setIsSubmitting(true);
    setExecutionResponse(null);
    try {
      const language_id = getJudge0LanguageId(selectedLanguage);
      const testCases = problem.testCases as { input: string; output: string }[];
      const stdin = testCases.map((tc) => tc.input);
      const expected_outputs = testCases.map((tc) => tc.output);
      const submissionCode = buildSubmissionCode(code, selectedLanguage, problem);

      const res = await executeCode({
        id: problem.id,
        source_code: submissionCode,
        language_id,
        stdin,
        expected_outputs,
      });

      if (res.success) {
        toast.success("Solution submitted!");
        setExecutionResponse(res);
        setActiveTabRight("results");
        const submission = res.submission;
        if (submission) {
          setSubmissionHistory((prev) => [
            {
              id: submission.id || `run-${Date.now()}`,
              status: submission.status,
              language: submission.language || selectedLanguage,
              memory: submission.memory,
              time: submission.time,
              createdAt: submission.createdAt || new Date().toISOString(),
            },
            ...prev,
          ]);
        }
      } else {
        toast.error(res.message || "Submission failed");
      }
    } catch (error) {
      toast.error("Error submitting code");
    } finally {
      setIsSubmitting(false);
    }
  };

  //  Derived 
  const displayExamples = getExamples(problem, selectedLanguage);
  const referenceSolutions = problem?.referenceSolution as Record<string, string> | undefined;
  const currentSolution =
    referenceSolutions?.[selectedLanguage.toUpperCase()] ||
    (referenceSolutions ? referenceSolutions[Object.keys(referenceSolutions)[0]] : "") ||
    "";

  //  Loading

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

  //  Render 

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">

      {/* ── Header ── */}
      <header className="h-12 border-b bg-background flex items-center justify-between px-4 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link
            href="/problems"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <List className="h-4 w-4" />
            <span className="text-sm font-medium hidden sm:inline">Problem List</span>
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
            {isRunning ? (
              <span className="animate-spin h-3 w-3 border-2 border-current border-t-transparent rounded-full" />
            ) : (
              <Play className="h-3 w-3 fill-current" />
            )}
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

        {/* ── LEFT PANEL ── */}
        <div className="w-1/2 flex flex-col border-r bg-card/50">
          <div className="flex-1 flex flex-col min-h-0" style={{ height: "60%" }}>

            {/* Left Tabs */}
            <div className="h-10 border-b flex items-center px-2 bg-muted/20 gap-1">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-8 gap-2 text-xs font-medium rounded-t-md",
                  activeTabLeft === "description"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground"
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
                    : "text-muted-foreground"
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
                    : "text-muted-foreground"
                )}
                onClick={() => setActiveTabLeft("solutions")}
              >
                <Code2 className="h-3.5 w-3.5 text-purple-500" />
                Solutions
              </Button>
            </div>

            {/* Left Tab Content */}
            <div className="flex-1 overflow-hidden relative">

              {/* DESCRIPTION */}
              {activeTabLeft === "description" && (
                <ScrollArea className="h-full">
                  <div className="p-5 space-y-6 max-w-4xl mx-auto">
                    <div className="space-y-3">
                      <h1 className="text-2xl font-bold tracking-tight">{problem.title}</h1>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge
                          variant="secondary"
                          className={cn(
                            "rounded-md px-2 py-0.5 font-medium border-0",
                            getDifficultyColor(problem.difficulty)
                          )}
                        >
                          {problem.difficulty}
                        </Badge>
                        {problem.tags &&
                          (problem.tags as string[]).map((tag, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="text-xs text-muted-foreground rounded-md border-transparent bg-muted/50"
                            >
                              {tag}
                            </Badge>
                          ))}
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {problem.description}
                    </p>

                    {displayExamples.length > 0 && (
                      <div className="space-y-4">
                        {displayExamples.map((example, index) => (
                          <div key={index} className="space-y-2">
                            <h3 className="font-semibold text-sm">Example {index + 1}:</h3>
                            <div className="bg-muted/50 rounded-lg p-4 space-y-2 font-mono text-sm">
                              <div className="flex gap-2">
                                <span className="font-bold text-foreground">Input:</span>
                                <code className="text-muted-foreground">
                                  {formatValue(example.input || example.inputText)}
                                </code>
                              </div>
                              <div className="flex gap-2">
                                <span className="font-bold text-foreground">Output:</span>
                                <code className="text-muted-foreground">
                                  {formatValue(example.output || example.outputText)}
                                </code>
                              </div>
                              {example.explanation && (
                                <div className="flex gap-2 text-sm">
                                  <span className="font-bold text-foreground">Explanation:</span>
                                  <span className="text-muted-foreground">{example.explanation}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {problem.constraints && (
                      <div className="space-y-3 pt-2">
                        <h3 className="font-semibold text-sm">Constraints:</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground font-mono">
                          {problem.constraints.split("\n").map((constraint, i) => (
                            <li key={i}>{constraint}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {problem.hints && (
                      <div className="space-y-2 pt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-2 text-xs font-medium text-amber-500 hover:text-amber-400 hover:bg-amber-500/10 px-3"
                          onClick={() => setShowHint(!showHint)}
                        >
                          <Lightbulb className="h-3.5 w-3.5" />
                          {showHint ? "Hide Hint" : "Show Hint"}
                        </Button>
                        {showHint && (
                          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 text-sm text-amber-200">
                            {problem.hints}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </ScrollArea>
              )}

              {/* EDITORIAL */}
              {activeTabLeft === "editorial" && (
                <ScrollArea className="h-full">
                  <div className="p-5 space-y-4 max-w-4xl mx-auto">
                    <div className="space-y-1">
                      <h2 className="text-lg font-bold tracking-tight flex items-center gap-2">
                        <Beaker className="h-4 w-4 text-orange-500" />
                        Editorial
                      </h2>
                      <p className="text-xs text-muted-foreground">
                        Approach & explanation for this problem
                      </p>
                    </div>
                    {problem.editorial ? (
                      <div className="bg-muted/40 rounded-lg p-5 text-sm text-muted-foreground leading-relaxed border border-border">
                        {problem.editorial}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
                        <Beaker className="h-10 w-10 text-muted-foreground/30" />
                        <p className="text-sm text-muted-foreground">
                          No editorial available for this problem yet.
                        </p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              )}

              {/* SOLUTIONS */}
              {activeTabLeft === "solutions" && (
                <div className="flex flex-col h-full">
                  <div className="h-9 border-b flex items-center px-3 bg-muted/10 justify-between">
                    <span className="text-xs text-muted-foreground font-medium">
                      Reference Solution
                    </span>
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
                  {currentSolution ? (
                    <div className="flex-1 overflow-hidden">
                      <Editor
                        height="100%"
                        language={selectedLanguage.toLowerCase()}
                        value={currentSolution}
                        theme="vs-dark"
                        options={{
                          readOnly: true,
                          minimap: { enabled: false },
                          fontSize: 13,
                          lineNumbers: "on",
                          scrollBeyondLastLine: false,
                          automaticLayout: true,
                          tabSize: 2,
                          fontFamily: "'JetBrains Mono', monospace",
                          padding: { top: 10 },
                        }}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center flex-1 gap-3 text-center">
                      <Code2 className="h-10 w-10 text-muted-foreground/30" />
                      <p className="text-sm text-muted-foreground">
                        No reference solution available.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="h-1 bg-border hover:bg-primary/50 cursor-row-resize transition-colors" />

          {/* Submission History */}
          <div className="flex flex-col min-h-0" style={{ height: "40%" }}>
            <div className="h-10 border-b flex items-center px-3 bg-muted/20">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Clock className="h-4 w-4 text-amber-500" />
                Submission History
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full p-3">
                <SubmissionHistory submissions={submissionHistory} />
              </ScrollArea>
            </div>
          </div>
        </div>

        {/*  RIGHT PANEL  */}
        <div className="w-1/2 flex flex-col bg-background h-full">

          {/* Right Tabs Header */}
          <div className="h-10 border-b flex items-center px-2 bg-muted/20 justify-between">
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-8 gap-2 text-xs font-medium rounded-t-md",
                  activeTabRight === "code"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground"
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
                    : "text-muted-foreground"
                )}
                onClick={() => setActiveTabRight("testcase")}
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground" />
                Testcase
              </Button>
              {executionResponse && (
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-8 gap-2 text-xs font-medium",
                    activeTabRight === "results"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground"
                  )}
                  onClick={() => setActiveTabRight("results")}
                >
                  <Play className="h-3.5 w-3.5 text-amber-500" />
                  Results
                </Button>
              )}
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

          {/* Right Panel Content */}
          <div className="flex-1 overflow-hidden relative border-l">
            {activeTabRight === "code" && (
              <Editor
                height="100%"
                language={selectedLanguage.toLowerCase()}
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
            )}

            {activeTabRight === "testcase" && (
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
                            <div className="text-xs text-muted-foreground">Input:</div>
                            <div className="bg-muted/50 p-2 rounded-md font-mono text-sm whitespace-pre-wrap">
                              {formatValue(testCase.input)}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-xs text-muted-foreground">Expected Output:</div>
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

            {activeTabRight === "results" && executionResponse && (
              <ScrollArea className="h-full p-4">
                <div className="space-y-4">
                  {executionResponse.submission && (
                    <>
                      <SubmissionDetails submission={executionResponse.submission} />
                      <TestCaseTable testCases={executionResponse.submission.testCases} />
                    </>
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