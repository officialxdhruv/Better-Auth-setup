"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function getUserProfileById(userId: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                image: true,
                bio: true,
                location: true,
                website: true,
                createdAt: true,
                _count: {
                    select: {
                        followers: true,
                        following: true,
                        questions: true,
                        answers: true,
                    },
                },
            },
        });
        return user;
    } catch (error) {
        console.error("Error fetching profile : ", error);
        return null;
    }
}

export async function isFollowing(userId: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user) return false;

    try {
        const follow = await prisma.follows.findUnique({
            where: {
                followerId_followingId: {
                    followerId: session.user.id,
                    followingId: userId,
                },
            },
        });

        return !!follow;
    } catch (error) {
        console.error("Error checking follow status:", error);
        return false;
    }
}

export async function updateProfile(formData: FormData) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });
        const userId = session?.user?.id;

        if (!userId) return { success: false, message: "Not authenticated" };

        const name = formData.get("name") as string;
        const bio = formData.get("bio") as string;
        const username = formData.get("username") as string;
        const location = formData.get("location") as string;
        const website = formData.get("website") as string;
        const user = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                name,
                username,
                bio,
                location,
                website,
            },
        });

        revalidatePath("/users");
        return { success: true, user };
    } catch (error) {
        console.error("Error updating profile:", error);
        return { success: false, error: "Failed to update profile" };
    }
}

export async function toggleFollow(targetUserId: string) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });
        if (!session?.user) return { error: "unauthorized user" };

        const user = session?.user;
        if (user?.id === targetUserId)
            throw new Error("You cannot follow yourself");

        const existingFollow = await prisma.follows.findUnique({
            where: {
                followerId_followingId: {
                    followerId: user?.id as string,
                    followingId: targetUserId,
                },
            },
        });

        if (existingFollow) {
            //unfollow
            await prisma.follows.delete({
                where: {
                    followerId_followingId: {
                        followerId: user?.id as string,
                        followingId: targetUserId,
                    },
                },
            });
        } else {
            //follow
            await prisma.follows.create({
                data: {
                    followerId: user?.id as string,
                    followingId: targetUserId,
                },
            });
        }
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.log("Error in toggleFollow", error);
        return { success: false, error: "Error toggling follow" };
    }
}

export async function getFollowDataByUserId(userId: string) {
    try {
        const [followers, following] = await Promise.all([
            prisma.follows.findMany({
                where: { followingId: userId },
                include: { follower: true },
            }),
            prisma.follows.findMany({
                where: { followerId: userId },
                include: { following: true },
            }),
        ]);

        return {
            followers: followers.map((f) => f.follower),
            following: following.map((f) => f.following),
        };
    } catch (error) {
        console.error("Error fetching follow data:", error);
        throw new Error("Failed to get follow data");
    }
}
