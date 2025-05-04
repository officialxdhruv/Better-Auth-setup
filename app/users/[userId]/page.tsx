import { getAnswersByUserId } from "@/actions/answer.action";
import { getQuestionsByUserId } from "@/actions/question.action";
import { getUserProfileById, isFollowing } from "@/actions/userprofile.action";
import EditProfile from "@/components/EditProfile";
import QuestionCard from "@/components/homepage/QuestionCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, formatDistanceToNow } from "date-fns";
import {
    Calendar,
    Lightbulb,
    Link2,
    MapPin,
    MessageCircleQuestionIcon,
} from "lucide-react";
import Link from "next/link";

export default async function Page({
    params,
}: {
    params: Promise<{ userId: string }>;
}) {
    const { userId } = await params;
    const user = await getUserProfileById(userId);

    if (!user) {
        return <div className="p-4 text-center">User not found</div>;
    }

    const { questions } = await getQuestionsByUserId(userId);
    const answers = await getAnswersByUserId(userId);
    const isCurrentUserFollowing = await isFollowing(userId);

    const formattedDate = format(new Date(user.createdAt), "MMMM yyyy");

    return (
        <div className="container mx-auto px-4 md:px-0 py-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1 space-y-4">
                    <Card>
                        <CardContent>
                            <div className="flex flex-col items-center justify-center">
                                <Avatar className="size-24 ring-4 ring-green-600">
                                    <AvatarImage
                                        src={user.image || "/avatar.png"}
                                    />
                                    <AvatarFallback>
                                        {user.name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <h1 className="mt-4 text-2xl font-bold">
                                    {user.name}
                                </h1>
                                <p className="text-muted-foreground">
                                    @{user.username}
                                </p>
                                <div className="w-full">
                                    <Separator className="my-4" />
                                    <div className="flex justify-between">
                                        <div className="flex flex-col items-center justify-center">
                                            <p className="font-semibold">
                                                {user._count.following.toLocaleString()}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Following
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="font-semibold">
                                                {user._count.followers.toLocaleString()}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                Followers
                                            </div>
                                        </div>
                                    </div>
                                    <Separator className="my-4" />
                                </div>

                                <div className="w-full space-y-2 text-sm">
                                    <div className="flex  gap-2 items-center text-muted-foreground">
                                        <MapPin className="size-4" />
                                        <span>
                                            {user.location || "No location"}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Calendar className="size-4" />
                                        <span>Joined {formattedDate}</span>
                                    </div>
                                    <div className="flex gap-2 items-center text-muted-foreground">
                                        <Link2 className="size-4" />
                                        {user.website ? (
                                            <a
                                                href={
                                                    user.website.startsWith(
                                                        "http"
                                                    )
                                                        ? user.website
                                                        : `https://${user.website}`
                                                }
                                                className="hover:underline truncate"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {user.website}
                                            </a>
                                        ) : (
                                            "No website"
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <EditProfile
                        user={user}
                        isFollowing={isCurrentUserFollowing}
                    />
                </div>

                <div className="md:col-span-3">
                    <Tabs defaultValue="questions" className="w-full">
                        <TabsList className=" w-full">
                            <TabsTrigger value="questions">
                                <MessageCircleQuestionIcon className="size-4" />
                                Question
                            </TabsTrigger>
                            <TabsTrigger value="answers">
                                <Lightbulb className="size-4" />
                                Answers
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="questions" className="mt-6">
                            <div className="space-y-6">
                                {(questions.length ?? 0) > 0 ? (
                                    questions.map((question) => (
                                        <QuestionCard
                                            key={question.id}
                                            question={question}
                                        />
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-muted-foreground">
                                        No posts yet
                                    </div>
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="answers" className="mt-6">
                            <div className="space-y-6">
                                {(answers.length ?? 0) > 0 ? (
                                    answers.map((answer) => (
                                        <Card key={answer.id}>
                                            <CardContent>
                                                <Link
                                                    href={`/question/${answer.question.id}`}
                                                    className="font-semibold text-green-600 hover:text-primary"
                                                >
                                                    {answer.question.title}
                                                </Link>
                                                <div className="mt-2 prose max-w-none dark:prose-invert line-clamp-3">
                                                    <p>{answer.content}</p>
                                                </div>
                                                <div className="flex flex-row-reverse">
                                                    <span className="mt-2 text-muted-foreground">
                                                        asked {""}
                                                        {formatDistanceToNow(
                                                            new Date(
                                                                answer.createdAt
                                                            ),
                                                            { addSuffix: true }
                                                        )}
                                                    </span>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-muted-foreground">
                                        No posts yet
                                    </div>
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
