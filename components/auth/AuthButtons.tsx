"use client";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export function SignIn() {
    return (
        <Button
            onClick={async () =>
                await authClient.signIn.social({
                    provider: "github",
                })
            }
        >
            Sign in with GitHub
        </Button>
    );
}

export function SignOut() {
    return (
        <Button
            onClick={async () =>
                await authClient.signOut({
                    fetchOptions: {
                        onSuccess: () => {
                            redirect("/");
                        },
                    },
                })
            }
        >
            SignOut
        </Button>
    );
}
