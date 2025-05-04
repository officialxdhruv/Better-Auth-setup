import { Flame } from "lucide-react";
import Link from "next/link";
import { CommandDialogDemo } from "./CommandDialogDemo";
import { ModeToggle } from "./ModeToggle";
import HeaderNav from "./HeaderNav";
import HeaderProfile from "./HeaderProfile";

export default async function Header() {
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
                    <HeaderNav />
                </div>

                <div className="flex items-center ml-auto gap-2">
                    <CommandDialogDemo />
                    <ModeToggle />
                    <HeaderProfile />
                </div>
            </div>
        </header>
    );
}
