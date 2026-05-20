"use server"

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";


export const getCurrentUserData = async () => {
    try {
        const user = await currentUser();
        if (!user) {
            return { success: false, error: "Not logged in" };
        }

        let data = await prisma.user.findFirst({
            where:{
                clerkId:user.id
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
        });

        if (!data) {
            const { id, firstName, lastName, emailAddresses, imageUrl } = user;
            data = await prisma.user.upsert({
                where: {
                    clerkId: id,
                },
                update: {
                    firstName,
                    lastName,
                    imageUrl,
                    email: emailAddresses[0]?.emailAddress,
                },
                create: {
                    clerkId: id,
                    firstName,
                    lastName,
                    imageUrl,
                    email: emailAddresses[0]?.emailAddress,
                },
                include: {
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
            });
        }

        return { success: true, data };
    } catch (error) {
        return { success: false, error: "Failed to fetch user" };
    }
}