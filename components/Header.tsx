"use client";
import { cn } from "@/lib/utils";
import { Bell, Flame, MessageSquare } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CommandDialogDemo } from "./CommandDialogDemo";
import { ModeToggle } from "./ModeToggle";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
import { navItems } from "@/lib/data";

export default function Header() {
    const router = useRouter();
    const pathname = usePathname();
    const { data: session, isPending } = authClient.useSession();
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex items-center h-18 mx-auto px-4 md:px-0">
                <div className="flex items-center gap-2 md:gap-4">
                    <Link href="/" className="flex items-center">
                        <span className="font-bold text-xl ">
                            <span className="hidden md:inline">
                                Blaze
                                <span className="text-green-600">Code</span>
                            </span>
                            <Flame className="md:hidden text-green-600 size-8" />
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-6 text-sm">
                        {navItems.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className={cn(
                                    "font-medium flex gap-1 items-center",
                                    pathname === item.href
                                        ? "text-foreground"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <item.icon className="size-4" />
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center ml-auto gap-2">
                    <CommandDialogDemo />
                    <ModeToggle />
                    {isPending ? (
                        <div className="flex items-center space-x-4">
                            <div className="hidden md:flex gap-2">
                                <Skeleton className="size-8" />
                                <Skeleton className="size-8" />
                            </div>
                            <Skeleton className="size-9 rounded-full" />
                        </div>
                    ) : session ? (
                        <>
                            <div className="hidden md:block">
                                <Button variant="ghost" size="icon">
                                    <Bell className="size-5" />
                                    <span className="sr-only">
                                        Notifications
                                    </span>
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
                                                    session.user.image ||
                                                    "/placeholder.svg"
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
                                        My Account
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href="/users/johndoe">
                                            Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/settings">Settings</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <button
                                            className="w-full"
                                            onClick={async () =>
                                                await authClient.signOut({
                                                    fetchOptions: {
                                                        onSuccess: () => {
                                                            router.push(
                                                                "/login"
                                                            ); // redirect to login page
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
                                <Link href="/auth/login">Log in</Link>
                            </Button>
                            <Button asChild>
                                <Link href="/auth/register">Sign up</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
