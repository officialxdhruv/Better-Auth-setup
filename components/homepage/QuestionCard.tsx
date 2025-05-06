import Link from "next/link";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { formatDistanceToNow } from "date-fns";
import { Eye, MessageSquare } from "lucide-react";
import {
    countTotalVotes,
    existingVote,
    voteOnQuestion,
} from "@/actions/question.action";
import VotePanel from "./question/VotePanel";
import { QuestionType } from "@/lib/types";

export default async function QuestionCard({
    question,
}: {
    question: QuestionType;
}) {
    const isUserVote = await existingVote(question.id);
    const totalVotes = await countTotalVotes(question.id);

    return (
        <Card className="hover:border-primary/20 transition-colors">
            <CardContent>
                <div className="flex gap-4">
                    <div className="hidden sm:flex flex-col items-center gap-2">
                        <div className="flex flex-col items-center">
                            <VotePanel
                                type="question"
                                id={question.id}
                                initialVotes={totalVotes}
                                userVote={isUserVote.vote?.value || null}
                                voteAction={voteOnQuestion}
                            />
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground text-xs">
                            <MessageSquare className="size-4 " />
                            {/* <span>{question.answerCount}</span> */}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground text-xs">
                            <Eye className="size-4" />
                            {/* <span>{question.viewCount}</span> */}
                        </div>
                    </div>

                    <div className="flex-1">
                        <Link
                            href={`/question/${question.id}`}
                            className="text-lg font-bold hover:text-primary text-green-600"
                        >
                            <p>{question.title}</p>
                        </Link>
                        <p className="text-muted-foreground mt-1 line-clamp-1">
                            {question.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-3">
                            {question.tags.map((tag, index) => (
                                <Badge
                                    key={`${question.id}-${tag}-${index}`}
                                    variant="secondary"
                                    className="font-bold hover:bg-secondary/80"
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        <div className="flex justify-between mt-4">
                            <div className="flex sm:hidden items-cente gap-4 text-muted-foreground text-sm">
                                <VotePanel
                                    type="question"
                                    id={question.id}
                                    initialVotes={totalVotes}
                                    userVote={isUserVote.vote?.value || null}
                                    voteAction={voteOnQuestion}
                                />
                                <div className="flex items-center gap-1">
                                    <MessageSquare className="size-4" />
                                    {/* {question.answerCount} */}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Eye className="size-4" />
                                    {/* {question.viewCount} */}
                                </div>
                            </div>
                            <div className="hidden sm:flex items-center gap-2 ml-auto">
                                <Link
                                    href={`users/${question.authorId}`}
                                    className="flex items-center gap-2"
                                >
                                    <img
                                        src={
                                            question.author.image ||
                                            "/avatar.png"
                                        }
                                        alt={question.author.name}
                                        className="size-6 rounded-full"
                                    />
                                    <span className="text-sm text-muted-foreground hover:text-foreground">
                                        {question.author.name}
                                    </span>
                                </Link>
                                <span className="text-xs text-muted-foreground">
                                    asked {""}
                                    {formatDistanceToNow(
                                        new Date(question.createdAt),
                                        { addSuffix: true }
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
