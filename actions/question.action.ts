"use server";

import { auth } from "@/lib/auth";
import { Question } from "@/lib/generated/prisma";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
export async function getQuestion() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user) return [];

    const userId = session.user.id;

    try {
        const questions = await prisma.question.findMany({
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        name: true,
                        image: true,
                    },
                },
                viewsLog: {
                    select: {
                        id: true,
                    },
                },
                votes: {
                    select: {
                        value: true,
                        userId: true,
                    },
                },
                _count: {
                    select: {
                        Answer: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        const questionsWithCounts = questions.map((q) => {
            const upvotes = q.votes.filter((vote) => vote.value === 1).length;
            const downvotes = q.votes.filter((vote) => vote.value === -1).length;

            const vote = q.votes.find((v) => v.userId === userId);
            const userVote = vote?.value ?? null;

            return {
                ...q,
                viewCount: q.viewsLog.length,
                upvotes,
                downvotes,
                answerCount: q._count.Answer,
                excerpt: q.excerpt,
                userVote,
            };
        });

        return questionsWithCounts;
    } catch (error) {
        console.error("Error in getting questions:", error);
        return [];
    }
}

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

export async function getQuestionById(id: Question["id"]) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user) return { error: "unauthorized user" };
    const userId = session.user.id;
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
                author: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                    },
                },
                Answer: {
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

        // Fetch total upvotes and downvotes
        const upvotes = await prisma.questionVote.count({
            where: {
                questionId: id,
                value: 1, // upvotes
            },
        });

        const downvotes = await prisma.questionVote.count({
            where: {
                questionId: id,
                value: -1, // downvotes
            },
        });

        // Fetch the user's vote, if exists
        const userVote = userId
            ? await prisma.questionVote.findUnique({
                  where: {
                      userId_questionId: {
                          userId,
                          questionId: id,
                      },
                  },
              })
            : null;

        return {
            success: true,
            question,
            upvotes,
            downvotes,
            viewCount,
            userVote: userVote ? userVote.value : null,
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

export async function voteOnQuestion(questionId: string, value: 1 | -1) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        return { success: false, message: "Unauthorized user" };
    }

    const userId = session.user.id;

    try {
        const existingVote = await prisma.questionVote.findUnique({
            where: {
                userId_questionId: {
                    userId,
                    questionId,
                },
            },
        });

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
