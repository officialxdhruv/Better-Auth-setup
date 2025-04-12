import { z } from "zod";

export const SignUpSchema = z.object({
    name : z.string().min(1,"Name is required"),
    email : z.string().email("Invalid Email address"),
    password : z.string().min(8, "Passowrd must be at least 8 characters")
})
export const LoginSchema = z.object({
    email : z.string().email("Invalid Email address"),
    password : z.string().min(8, "Passowrd must be at least 8 characters")  
})