"use server";

import { getLanguageName, pollBatchResults, submitBatch } from "@/lib/judge0";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

// Get all problems
export const getAllProblems = async () => {
  try {
    const user = await currentUser();
    const data = await prisma.user.findFirst({
      where: {
        clerkId: user?.id,
      },
      select: {
        id: true,
      },
    });

    const problems = await prisma.problem.findMany({
      include: {
        problemSolved: {
          where: {
            userId: data?.id,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, data: problems };
  } catch (error) {
    return { success: false, message: "Internal Server Error" };
  }
};

// get a single problem by id
export const getProblemById = async (id: string) => {
  try {
    const problem = await prisma.problem.findFirst({
      where: {
        id,
      },
    });
    return { success: true, data: problem };
  } catch (error) {
    return { success: false, message: "Internal Server Error" };
  }
};
// execute code code 
export const executeCode = async ({
  id,
  stdin,
  expected_outputs,
  source_code,
  language_id,
}: {
  id: string;
  stdin: string[];
  expected_outputs: string[];
  source_code: string;
  language_id: number;
}) => {
  try {
    console.log("executeCode called with:", { id, language_id, stdinLength: stdin.length });
    
    const user = await currentUser();
    console.log("Current user:", user?.id);

    if (!user) {
      return { success: false, message: "User not authenticated" };
    }

    const dbUser = await prisma.user.findUnique({
        where: { clerkId: user?.id }
    });

    console.log("DB User:", dbUser?.id);

    if (!dbUser) {
      return { success: false, message: "User not found in database" };
    }

     if (
      !Array.isArray(stdin) ||
      stdin.length === 0 ||
      !Array.isArray(expected_outputs) ||
      expected_outputs.length !== stdin.length
    ) {
      return { success: false, message: "Invalid test cases" };
    }

    console.log("Preparing submissions...");
    
    const submissions = stdin.map((input, index) => ({
      source_code,
      language_id,
      stdin: input,
      expected_output: expected_outputs[index],
    }));

    console.log("Submitting batch to Judge0...");
    const submitResponse = await submitBatch(submissions);
    console.log("Submit response:", submitResponse);
    
    const tokens = submitResponse.map((res) => res.token);
    console.log("Tokens:", tokens);

    console.log("Polling for results...");
    const results = await pollBatchResults(tokens);
    console.log("Results:", results);

    let allPassed = true;
    const detailedResults = results.map((result, i) => {
      const stdout = result.stdout?.trim() || null;
      const expected_output = expected_outputs[i]?.trim();
      const passed = stdout === expected_output;

      if (!passed) allPassed = false;

      return {
        testCase: i + 1,
        passed,
        stdout,
        expected: expected_output,
        stderr: result.stderr || null,
        compile_output: result.compile_output || null,
        status: result.status.description,
        memory: result.memory ? `${result.memory} KB` : undefined,
        time: result.time ? `${result.time} s` : undefined,
      };
    });

    console.log("Creating submission in database...");
    const submission = await prisma.submission.create({
      data: {
        userId: dbUser.id,
        problemId: id,
        sourceCode: source_code,
        language: getLanguageName(language_id),
        stdin: stdin.join('\n'),
        stdout: JSON.stringify(detailedResults.map((r) => r.stdout)),
        stderr: detailedResults.some((r) => r.stderr)
          ? JSON.stringify(detailedResults.map((r) => r.stderr))
          : null,
        compileOutput: detailedResults.some((r) => r.compile_output)
          ? JSON.stringify(detailedResults.map((r) => r.compile_output))
          : null,
        status: allPassed ? 'Accepted' : 'Wrong Answer',
        memory: detailedResults.some((r) => r.memory)
          ? JSON.stringify(detailedResults.map((r) => r.memory))
          : null,
        time: detailedResults.some((r) => r.time)
          ? JSON.stringify(detailedResults.map((r) => r.time))
          : null,
      },
    });
    
    console.log("Submission created:", submission.id);
    
    if (allPassed) {
      const existingSolved = await prisma.problemSolved.findFirst({
        where: {
          userId: dbUser.id,
          problemId: id,
        },
      });
      
      if (!existingSolved) {
        await prisma.problemSolved.create({
          data: {
            userId: dbUser.id,
            problemId: id,
          },
        });
      }
    }

    const testCaseResults = detailedResults.map((result) => ({
      submissionId: submission.id,
      testCase: result.testCase,
      passed: result.passed,
      stdout: result.stdout,
      expected: result.expected,
      stderr: result.stderr,
      compileOutput: result.compile_output,
      status: result.status,
      memory: result.memory,
      time: result.time,
    }));

    await prisma.testCaseResult.createMany({ data: testCaseResults });

    const submissionWithTestCases = await prisma.submission.findUnique({
      where: { id: submission.id },
      include: { testCases: true },
    });

    console.log("Returning success with submission:", submissionWithTestCases?.id);
    return { success: true, submission: submissionWithTestCases };

  } catch (error) {
    console.error("executeCode error:", error);
    return { success: false, message: error instanceof Error ? error.message : "Internal Server Error" };
  }
}