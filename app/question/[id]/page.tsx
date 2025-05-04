import {
    addQuestionView,
    countTotalVotes,
    existingVote,
    getQuestionById,
} from "@/actions/question.action";
import AnswerSection from "@/components/homepage/question/AnswerSection";
import CommentSection from "@/components/homepage/question/CommentSection";
import VotePanel from "@/components/homepage/question/VotePanel";
import Sidebar from "@/components/homepage/Sidebar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNow } from "date-fns";
import { ArrowDown, ArrowUp, Flag, MessageSquare, Share2 } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    addQuestionView(id).catch((err) => {
        console.error("Failed to add view:", err);
    });
    const { question, viewCount } = await getQuestionById(id);

    if (!question) {
        return <div>not found</div>;
    }
    const isUserVote = await existingVote(question.id);
    const totalVotes = await countTotalVotes(question.id);
    return (
        <div className="container mx-auto py-6 px-4 md:px-0">
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                    {question?.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span>
                        Asked{" "}
                        {formatDistanceToNow(new Date(question.createdAt), {
                            addSuffix: true,
                        })}
                    </span>
                    <span>Viewed {viewCount} times</span>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="hidden md:block">
                    <Sidebar />
                </div>

                <div className="md:col-span-3">
                    <div className="flex gap-4">
                        <div className="hidden sm:flex flex-col items-center gap-2">
                            <VotePanel
                                questionId={question.id}
                                initialVotes={totalVotes}
                                userVote={isUserVote.vote?.value || null}
                            />
                            <div className="flex flex-col items-center gap-4 text-muted-foreground mt-2">
                                <button className="hover:text-foreground">
                                    <MessageSquare className="h-5 w-5" />
                                </button>
                                <button className="hover:text-foreground">
                                    <Share2 className="h-5 w-5" />
                                </button>
                                <button className="hover:text-foreground">
                                    <Flag className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-auto">
                            <div className="prose  dark:prose-invert max-w-none  md:prose-lg lg:prose-xl dark:prose-pre:bg-accent">
                                <ReactMarkdown
                                    rehypePlugins={[rehypeRaw]}
                                    remarkPlugins={[remarkGfm]}
                                >
                                    {question.content}
                                </ReactMarkdown>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-6">
                                {question.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>

                            <div className="flex sm:hidden items-center gap-4 mt-4 text-muted-foreground">
                                <VotePanel
                                    questionId={question.id}
                                    initialVotes={totalVotes}
                                    userVote={isUserVote.vote?.value || null}
                                />
                                <button className="hover:text-foreground">
                                    <MessageSquare className="size-4" />
                                </button>
                                <button className="hover:text-foreground">
                                    <Share2 className="size-4" />
                                </button>
                                <button className="hover:text-foreground">
                                    <Flag className="size-4" />
                                </button>
                            </div>

                            <div className="flex justify-end mt-6">
                                <div className="bg-accent/50 rounded-md p-3 max-w-xs">
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/users/${question.authorId}`}
                                        >
                                            <img
                                                src="/placeholder.svg"
                                                className="size-8 rounded-full"
                                            />
                                        </Link>
                                        <div>
                                            <Link
                                                href={`/users/${question.authorId}`}
                                            >
                                                Johen
                                            </Link>
                                            <p className="text-xs text-muted-foreground">
                                                asked{" "}
                                                {formatDistanceToNow(
                                                    new Date(
                                                        question.createdAt
                                                    ),
                                                    { addSuffix: true }
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <CommentSection
                                    questionId={question.id}
                                    comments={question.comments}
                                />
                            </div>
                        </div>
                    </div>
                    <Separator className="border-4" />
                    <AnswerSection
                        questionId={question.id}
                        answers={question.Answer}
                    />
                </div>
            </div>
        </div>
    );
}
