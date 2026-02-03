import ProfileStats from "@/components/profile/ProfileStats";
import UserInfoCard from "@/components/profile/UserInfo";
import { Button } from "@/components/ui/button";
import { getCurrentUserData } from "@/modules/profile/actions/profile";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

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
    <div className="min-h-screen py-32">
      <div className="container mx-auto px-4 max-w-7xl">
         <Link href={"/"} className="flex items-start p-3">
            <Button size={"icon-lg"} className="cursor-pointer px-2">
              <ArrowLeft/>
            </Button>
        </Link>
        <UserInfoCard userData={user} />
          <ProfileStats
          submissions={user.submissions}
          solvedCount={user.problemSolved.length}
          playlistCount={user.playlists.length}
        />
      </div>
    </div>
  );
};

export default page;
