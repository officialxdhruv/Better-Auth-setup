"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
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
import { Github } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
        <Card className="border-0 md:border">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-green-600">Login</CardTitle>
                <CardDescription>
                    Enter your email and password to access your account
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
                    <Github className="size-4" />
                    Sign in with GitHub
                </Button>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <Separator />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>

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
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <a
                                    href="#"
                                    className="text-sm underline-offset-4 hover:underline"
                                >
                                    Forgot password?
                                </a>
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
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-center">
                <div className="text-sm flex flex-col items-center justify-center  gap-2 ">
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
                </div>
            </CardFooter>
        </Card>
    );
}
