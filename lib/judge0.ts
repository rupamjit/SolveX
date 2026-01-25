import axios from "axios";
export function getJudge0LanguageId(language: string) {
  const languageMap: Record<string, number> = {
    PYTHON: 71,
    JAVASCRIPT: 63,
    JAVA: 62,

  };
  return languageMap[language.toUpperCase()];
}

export function getLanguageName(languageId: number) {
  const LANGUAGE_NAMES: Record<number, string> = {
    74: "TypeScript",
    63: "JavaScript",
    71: "Python",
  };
  return LANGUAGE_NAMES[languageId] || "Unknown";
}

type SubmissionType = {
  source_code: string;
  language_id: number;
  stdin: string;
  expected_output: string;
};

export type Judge0Result = {
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  status: {
    id: number;
    description: string;
  };
  memory: number | null;
  time: string | null;
};

export const submitBatch = async (submissions: SubmissionType[]): Promise<{ token: string }[]> => {
  const { data } = await axios.post(
    `https://judge0-ce.p.rapidapi.com/submissions/batch?base64_encoded=false`,
    { submissions },
    {
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
        "Content-Type": "application/json",
      },
    }
  );
  console.log("Batch submission response:", data);
  return data;
};

export const pollBatchResults = async (tokens: string[]): Promise<Judge0Result[]> => {
  // Helper to wait
  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  while (true) {
    const { data } = await axios.get(
      `https://judge0-ce.p.rapidapi.com/submissions/batch?tokens=${tokens.join(",")}&base64_encoded=false`,
      {
        headers: {
          "x-rapidapi-key": process.env.RAPIDAPI_KEY,
          "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
          "Content-Type": "application/json",
        },
      }
    );

    const results = data.submissions;
    console.log("Polling results status...");

    const isAllDone = results.every(
      (r: any) => r.status.id !== 1 && r.status.id !== 2
    );

    if (isAllDone) {
      console.log("All submissions finished!");
      return results;
    }

    await sleep(1000);
  }
};
