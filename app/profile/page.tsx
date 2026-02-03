
import ProfileStats from "@/components/profile/ProfileStats";
import SubmissionsHistory from "@/components/profile/SubmissionHistory";
import UserInfoCard from "@/components/profile/UserInfo";
import { Button } from "@/components/ui/button";
import { getCurrentUserData } from "@/modules/profile/actions/profile";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import SolvedProblems from "@/components/profile/SolvedProblems";
import PlaylistsSection from "@/components/profile/PlaylistSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreatePlaylistDialog from "@/components/profile/CreatePlaylistDialog";

const page = async () => {
  const result = await getCurrentUserData();

  if (!result.success || !result.data) {
    return (
      <div className="min-h-screen py-32 flex justify-center text-red-500">
        <p>Failed to load user data. Please try again later.</p>
      </div>
    );
  }

  const user = result.data;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-purple-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10 py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-6xl space-y-8">
          <div className="flex items-center gap-2">
            <Link href="/" className="inline-flex">
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground transition-colors pl-0 hover:bg-transparent">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <UserInfoCard userData={user} />
             <ProfileStats
              submissions={user.submissions}
              solvedCount={user.problemSolved.length}
              playlistCount={user.playlists.length}
            />
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
            <Tabs defaultValue="submissions" className="space-y-6">
              <div className="flex items-center justify-between">
                <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                  <TabsTrigger value="submissions">Submissions</TabsTrigger>
                  <TabsTrigger value="solved">Solved Problems</TabsTrigger>
                  <TabsTrigger value="playlists">Playlists</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="submissions" className="outline-none focus-visible:none">
                <SubmissionsHistory submissions={user.submissions} />
              </TabsContent>
              
              <TabsContent value="solved" className="outline-none focus-visible:none">
                 <SolvedProblems solvedProblems={user.problemSolved} />
              </TabsContent>

              <TabsContent value="playlists" className="outline-none focus-visible:none">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="col-span-1 md:col-span-2 lg:col-span-3">
                         <PlaylistsSection playlists={user.playlists} />
                    </div>
                    
                    <div className="col-span-1 md:col-span-2 lg:col-span-3">
                       <div className="mt-4 p-6 rounded-xl bg-linear-to-br from-primary/5 to-transparent border border-primary/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                           <div>
                               <h3 className="font-semibold text-lg">Keep organizing!</h3>
                               <p className="text-sm text-muted-foreground">Create playlists to group related problems.</p>
                           </div>
                           <CreatePlaylistDialog />
                       </div>
                    </div>
                 </div> 
              </TabsContent>
            </Tabs>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default page;
