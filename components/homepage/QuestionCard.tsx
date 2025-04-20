import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Question } from "@/lib/types";
import { Card, CardContent } from "../ui/card";
import { formatDistanceToNow } from "date-fns";
import { ArrowDown, ArrowUp, Eye, MessageSquare } from "lucide-react";

interface QuestionCardProps {
    question: Question;
}

export default function QuestionCard({ question }: QuestionCardProps) {
    return (
        <Card>
            <CardContent>
                <div className="flex gap-4">
                    <div className="hidden sm:flex flex-col items-center gap-2">
                        <div className="flex flex-col items-center">
                            <button className="text-muted-foreground hover:text-foreground">
                                <ArrowUp className="size-5" />
                            </button>
                            {/* <span
                                className={cn(
                                    "font-medium text-sm py-1",
                                    question.votes > 0
                                        ? "text-green-600"
                                        : question.votes < 0
                                          ? "text-red-600"
                                          : ""
                                )}
                            >
                                {question.votes}
                            </span> */}
                            <button className="text-muted-foreground hover:text-foreground">
                                <ArrowDown className="size-5" />
                            </button>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground text-xs">
                            <MessageSquare className="size-4 " />
                            {/* <span>{question.answers}</span> */}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground text-xs">
                            <Eye className="size-4" />
                            {/* <span>{question.views}</span> */}
                        </div>
                    </div>

                    <div className="flex-1">
                        <Link
                            href={"/"}
                            className="text-lg font-medium hover:text-primary"
                        >
                            {question.title}
                        </Link>
                        <p className="text-muted-foreground mt-1 line-clamp-1">
                            {question.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-3">
                            {question.tags.map((tag) => (
                                <Badge
                                    key={tag}
                                    variant="secondary"
                                    className="font-bold hover:bg-secondary/80"
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        <div className="flex justify-between mt-4">
                            <div className="flex sm:hidden items-cente gap-4 text-muted-foreground text-sm">
                                <div className="flex items-center gap-1 ">
                                    <ArrowUp className="size-4"/>
                                    {/* <span>{question.votes}</span> */}
                                </div>
                                <div className="flex items-center gap-1">
                                    <MessageSquare className="size-4" />
                                    {/* {question.answers} */}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Eye  className="size-4"/>
                                    {/* {question.views} */}
                                </div>
                            </div>
                            <div className="hidden sm:flex items-center gap-2 ml-auto">
                                <Link
                                    href={`/`}
                                    className="flex items-center gap-2"
                                >
                                    <img
                                        src={
                                            question.author.image ||
                                            "/placeholder.svg"
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
