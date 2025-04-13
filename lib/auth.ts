import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

 
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification : true,

    },
    socialProviders: {
        github: { 
           clientId: process.env.GITHUB_CLIENT_ID as string, 
           clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        }, 
    },
    emailVerification: {
        sendVerificationEmail: async ({ user, url}) => {
            const token = new URL(url).searchParams.get("token");
            const customUrl = `${process.env.BETTER_AUTH_URL}/api/auth/verify-email?token=${token}&callbackURL=/verify-email`;
            await resend.emails.send({
              from: 'no-reply@blazecode.me',
              to: user.email,
              subject: 'Verify your email address',
              text: `Click the link to verify your email: ${customUrl}`,
            });
        },
        sendOnSignUp : true,
        autoSignInAfterVerification: true,

    }, 
    plugins: [nextCookies()] 
});