"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
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

export function SignOut({ className }: { className?: string }) {
    const router = useRouter();
    return (
        <Button
            onClick={async () => {
                await authClient.signOut({
                    fetchOptions: {
                        onSuccess: () => {
                            router.push("/login");
                        },
                    },
                });
            }}
            className={className}
        >
            Sign Out
        </Button>
    );
}
