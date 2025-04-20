"use server";

import { z } from "zod";

const userSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(4, "Password must be at least 4 characters"),
    tags: z.array(z.string()).min(1, "At least one tag is required"),
});

export const handleForm = async (
    prevState: { success: boolean },
    formData: FormData
) => {
    // await new Promise((resolve) => {
    //     setTimeout(() => {
    //         resolve("done");
    //     }, 5000);
    // });

    const formValues = Object.fromEntries(formData) as Record<string, string>;;

    const tags = (formValues.tags as string)
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

    // Validate the form values using Zod schema
    const result = userSchema.safeParse({ ...formValues, tags });
    const { username: rawUsername, password: rawpassword } = formValues;

    // 5. If validation fails, return the formatted field-wise errors
    if (!result.success) {
        const errorMessage = result.error.format(); // { username: {_errors: [...]}, password: {_errors: [...]} }
        return {
            success: false,
            error: errorMessage,
            username: rawUsername,
            password: rawpassword,
        }; // Send back the error to the client
    }

    // 6. If validation succeeds, safely access the parsed values
    const { username, password, tags: tagsArray } = result.data;
    console.log(username, password, tagsArray);

    // 8. Return a success response (can be used to show toast, redirect, etc.)
    return { success: true, error: null, username, password, tagsArray };
};
