"use server";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const onBoardUser = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      console.log("No authenticated user found");
      return { sucess: false, error: "No Authenticated User Found" };
    }
    const { id, firstName, lastName, emailAddresses, imageUrl } = user;

    const newUser = await prisma.user.upsert({
      where: {
        clerkId: id,
      },
      update: {
        firstName,
        lastName,
        imageUrl,
        email: emailAddresses[0].emailAddress,
      },
      create: {
        clerkId: id,
        firstName,
        lastName,
        imageUrl,
        email: emailAddresses[0].emailAddress,
      },
    });

    return {
      sucess: true,
      user: newUser,
      message: "User Onboared Successfully!!!",
    };
  } catch (error) {
    console.error("Error onboarding user:", error);
    return { sucess: false, message: "Internal Server Error" };
  }
};
