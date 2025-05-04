"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

/**
 * Fetches an existing vote by the user on a answer.
 */
async function findVote(userId: string, answerId: string) {
    return prisma.answerVote.findUnique({
        where: {
            userId_answerId: {
                userId,
                answerId,
            },
        },
    });
}

/**
 * Checks if the current user has voted on the given answer.
 */
export async function existingVote(answerId: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        return { success: false, message: "Unauthorized user" };
    }

    const userId = session.user.id;

    try {
        const vote = await findVote(userId, answerId);
        return { success: true, vote };
    } catch (error) {
        console.error("Error checking vote:", error);
        return { success: false, message: "Something went wrong" };
    }
}

/**
 * Casts, toggles, or updates a vote on a question.
 */
export async function voteOnAnswer(answerId: string, value: 1 | -1) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        return { success: false, message: "Unauthorized user" };
    }

    const userId = session.user.id;

    try {
        const existingVote = await findVote(userId, answerId);

        if (existingVote) {
            if (existingVote.value === value) {
                // Same vote clicked again — remove vote (toggle off)
                await prisma.answerVote.delete({
                    where: {
                        userId_answerId: {
                            userId,
                            answerId,
                        },
                    },
                });
                return { success: true, message: "Vote removed" };
            } else {
                // Change vote
                await prisma.answerVote.update({
                    where: {
                        userId_answerId: {
                            userId,
                            answerId,
                        },
                    },
                    data: {
                        value,
                    },
                });
                return { success: true, message: "Vote updated" };
            }
        } else {
            // New vote
            await prisma.answerVote.create({
                data: {
                    userId,
                    answerId,
                    value,
                },
            });
            return { success: true, message: "Vote added" };
        }
    } catch (error) {
        console.error("Error voting on answer:", error);
        return { success: false, message: "Failed to vote" };
    }
}

/**
 * Calculates the total vote score for a question.
 * @returns The total vote score (sum of upvotes and downvotes).
 */
export async function countTotalVotes(answerId: string): Promise<number> {
    try {
        const result = await prisma.answerVote.aggregate({
            where: { answerId },
            _sum: {
                value: true,
            },
        });

        return result._sum.value ?? 0;
    } catch (error) {
        console.error("Error counting votes:", error);
        return 0;
    }
}
