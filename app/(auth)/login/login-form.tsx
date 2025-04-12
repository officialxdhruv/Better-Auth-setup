"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState, useEffect } from "react";
import { loginEmail } from "../action";
import { ActionState } from "@/lib/action-helpers";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter();
    const [state, formAction, pending] = useActionState<ActionState, FormData>(
        loginEmail,
        {
            error: "",
            email: "",
            password: "",
        }
    );
    useEffect(() => {
        if (state?.success) {
            router.push("/");
        }
    }, [state, router]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                    Enter you email below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={formAction}>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-3">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="m@examples.com"
                                defaultValue={state?.email}
                                required
                            />
                        </div>
                        <div className="grid gap-3">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                defaultValue={state?.password}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={pending}
                            >
                                Sign in
                            </Button>
                            <Button
                                onClick={async () => {
                                    await authClient.signIn.social({
                                        provider: "github",
                                        callbackURL: "/",
                                    });
                                }}
                                variant="outline"
                                className="w-full"
                                type="button"
                            >
                                Sign in with GitHub
                            </Button>
                        </div>
                    </div>

                    <div className="text-sm flex flex-col items-center justify-center  gap-2 mt-2">
                        {state?.error && (
                            <div className="text-red-500 text-sm flex items-center justify-center">
                                {state.error}
                            </div>
                        )}
                        <div>
                            Don't have an account?{" "}
                            <Link
                                href="/signup"
                                className="underline underline-offset-4 "
                            >
                                Sign up
                            </Link>
                        </div>
                        <a
                            href="#"
                            className="text-sm underline-offset-4 hover:underline"
                        >
                            Forgot your password?
                        </a>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
