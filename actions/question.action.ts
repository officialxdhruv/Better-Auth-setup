"use server";

import { auth } from "@/lib/auth";
import { Question } from "@/lib/generated/prisma";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export async function createQuestion(
    title: string,
    content: string,
    tags: string[]
) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user) return { error: "unauthorized user" };
    const userId = session.user.id;

    // Create excerpt: first 200 characters (trimmed)
    const excerpt =
        content.length > 200
            ? content.substring(0, 200).trim()
            : content.trim();

    try {
        const question = await prisma.question.create({
            data: {
                title,
                authorId: userId,
                content,
                excerpt,
                tags,
            },
        });
        return { success: true, question };
    } catch (error) {
        return { success: false, error: "Failed to create Question" };
    }
}

export async function getQuestions({ page = 1, pageSize = 10 } = {}) {
    const skip = (page - 1) * pageSize;

    try {
        const questions = await prisma.question.findMany({
            skip,
            take: pageSize,
            include: {
                author: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        const totalCount = await prisma.question.count();

        return {
            questions,
            totalCount,
            totalPages: Math.ceil(totalCount / pageSize),
            currentPage: page,
        };
    } catch (error) {
        console.error("Error in getting questions:", error);
        return {
            questions: [],
            totalCount: 0,
            totalPages: 0,
            currentPage: page,
        };
    }
}

export async function getQuestionsByUserId(userId: string) {
    try {
        const questions = await prisma.question.findMany({
            where: { authorId: userId },
            orderBy: { createdAt: "desc" },
            include: {
                author: true,
            },
        });

        return { success: true, questions };
    } catch (error) {
        console.error("Error fetching user questions:", error);
        return {
            success: false,
            message: "Failed to fetch questions",
            questions: [],
        };
    }
}

export async function getQuestionById(id: Question["id"]) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user) return { error: "unauthorized user" };

    try {
        const question = await prisma.question.findUnique({
            where: { id },
            include: {
                comments: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                },
                author: true,
                Answer: {
                    include: {
                        comments: {
                            include: {
                                user: true,
                            },
                        },
                    },
                },
            },
        });

        if (!question) {
            return { success: false, message: "Question not found" };
        }

        const viewCount = await prisma.questionView.count({
            where: { questionId: id },
        });

        return {
            success: true,
            question,
            viewCount,
        };
    } catch (error) {
        console.error("Error fetching question:", error);
        return { success: false };
    }
}

export async function createComment(
    content: string,
    questionId?: string,
    answerId?: string
) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        return { error: "Unauthorized user" };
    }

    const userId = session.user.id;

    // Ensure at least one of them is provided
    if (!questionId && !answerId) {
        return { error: "Must provide either a questionId or answerId" };
    }

    try {
        const comment = await prisma.comment.create({
            data: {
                content,
                userId,
                questionId: questionId ?? undefined,
                answerId: answerId ?? undefined,
            },
        });

        return { success: true, comment };
    } catch (error) {
        console.error("Error creating comment:", error);
        return { success: false, error: "Failed to create comment" };
    }
}

export async function addQuestionView(questionId: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const userId = session?.user?.id;

    if (!userId) return { success: false, message: "Not authenticated" };

    try {
        await prisma.questionView.create({
            data: { questionId, userId },
        });
        return { success: true };
    } catch (error: any) {
        if (error.code === "P2002") {
            // Unique constraint hit (already viewed)
            return { success: false, message: "Already viewed" };
        }
        console.error("Failed to log question view:", error);
        return { success: false, message: "Unexpected error" };
    }
}

export async function addAnswer(questionId: string, content: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        return { error: "Unauthorized user" };
    }

    // Validate input
    if (!content.trim()) {
        throw new Error("Answer content cannot be empty.");
    }

    // Create the answer
    try {
        const answer = await prisma.answer.create({
            data: {
                content,
                questionId,
                authorId: session.user.id,
            },
        });

        return { success: true, answer };
    } catch (error) {
        return { success: false, message: "Failed to create Answer" };
    }
}

/**
 * Fetches an existing vote by the user on a question.
 */
async function findVote(userId: string, questionId: string) {
    return prisma.questionVote.findUnique({
        where: {
            userId_questionId: {
                userId,
                questionId,
            },
        },
    });
}

/**
 * Checks if the current user has voted on the given question.
 */
export async function existingVote(questionId: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        return { success: false, message: "Unauthorized user" };
    }

    const userId = session.user.id;

    try {
        const vote = await findVote(userId, questionId);
        return { success: true, vote };
    } catch (error) {
        console.error("Error checking vote:", error);
        return { success: false, message: "Something went wrong" };
    }
}

/**
 * Casts, toggles, or updates a vote on a question.
 */
export async function voteOnQuestion(questionId: string, value: 1 | -1) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        return { success: false, message: "Unauthorized user" };
    }

    const userId = session.user.id;

    try {
        const existingVote = await findVote(userId, questionId);

        if (existingVote) {
            if (existingVote.value === value) {
                // Same vote clicked again — remove vote (toggle off)
                await prisma.questionVote.delete({
                    where: {
                        userId_questionId: {
                            userId,
                            questionId,
                        },
                    },
                });
                return { success: true, message: "Vote removed" };
            } else {
                // Change vote
                await prisma.questionVote.update({
                    where: {
                        userId_questionId: {
                            userId,
                            questionId,
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
            await prisma.questionVote.create({
                data: {
                    userId,
                    questionId,
                    value,
                },
            });
            return { success: true, message: "Vote added" };
        }
    } catch (error) {
        console.error("Error voting on question:", error);
        return { success: false, message: "Failed to vote" };
    }
}

/**
 * Calculates the total vote score for a question.
 * @param questionId The ID of the question.
 * @returns The total vote score (sum of upvotes and downvotes).
 */
export async function countTotalVotes(questionId: string): Promise<number> {
    try {
        const result = await prisma.questionVote.aggregate({
            where: { questionId },
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

/**
 * Gets the total upvotes, downvotes, and net score for a question.
 * @param questionId The ID of the question.
 * @returns An object with upvotes, downvotes, and total score.
 */
export async function getVoteBreakdown(questionId: string): Promise<{
    upvotes: number;
    downvotes: number;
    totalScore: number;
}> {
    try {
        const votes = await prisma.questionVote.findMany({
            where: { questionId },
            select: { value: true },
        });

        const upvotes = votes.filter((v) => v.value === 1).length;
        const downvotes = votes.filter((v) => v.value === -1).length;
        const totalScore = upvotes - downvotes;

        return { upvotes, downvotes, totalScore };
    } catch (error) {
        console.error("Error fetching vote breakdown:", error);
        return { upvotes: 0, downvotes: 0, totalScore: 0 };
    }
}
