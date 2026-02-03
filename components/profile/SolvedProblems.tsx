
import React from 'react';
import Link from 'next/link';
import { Trophy, Calendar, ArrowUpRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type SolvedProblem = {
  id: string;
  problemId: string;
  createdAt: string | Date;
  problem: {
    id: string;
    title: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
  };
};

interface SolvedProblemsProps {
  solvedProblems: SolvedProblem[];
}

const SolvedProblems = ({ solvedProblems }: SolvedProblemsProps) => {
  const formatDate = (dateString: string | Date) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'EASY':
        return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20';
      case 'MEDIUM':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20 hover:bg-amber-500/20';
      case 'HARD':
        return 'bg-rose-500/10 text-rose-500 border-rose-500/20 hover:bg-rose-500/20';
      default:
        return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    }
  };

  if (solvedProblems.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
            <Trophy className="w-6 h-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-1">No Problems Solved Yet</h3>
          <p className="text-sm text-muted-foreground mb-4">Start your journey by solving your first problem.</p>
          <Link href="/problems">
            <Button variant="outline">Browse Problems</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Solved Problems</h2>
        <Badge variant="outline" className="font-mono">
          {solvedProblems.length} Solved
        </Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {solvedProblems.map(({ id, problem, createdAt }) => (
          <Link href={`/problem/${problem.id}`} key={id} className="group block h-full">
            <Card className="h-full border-muted hover:border-border transition-all duration-300 hover:shadow-md hover:-translate-y-1 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-5 flex flex-col h-full">
                <div className="flex justify-between items-start gap-4 mb-3">
                  <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getDifficultyColor(problem.difficulty)}`}>
                    {problem.difficulty}
                  </div>
                   <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <h3 className="font-semibold text-lg leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {problem.title}
                </h3>
                
                <div className="mt-auto pt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Solved {formatDate(createdAt)}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SolvedProblems;