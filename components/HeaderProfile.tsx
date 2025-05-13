"use client";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { Bell, MessageSquare, Settings, User } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";
import { useRouter } from "next/navigation";

export default function HeaderProfile() {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();

    return (
        <>
            {isPending ? (
                <div className="flex items-center space-x-4">
                    <div className="hidden md:flex gap-2">
                        <Skeleton className="size-8" />
                        <Skeleton className="size-8" />
                    </div>
                    <Skeleton className="size-9 rounded-full" />
                </div>
            ) : session?.user ? (
                <>
                    <div className="hidden md:block">
                        <Button variant="ghost" size="icon">
                            <Bell className="size-5" />
                            <span className="sr-only">Notifications</span>
                        </Button>
                        <Button variant="ghost" size="icon">
                            <MessageSquare className="size-5" />
                            <span className="sr-only">Messages</span>
                        </Button>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full"
                            >
                                <Avatar className="size-10 ring-2 ring-green-600 select-none">
                                    <AvatarImage
                                        src={
                                            session.user.image || "/avatar.png"
                                        }
                                        className="select-none bg-black"
                                        alt="User"
                                    />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        {session.user.name}
                                    </p>
                                    <p className="text-muted-foreground text-xs leading-none">
                                        {session.user.email}
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link
                                    href={`/users/${session.user.id}`}
                                    className="flex justify-between items-center"
                                >
                                    Profile
                                    <User />
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link
                                    href="/settings"
                                    className="flex justify-between items-center"
                                >
                                    Settings
                                    <Settings />
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <button
                                    className="w-full"
                                    onClick={async () =>
                                        await authClient.signOut({
                                            fetchOptions: {
                                                onSuccess: () => {
                                                    router.push("/login"); // redirect to login page
                                                },
                                            },
                                        })
                                    }
                                >
                                    Sign out
                                </button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            ) : (
                <div className="hidden md:flex items-center gap-2">
                    <Button variant="ghost" asChild>
                        <Link href="/login">Log in</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/signup">Sign up</Link>
                    </Button>
                </div>
            )}
        </>
    );
}
