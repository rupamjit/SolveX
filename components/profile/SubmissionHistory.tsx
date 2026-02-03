
import React from 'react';
import Link from 'next/link';
import { Code, Clock, MemoryStick as Memory, CheckCircle, XCircle, AlertCircle, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';

interface Submission {
  id: string;
  status: string;
  language: string;
  createdAt: string | Date;
  time: string | null;
  memory: string | null;
  sourceCode: any;
  problem: {
    id: string;
    title: string;
  };
}

interface SubmissionHistoryProps {
  submissions: Submission[];
}

const SubmissionsHistory = ({ submissions }: SubmissionHistoryProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Accepted':
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'Wrong Answer':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-amber-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted':
        return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      case 'Wrong Answer':
        return 'text-red-500 bg-red-500/10 border-red-500/20';
      default:
        return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
    }
  };

  const formatDate = (dateString: string | Date) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const parseMetrics = (metricString: string | null) => {
    if (!metricString) return '-';
    try {
       if (metricString.startsWith('[')) {
          const parsed = JSON.parse(metricString);
          return Array.isArray(parsed) ? parsed[0] : metricString;
       }
       return metricString;
    } catch {
      return metricString;
    }
  };

  if (submissions.length === 0) {
      return (
        <Card className="border-dashed">
            <CardContent className="py-8 text-center text-muted-foreground">
                No submissions yet.
            </CardContent>
        </Card>
      )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Recent Submissions</h2>
      </div>

      <div className="space-y-3">
        {submissions.map((submission) => (
          <Collapsible key={submission.id} className="group">
             <div className="flex flex-col bg-card border rounded-lg hover:shadow-sm transition-all overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center p-4 gap-4">
                    {/* Status Icon & Info */}
                    <div className="flex items-start gap-3 min-w-[200px]">
                        <div className={`mt-1 p-1 rounded-full ${submission.status === 'Accepted' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                             {getStatusIcon(submission.status)}
                        </div>
                        <div>
                             <h4 className="font-medium text-sm text-foreground">{submission.status}</h4>
                             <p className="text-xs text-muted-foreground">{formatDate(submission.createdAt)}</p>
                        </div>
                    </div>

                    {/* Problem Name */}
                    <Link href={`/problem/${submission.problem.id}`} className="flex-1 group/link">
                        <div className="flex items-center gap-2 hover:text-primary transition-colors">
                            <span className="font-semibold text-sm">{submission.problem.title}</span>
                            <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                        </div>
                    </Link>

                    {/* Metrics */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground min-w-[150px]">
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{parseMetrics(submission.time)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Memory className="w-3.5 h-3.5" />
                            <span>{parseMetrics(submission.memory)}</span>
                        </div>
                         <div className="flex items-center gap-1.5">
                            <Code className="w-3.5 h-3.5" />
                            <span className="uppercase">{submission.language}</span>
                        </div>
                    </div>

                     {/* Trigger */}
                    <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors ml-auto sm:ml-0">
                        View Source Code
                        <ChevronDown className="w-4 h-4 transition-transform group-data-[state=open]:rotate-180" />
                    </CollapsibleTrigger>
                </div>

                <CollapsibleContent>
                    <div className="border-t bg-muted/30 p-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-semibold text-muted-foreground">Source Code ({submission.language})</span>
                        </div>
                         <pre className="text-xs font-mono bg-muted p-3 rounded border overflow-x-auto">
                            <code>{typeof submission.sourceCode === 'string' ? submission.sourceCode : JSON.stringify(submission.sourceCode, null, 2)}</code>
                        </pre>
                    </div>
                </CollapsibleContent>
             </div>
          </Collapsible>
        ))}
      </div>
    </div>
  );
};

export default SubmissionsHistory;