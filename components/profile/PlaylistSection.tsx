
import React from 'react';
import Link from 'next/link';
import { List, Calendar, FileText, ChevronRight, Layers } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Playlist {
  id: string;
  name: string;
  description: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  problems?: any[]; // Since we updated the query, this should be available
}

interface PlaylistSectionProps {
  playlists: Playlist[];
}

const PlaylistsSection = ({ playlists }: PlaylistSectionProps) => {
  const formatDate = (dateString: string | Date) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (playlists.length === 0) {
    return (
      <Card className="border-dashed bg-muted/20">
        <CardContent className="flex flex-col items-center justify-center py-10 text-center">
            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center mb-3">
                 <List className="w-5 h-5 text-muted-foreground" />
            </div>
          <h3 className="text-base font-medium mb-1">No Playlists</h3>
          <p className="text-xs text-muted-foreground mb-3">Organize problems into collections.</p>
          <Button variant="outline" size="sm">Create Playlist</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Your Playlists</h2>
        <Button variant="ghost" size="sm" className="hidden sm:flex text-muted-foreground hover:text-primary">
            View All
        </Button>
      </div>
      
      <div className="grid gap-3">
        {playlists.map((playlist) => (
          <Link href={`/playlist/${playlist.id}`} key={playlist.id} className="group block">
            <Card className="hover:border-primary/50 transition-all duration-300 hover:shadow-sm">
                <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                        <Layers className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
                            {playlist.name}
                        </h3>
                         <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                            <span className="flex items-center gap-1">
                                <List className="w-3 h-3" />
                                {playlist.problems?.length || 0} Problems
                            </span>
                            <span>•</span>
                            <span>{formatDate(playlist.updatedAt)}</span>
                        </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300" />
                </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PlaylistsSection;