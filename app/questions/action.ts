"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export const PostQuestion = async (prevState: any, formData: FormData) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const authorId = session?.user.id as string;

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tags = formData.getAll("tags[]") as string[];

    await prisma.question.create({
        data: {
            title,
            content,
            tags,
            authorId,
            excerpt: "hello",
        },
    });
};
