import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface TestCase {
  id: string | number;
  passed: boolean;
  memory: string;
  time: string;
  stdout: string;
  stderr?: string | null;
  expected: string;
}

interface TestCaseTableProps {
  testCases: TestCase[];
}

export const TestCaseTable = ({ testCases }: TestCaseTableProps) => {
  return (
    <div className="w-full rounded-lg border">
      <Table>
        <TableCaption>Test Case Results</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Case #</TableHead>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead>Memory</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Result</TableHead>
            <TableHead>Expected</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {testCases.map((testCase, index) => (
            <TableRow key={testCase.id}>
              <TableCell className="font-medium">Test {index + 1}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {testCase.passed ? (
                    <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 shadow-none border-0">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Passed
                    </Badge>
                  ) : (
                    <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20 shadow-none border-0">
                      <XCircle className="mr-1 h-3 w-3" />
                      Failed
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {testCase.memory}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {testCase.time}
              </TableCell>
              <TableCell className="max-w-[200px] font-mono text-sm">
                {testCase.stderr ? (
                  <div className="text-red-500 flex items-start gap-1">
                    <AlertCircle className="h-3 w-3 mt-1 shrink-0" />
                    <span className="whitespace-pre-wrap wrap-break-word">
                      {testCase.stderr}
                    </span>
                  </div>
                ) : (
                  <span className="whitespace-pre-wrap wrap-break-word text-foreground">
                    {testCase.stdout}
                  </span>
                )}
              </TableCell>
              <TableCell className="max-w-[200px] font-mono text-sm whitespace-pre-wrap wrap-break-word text-muted-foreground">
                {testCase.expected}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
