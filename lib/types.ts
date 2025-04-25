import { getQuestionById } from "@/actions/question.action";
import { z } from "zod";

export const SignUpSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid Email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});
export const LoginSchema = z.object({
    email: z.string().email("Invalid Email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export type QuestionType = Awaited<
    ReturnType<typeof getQuestionById>
>["question"];

export type CommentType = NonNullable<QuestionType>["comments"];

export type AnswerType = NonNullable<QuestionType>["Answer"];

export interface Question {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    tags: string[];
    createdAt: Date;
    author: {
        id: string;
        username: string | null;
        name: string;
        image?: string | null;
    };
}

export interface Comment {
    id: string;
    content: string;
    createdAt: Date;
    author: {
        id: string;
        username: string | null;
        name: string;
    };
}
