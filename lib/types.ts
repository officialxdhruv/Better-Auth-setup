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

export interface Question {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    tags: string[];
    votes: number;
    answers: number;
    views: number;
    createdAt: Date;
    author: {
        id: string;
        username: string | null;
        name: string;
        image?: string | null;
    };
    comments: Comment[];
    related?: {
        id: string;
        title: string;
    }[];
    hotQuestions?: {
        id: string;
        title: string;
    }[];
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
