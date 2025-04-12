import { z } from "zod";

export type ActionState = {
    error?: string;
    success?: string;
    [key: string]: any;
};

type validatedActionFunction<S extends z.ZodType<any, any>, T> = (
    data: z.infer<S>,
    formData: FormData
) => Promise<T>;

export function validatedAction<S extends z.ZodType<any, any>, T>(
    schema: S,
    action: validatedActionFunction<S, T>
) {
    return async (prevState: ActionState, formData: FormData): Promise<T> => {
        const values = Object.fromEntries(formData);
        const result = schema.safeParse(values);
    
        if (!result.success) {
          return {
            error: result.error.errors[0].message,
            ...values, // include form data so it can be reused in the form
          } as T;
        }
        return action(result.data, formData);
    };
}
