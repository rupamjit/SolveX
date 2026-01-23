import {
  getJudge0LanguageId,
  pollBatchResults,
  submitBatch,
} from "@/lib/judge0";
import prisma from "@/lib/prisma";
import { getCurrentUserData } from "@/modules/auth/actions/auth";
import { UserRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const userData = await getCurrentUserData();
    if (!userData.success || !userData.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = userData.user;

    if (user.role !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    const {
      title,
      description,
      difficulty,
      tags,
      examples,
      constraints,
      hints,
      editorial,
      testCases,
      codeSnippets,
      referenceSolution,
    } = body;

    if (
      !title ||
      !description ||
      !difficulty ||
      !testCases ||
      !codeSnippets ||
      !referenceSolution
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (!Array.isArray(testCases) || testCases.length === 0) {
      return NextResponse.json(
        { error: "At least one test case is required" },
        { status: 400 },
      );
    }

    if (!referenceSolution || typeof referenceSolution !== "object") {
      return NextResponse.json(
        {
          error:
            "Reference solutions must be provided for all supported languages",
        },
        { status: 400 },
      );
    }

    for (const [language, solutionCode] of Object.entries(
      referenceSolution as Record<string, string>,
    )) {
      const languageId = getJudge0LanguageId(language);

      if (!languageId) {
        return NextResponse.json(
          { error: `Unsupported Language ${language}` },
          { status: 400 },
        );
      }
      const submissions = (
        testCases as { input: string; output: string }[]
      ).map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));

      const submissionResults = await submitBatch(submissions);

      const tokens = submissionResults.map((result) => result.token);

      const results = await pollBatchResults(tokens);

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        console.log(`Test case ${i + 1} details:`, {
          input: submissions[i].stdin,
          expectedOutput: submissions[i].expected_output,
          actualOutput: result.stdout,
          status: result.status,
          language: language,
          error: result.stderr || result.compile_output,
        });

        if (result.status.id !== 3) {
          return NextResponse.json(
            {
              error: `Validation failed for ${language}`,
              testCase: {
                input: submissions[i].stdin,
                expectedOutput: submissions[i].expected_output,
                actualOutput: result.stdout,
                error: result.stderr || result.compile_output,
              },
              details: result,
            },
            { status: 400 },
          );
        }
      }
    }

    const newProblem = await prisma.problem.create({
      data: {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testCases,
        codeSnippets,
        referenceSolution,
        userId: user.id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Problem created successfully",
        data: newProblem,
      },
      { status: 201 },
    );
  } catch (error) {
    NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
