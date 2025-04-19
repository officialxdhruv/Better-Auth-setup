"use server";

import { z } from "zod";

// 1. Define a schema using Zod to validate the form fields
const userSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(4, "Password must be at least 4 characters"),
});

// 2. This function will be used with useActionState on the client
export const handleForm = async (
    prevState: { success: boolean },
    formData: FormData // Form data from the browser
) => {
    await new Promise((resolve) => {
        setTimeout(() => {
            console.log("hello");
            resolve("done");
        }, 5000);
    });
    // 3. Convert FormData into a plain object (e.g. { username: '...', password: '...' })
    const formValues = Object.fromEntries(formData);

    // 4. Validate the form values using Zod schema
    const result = userSchema.safeParse(formValues);

    // 5. If validation fails, return the formatted field-wise errors
    if (!result.success) {
        const errorMessage = result.error.format(); // { username: {_errors: [...]}, password: {_errors: [...]} }
        return { success: false, error: errorMessage, ...formValues }; // Send back the error to the client
    }

    // 6. If validation succeeds, safely access the parsed values
    const { username, password } = result.data;

    // 8. Return a success response (can be used to show toast, redirect, etc.)
    return { success: true, error: null, username, password };
};
