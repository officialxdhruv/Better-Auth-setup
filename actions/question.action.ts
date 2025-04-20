"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export async function getQuestion() {
    try {
        const question = await prisma.question.findMany({
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        name: true,
                        image: true,
                    },
                },
                // comments: {
                //     include: {
                //         user : {
                //             select: {
                //                 id: true,
                //                 username: true,
                //                 name: true,
                //             },
                //         },
                //     },
                // },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return question;
    } catch (error) {
        console.error("Error in getting question", error);
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
