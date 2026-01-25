"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

// Get all problems
export const getAllProblems = async () => {
  try {
    const user = await currentUser();
    const data = await prisma.user.findFirst({
      where: {
        clerkId: user?.id,
      },
      select: {
        id: true,
      },
    });

    const problems = await prisma.problem.findMany({
      include: {
        problemSolved: {
          where: {
            userId: data?.id,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, data: problems };
  } catch (error) {
    return { success: false, message: "Internal Server Error" };
  }
};

// get a single problem by id
export const getProblemById = async (id: string) => {
  try {
    const problem = await prisma.problem.findFirst({
      where: {
        id,
      },
    });
    return { success: true, data: problem };
  } catch (error) {
    return { success: false, message: "Internal Server Error" };
  }
};
