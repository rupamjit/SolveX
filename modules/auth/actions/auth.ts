"use server";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const onBoardUser = async () => {
  try {
    const user = await currentUser();

    if (!user) {
    //   console.log("No authenticated user found");
      return { success: false, error: "No Authenticated User Found" };
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
      success: true,
      user: newUser,
      message: "User Onboarded Successfully!!!",
    };
  } catch (error) {
    console.error("Error onboarding user:", error);
    return { success: false, message: "Internal Server Error" };
  }
};

export const getCurrentUserRole = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return null;
    }

    const { id } = user;
    const userRole = await prisma.user.findFirst({
      where: {
        clerkId: id,
      },
      select: {
        role: true,
      },
    });

    return userRole?.role ?? null;
  } catch (error) {
    console.error("Error fetching user role:", error);
    return null;
  }
};

export const getCurrentUserData = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        success: false,
        error: "No Authenticated User Found",
      };
    }
    const { id } = user;
    const userData = await prisma.user.findFirst({
      where: {
        clerkId: id,
      },
    });
    return {
      success: true,
      user: userData,
    };
  } catch (error) {
    return {
      success: false,
      error: "Internal Server Error",
    }
  }
}