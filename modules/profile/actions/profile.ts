"use server"

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";


export const getCurrentUserData = async () => {
    try {
        const user = await currentUser();
        const data = await prisma.user.findFirst({
            where:{
                clerkId:user?.id
            },
            include:{
                submissions: {
                    include: {
                        problem: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                },
                problemSolved: {
                    include: {
                        problem: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                },
                playlists: {
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        })
        return { success: true, data };
    } catch (error) {
        return { success: false, error: "Failed to fetch user" };
    }
}