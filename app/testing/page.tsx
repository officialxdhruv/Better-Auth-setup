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
import { useActionState } from "react";
import { handleForm } from "./actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function page() {
    const [state, formAction, isPending] = useActionState(handleForm, {
        success: false,
        error: null,
        username: "",
        password: "",
    });
    if (state.success) {
        toast.success("Form submitted successfully!");
    }
    return (
        <div className="flex items-center justify-center h-[calc(100vh_-_13.875rem)] md:h-[calc(100vh-8.125rem)]">
            <div className="min-w-sm mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">
                            Form
                        </CardTitle>
                        <CardDescription>
                            This is a form for testing
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form action={formAction}>
                            <div className="space-y-4">
                                <div className="grid gap-2">
                                    <Label className="text-lg">Username</Label>
                                    <Input
                                        type="text"
                                        name="username"
                                        defaultValue={
                                            state.success ? "" : state.username
                                        }
                                    />
                                    {state.error?.username?._errors?.[0] && (
                                        <p className="text-red-500">
                                            {state.error.username._errors[0]}
                                        </p>
                                    )}
                                </div>
                                <div className="grid gap-2">
                                    <Label className="text-lg">Password</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        defaultValue={
                                            state.success ? "" : state.password
                                        }
                                    />
                                    {state.error?.password?._errors?.[0] && (
                                        <p className="text-red-500">
                                            {state.error.password._errors[0]}
                                        </p>
                                    )}
                                </div>
                                <Button type="submit" disabled={isPending}>
                                    {isPending ? (
                                        <span className="flex items-center gap-2">
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Submitting
                                        </span>
                                    ) : (
                                        "Submit"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
