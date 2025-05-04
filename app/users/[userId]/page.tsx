import { getQuestionsByUserId } from "@/actions/question.action";
import { getUserProfile } from "@/actions/userprofile.action";
import QuestionCard from "@/components/homepage/QuestionCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Calendar,
    Github,
    Link2,
    MapPin,
    ThumbsUp,
    Twitter,
} from "lucide-react";
import Link from "next/link";

export default async function Page({
    params,
}: {
    params: Promise<{ userId: string }>;
}) {
    const { userId } = await params;
    const profile = await getUserProfile(userId);

    if (!profile) {
        return <div className="p-4 text-center">User not found</div>;
    }

    const { questions } = await getQuestionsByUserId(userId);

    return (
        <div className="container mx-auto px-4 md:px-0 py-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1 space-y-4">
                    <Card>
                        <CardHeader className="flex flex-col items-center justify-center">
                            <Avatar className="size-20 ring-2 ring-green-600">
                                <AvatarImage
                                    src={
                                        profile.user.image || "/placeholder.svg"
                                    }
                                />
                                <AvatarFallback>
                                    {profile.user.name?.charAt(0) || "U"}
                                </AvatarFallback>
                            </Avatar>
                            <CardTitle className="text-3xl">
                                {profile.user.name}
                            </CardTitle>
                            <CardDescription className="text-lg">
                                @{profile.user.username}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-center gap-3">
                                <Button variant="outline" className="w-20">
                                    Follow
                                </Button>
                                <Button variant="outline" className="w-20">
                                    Message
                                </Button>
                            </div>
                            <div className="mt-4 space-y-2 text-sm">
                                <div className="flex items-center justify-center gap-1 text-muted-foreground">
                                    <MapPin className="size-4" />
                                    <span>himachal pardash</span>
                                </div>
                                <div className="flex items-center justify-center gap-1 text-muted-foreground">
                                    <Calendar className="size-4" />
                                    <span>
                                        {new Date(
                                            profile.user.createdAt
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex items-center justify-center gap-1">
                                    <Link2 className="size-4" />
                                    <a
                                        href="https://blazecode.me"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        blazecode.me
                                    </a>
                                </div>
                            </div>

                            <div className="flex justify-center gap-2 mt-4">
                                <a
                                    href=""
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    <Github className="size-5" />
                                </a>
                                <a
                                    href=""
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    <Twitter className="h-5 w-5" />
                                </a>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="md:col-span-3">
                    <Tabs defaultValue="profile">
                        <TabsList className="mb-4">
                            <TabsTrigger value="profile">Profile</TabsTrigger>
                            <TabsTrigger value="activity">Activity</TabsTrigger>
                            <TabsTrigger value="question">Question</TabsTrigger>
                            <TabsTrigger value="answers">Answers</TabsTrigger>
                        </TabsList>

                        <TabsContent value="profile">
                            <div className="space-y-6">
                                <Card>
                                    <CardContent>
                                        <h2 className="text-xl font-semibold mb-2">
                                            About
                                        </h2>
                                        <div className="prose max-w-none dark:prose-invert">
                                            <p>
                                                This user hasn't written an
                                                about me yet.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent>
                                        <h2>Top Posts</h2>
                                        <div className="space-y-4">
                                            {profile.topQuestions.map(
                                                (question) => (
                                                    <div
                                                        key={question.id}
                                                        className="flex items-start gap-2"
                                                    >
                                                        <div>
                                                            <Link
                                                                href={`/question/${question.id}`}
                                                            >
                                                                {question.title}
                                                            </Link>
                                                            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                                                <div className="flex items-center gap-1">
                                                                    <ThumbsUp className="size-3" />
                                                                    <span>
                                                                        {
                                                                            question
                                                                                .votes
                                                                                .length
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                        <TabsContent value="activity">
                            <div className="space-y-6">
                                <Card>
                                    <CardContent>
                                        <h2 className="text-xl font-semibold mb-4">
                                            Recent Activity
                                        </h2>
                                        <div className="space-y-4">
                                            {profile.recentActivity.map(
                                                (item) => (
                                                    <div
                                                        key={item.id}
                                                        className="border-b pb-3 last:border-0"
                                                    >
                                                        <div className="flex items-start gap-2">
                                                            <div
                                                                className={`px-2 py-1 rounded text-xs font-medium ${
                                                                    item.type ===
                                                                    "question"
                                                                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                                                        : item.type ===
                                                                            "answer"
                                                                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                                                          : item.type ===
                                                                              "comment"
                                                                            ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                                                                            : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
                                                                }`}
                                                            >
                                                                {item.type ===
                                                                "question"
                                                                    ? "Q"
                                                                    : item.type ===
                                                                        "answer"
                                                                      ? "A"
                                                                      : item.type ===
                                                                          "comment"
                                                                        ? "C"
                                                                        : "V"}
                                                            </div>
                                                            <div>
                                                                <div className="text-xs text-muted-foreground">
                                                                    {item.type}{" "}
                                                                    {new Date(
                                                                        item.createdAt
                                                                    ).toLocaleTimeString()}
                                                                </div>
                                                                <Link
                                                                    href={`/question/${item.id}`}
                                                                    className="text-sm font-medium hover:text-primary"
                                                                >
                                                                    {item.title}
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                        <TabsContent value="question">
                            <div className="space-y-4">
                                {questions.map((question) => (
                                    <QuestionCard
                                        key={question.id}
                                        question={question}
                                    />
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="answers">
                            <div className="space-y-4">
                                {profile.allAnswers.map((answer) => (
                                    <div
                                        key={answer.id}
                                        className="bg-card rounded-lg border shadow-sm p-4"
                                    >
                                        <Link
                                            href={`/question/${answer.questionId}`}
                                            className="text-lg font-medium hover:text-primary"
                                        >
                                            {answer.question.title}
                                        </Link>
                                        <div className="mt-2 prose max-w-none dark:prose-invert line-clamp-3">
                                            <p>{answer.content}</p>
                                        </div>
                                        <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <ThumbsUp className="h-4 w-4" />
                                                {/* <span>{answer.} votes</span> */}
                                            </div>
                                            <span>
                                                Answered{" "}
                                                {new Date(
                                                    answer.createdAt
                                                ).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
