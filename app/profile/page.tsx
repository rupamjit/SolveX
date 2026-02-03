import UserInfoCard from "@/components/profile/UserInfo";
import { getCurrentUserData } from "@/modules/auth/actions/auth";
import React from "react";

const page = async () => {
  const profileData = await getCurrentUserData();

  if (!profileData.success || !profileData.user) {
    return (
      <div className="min-h-screen py-32 flex justify-center text-red-500">
        <p>Failed to load user data. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-32">
      <div className="container mx-auto px-4 max-w-7xl">
        <UserInfoCard userData={profileData.user} />
      </div>
    </div>
  );
};

export default page;
