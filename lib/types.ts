import { getQuestionById, getQuestions } from "@/actions/question.action";
import { getUserProfileById } from "@/actions/userprofile.action";
import { z } from "zod";

export const SignUpSchema = z.object({
    name: z.string().min(1, "Name is required"),
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid Email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export const LoginSchema = z.object({
    email: z.string().email("Invalid Email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export type QuestionsListType = Awaited<
    ReturnType<typeof getQuestions>
>["questions"];

export type QuestionType = QuestionsListType[0];

type QuestionsByid = Awaited<ReturnType<typeof getQuestionById>>["question"];

export type UserProfileType = NonNullable<
    Awaited<ReturnType<typeof getUserProfileById>>
>;

export type AnswersType = NonNullable<QuestionsByid>["Answer"];
export type CommentsType = NonNullable<QuestionsByid>["comments"];

export type AnswerType = AnswersType[0];
export type CommentType = CommentsType[0];
