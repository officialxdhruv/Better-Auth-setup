import QuestionCard from "@/components/homepage/QuestionCard";
import Sidebar from "@/components/homepage/Sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { MessageSquare, Search, TrendingUp } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) {
        redirect("/login");
    }

    const getQuestions = await prisma.question.findMany({
        include: {
            author: {
                select: {
                    id: true,
                    username: true,
                    name: true,
                    image: true,
                },
            },
            comments: {
                include: {
                    author: {
                        select: {
                            id: true,
                            username: true,
                            name: true,
                        },
                    },
                },
            },
        },
    });

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
                <Link href="/questions/ask">
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

                    {getQuestions.map((question) => (
                        <QuestionCard key={question.id} question={question} />
                    ))}
                </div>
            </div>
        </div>
    );
}
