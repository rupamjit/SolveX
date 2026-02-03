
import React from 'react';
import { getPlaylistById } from "@/modules/playlists/actions";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Calendar, FileText, Layers, Trophy, CheckCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PlaylistPageProps {
  params: {
    playlistId: string;
  };
}

const PlaylistPage = async ({ params }: PlaylistPageProps) => {
  const result = await getPlaylistById(params.playlistId);

  if (!result.success || !result.data) {
    notFound();
  }

  const playlist = result.data;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'EASY':
        return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'MEDIUM':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'HARD':
        return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
      default:
        return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    }
  };

  const formatDate = (dateString: Date) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w-[50%] h-[50%] rounded-full bg-blue-500/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="relative z-10 py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-5xl">
            {/* Back Button */}
            <Link href="/profile" className="inline-flex mb-8">
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground transition-colors pl-0 hover:bg-transparent">
                <ArrowLeft className="w-4 h-4" />
                Back to Profile
              </Button>
            </Link>

            {/* Header */}
            <div className="flex flex-col md:flex-row gap-8 items-start mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white shrink-0">
                    <Layers className="w-12 h-12" />
                </div>
                
                <div className="flex-1 space-y-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <Badge variant="secondary" className="rounded-full px-3">Playlist</Badge>
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                {formatDate(playlist.createdAt)}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">{playlist.name}</h1>
                        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                            {playlist.description || "No description provided for this collection."}
                        </p>
                    </div>

                    <div className="flex items-center gap-4 pt-2">
                         <div className="flex items-center gap-2 text-sm text-foreground/80 font-medium bg-muted/50 px-3 py-1.5 rounded-full">
                            <Avatar className="w-5 h-5">
                                <AvatarImage src={playlist.user.imageUrl || ""} />
                                <AvatarFallback>{playlist.user.firstName?.[0] || "U"}</AvatarFallback>
                            </Avatar>
                            Created by {playlist.user.firstName} {playlist.user.lastName}
                         </div>
                         <div className="text-sm text-muted-foreground">
                            • {playlist.problems.length} problems
                         </div>
                    </div>
                </div>
            </div>

            {/* Content list */}
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                <h2 className="text-xl font-semibold tracking-tight mb-6 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Problems in this Playlist
                </h2>

                {playlist.problems.length === 0 ? (
                    <Card className="border-dashed bg-muted/20">
                         <CardContent className="py-16 flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                                <Trophy className="w-8 h-8 text-muted-foreground/50" />
                            </div>
                            <h3 className="text-lg font-medium mb-1">It's a bit empty here</h3>
                            <p className="text-muted-foreground">This playlist doesn't have any problems yet.</p>
                         </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-3">
                        {playlist.problems.map((item, index) => (
                             <Link href={`/problem/${item.problem.id}`} key={item.id} className="group block">
                                <Card className="hover:border-primary/50 transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5">
                                    <CardContent className="p-5 flex items-center gap-4">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground font-mono text-sm group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                            {index + 1}
                                        </div>
                                        
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3">
                                                <h3 className="font-semibold text-lg truncate group-hover:text-primary transition-colors">
                                                    {item.problem.title}
                                                </h3>
                                                <Badge variant="outline" className={`text-[10px] font-bold border ${getDifficultyColor(item.problem.difficulty)}`}>
                                                    {item.problem.difficulty}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                                                 <span className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    Added {formatDate(item.createdAt)}
                                                 </span>
                                            </div>
                                        </div>

                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button size="sm" variant="ghost">Solve Problem</Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistPage;
