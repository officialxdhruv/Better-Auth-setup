import Sidebar from "@/components/homepage/Sidebar";
import Questions from "@/components/Questions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/auth";
import { MessageSquare, Search, TrendingUp } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/login");
    }

    const page = parseInt(((await searchParams).page as string) || "1");

    return (
        <div className="container mx-auto py-6 px-4 md:px-0">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        BlazeCode
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Where developers learn, share, & build their careers
                    </p>
                </div>
                <Link href="/question/ask">
                    <Button>Ask Question</Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Sidebar />

                <div className="md:col-span-3 space-y-4">
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search questions..."
                                className="pl-8"
                            />
                        </div>
                        <Button variant="outline" size="icon" type="button">
                            <TrendingUp className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" type="button">
                            <MessageSquare className="h-4 w-4" />
                        </Button>
                    </div>

                    <Questions page={page} />
                </div>
            </div>
        </div>
    );
}
