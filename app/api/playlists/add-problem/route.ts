import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const POST = async (req: NextRequest) => {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const dbUser = await prisma.user.findFirst({
      where: { clerkId: user.id },
    });

    if (!dbUser) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 },
      );
    }

    const { problemId, playlistId } = await req.json();

    if (!problemId || !playlistId) {
      return NextResponse.json(
        { success: false, error: "Problem ID and playlist ID are required" },
        { status: 400 },
      );
    }

    const playlist = await prisma.playlist.findFirst({
      where: {
        id: playlistId,
        userId: dbUser.id,
      },
    });

    if (!playlist) {
      return NextResponse.json(
        { success: false, error: "Playlist not found or unauthorized" },
        { status: 404 },
      );
    }

    const problemInPlaylist = await prisma.problemPlaylist.create({
      data: {
        problemId,
        playlistId,
      },
    });

    return NextResponse.json({
      success: true,
      data: problemInPlaylist,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to add problem to playlist" },
      { status: 500 },
    );
  }
};
