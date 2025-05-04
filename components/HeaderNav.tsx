"use client";
import { navItems } from "@/lib/data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderNav() {
    const pathname = usePathname();

    return (
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
    );
}
