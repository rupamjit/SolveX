import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// Create Playlist
export const POST = async (req: NextRequest) => {
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

    const { name, description } = await req.json();

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Name is required" },
        { status: 400 },
      );
    }

    const playlist = await prisma.playlist.create({
      data: {
        name,
        description,
        userId: dbUser.id,
      },
    });

    return NextResponse.json({
      success: true,
      playlist,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create playlist" },
      { status: 500 },
    );
  }
};

// Get All Playlists of User
export const GET = async (req: NextRequest) => {
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

    const playlists = await prisma.playlist.findMany({
      where: {
        userId: user.id,
      },
      include: {
        problems: {
          include: {
            problem: {
              select: {
                id: true,
                title: true,
                difficulty: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      playlists,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to get all playlist" },
      { status: 500 },
    );
  }
};
