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
import { useActionState } from "react";
import { signUpEmail } from "../action";
import { ActionState } from "@/lib/action-helpers";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Github } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

export default function SignUpForm() {
    const router = useRouter();

    const [state, formAction, pending] = useActionState<ActionState, FormData>(
        signUpEmail,
        {
            error: "",
            name: "",
            email: "",
            passoword: "",
        }
    );

    return (
        <Card className="border-0 md:border">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">
                    Create an account
                </CardTitle>
                <CardDescription>
                    Enter your information to create an account
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
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="John Doe"
                                defaultValue={state.name}
                                required
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="text"
                                placeholder="m@example.com"
                                defaultValue={state.email}
                                required
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                defaultValue={state.password}
                                required
                            />
                        </div>

                        <Button type="submit" className="" disabled={pending}>
                            Sign up
                        </Button>
                    </div>
                    <div className="mt-2 text-center text-sm space-y-2 ">
                        {state?.error && (
                            <div className="text-red-500 text-sm flex items-center justify-center">
                                {state.error}
                            </div>
                        )}
                        {state?.success && (
                            <div className="text-green-500 text-sm flex items-center justify-center">
                                {state.success}
                            </div>
                        )}
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="underline underline-offset-4"
                        >
                            Login
                        </Link>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
