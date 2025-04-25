"use server";

import prisma from "@/lib/prisma";

export async function getUserProfile(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user) return null;

    const topQuestions = await prisma.question.findMany({
        where: { authorId: userId },
        orderBy: {
            votes: {
                _count: "desc",
            },
        },
        take: 3,
        include: {
            votes: true,
        },
    });

    const allQuestions = await prisma.question.findMany({
        where: { authorId: userId },
        orderBy: { createdAt: "desc" },
    });

    const allAnswers = await prisma.answer.findMany({
        where: { authorId: userId },
        include: {
            question: {
                select: {
                    id: true,
                    title: true,
                },
            },
        },
        orderBy: { createdAt: "desc" },
    });

    const comments = await prisma.comment.findMany({
        where: { userId },
        include: {
            question: { select: { id: true, title: true } },
            answer: { select: { id: true, content: true } },
        },
    });

    const recentActivity = [
        ...allQuestions.map((q) => ({
            type: "asked",
            title: q.title,
            id: q.id,
            createdAt: q.createdAt,
        })),
        ...allAnswers.map((a) => ({
            type: "answered",
            questionTitle: a.question.title,
            questionId: a.question.id,
            id: a.id,
            createdAt: a.createdAt,
        })),
        ...comments.map((c) => ({
            type: "commented",
            id: c.id,
            content: c.content,
            createdAt: c.createdAt,
            questionId: c.question?.id,
            answerId: c.answer?.id,
        })),
    ]
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice(0, 5);

    return {
        user,
        topQuestions,
        allQuestions,
        allAnswers,
        recentActivity,
    };
}
