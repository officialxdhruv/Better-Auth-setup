"use client";
import { navItems } from "@/lib/data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

export default function Sidebar() {
    const pathname = usePathname();
    return (
        <div className="md:col-span-1">
            <div className="sticky top-25">
                <div className="space-y-4">
                    <Card>
                        <CardContent>
                            <nav className="space-y-2">
                                {navItems.map((item, index) => (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        className={cn(
                                            "text-sm font-medium flex gap-2 items-center px-3 py-2 rounded-md",
                                            pathname === item.href
                                                ? "text-accent-foreground bg-green-600"
                                                : "text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        <item.icon className="size-4" />
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Popular Tags</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                            <Badge variant="secondary">javascript</Badge>
                            <Badge variant="secondary">react</Badge>
                            <Badge variant="secondary">node.js</Badge>
                            <Badge variant="secondary">python</Badge>
                            <Badge variant="secondary">typscript</Badge>
                            <Badge variant="secondary">nextjs</Badge>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
