"use server";
import { createQuestion } from "@/actions/question.action";
import { z, ZodFormattedError } from "zod";

const questionSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    tags: z.array(z.string()).min(1, "Tags are required"),
});

export type QuestionFormData = z.infer<typeof questionSchema>;

export const PostQuestion = async (
    prevState: {
        success: boolean;
    },
    formData: FormData
) => {
    const formValues = Object.fromEntries(formData);

    const rawtags = (formValues.tags as string)
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

    const result = questionSchema.safeParse({ ...formValues, tags: rawtags });

    if (!result.success) {
        const errorMessage = result.error.format();
        return { success: false, error: errorMessage };
    }

    const { title, content, tags } = result.data;

    const question = await createQuestion(title, content, tags);
    if (!question.success) {
        return {
            success: false,
            error: { message: question.error || "Something went wrong" },
        };
    }

    return { success: true, error: null, };
};
