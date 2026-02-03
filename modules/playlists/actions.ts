"use server"

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const createPlaylist = async (name: string, description: string) => {
    try {
        const user = await currentUser();
        if (!user) {
            return { success: false, error: "Unauthorized" };
        }

        const dbUser = await prisma.user.findFirst({
            where: { clerkId: user.id }
        });

        if (!dbUser) {
            return { success: false, error: "User not found" };
        }

        const existing = await prisma.playlist.findFirst({
            where: {
                userId: dbUser.id,
                name: name
            }
        });

        if (existing) {
            return { success: false, error: "A playlist with this name already exists" };
        }

        const playlist = await prisma.playlist.create({
            data: {
                name,
                description,
                userId: dbUser.id
            }
        });

        revalidatePath("/profile");
        return { success: true, data: playlist };

    } catch (error) {
        console.error("Create playlist error:", error);
        return { success: false, error: "Failed to create playlist" };
    }
}

export const deletePlaylist = async (playlistId: string) => {
    try {
         const user = await currentUser();
        if (!user) {
            return { success: false, error: "Unauthorized" };
        }

        const dbUser = await prisma.user.findFirst({
            where: { clerkId: user.id }
        });

        if (!dbUser) {
            return { success: false, error: "User not found" };
        }

        await prisma.playlist.delete({
            where: {
                id: playlistId,
                userId: dbUser.id 
            }
        });

        revalidatePath("/profile");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to delete playlist" };
    }
}

export const getPlaylistById = async (playlistId: string) => {
    try {
        const playlist = await prisma.playlist.findFirst({
            where: {
                id: playlistId
            },
            include: {
                user: true,
                problems: {
                    include: {
                        problem: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        });

        if (!playlist) {
            return { success: false, error: "Playlist not found" };
        }

        return { success: true, data: playlist };
    } catch (error) {
        console.error("Get playlist error:", error);
        return { success: false, error: "Failed to fetch playlist" };
    }
}
