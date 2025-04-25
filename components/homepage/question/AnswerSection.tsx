"use client";
import { addAnswer } from "@/actions/question.action";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AnswerType } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { ArrowDown, ArrowUp, Flag, MessageSquare, Share2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";
import CommentSection from "./CommentSection";
import { Separator } from "@/components/ui/separator";

type AnswerSectionProps = {
    questionId: string;
    answers: AnswerType;
};

export default function AnswerSection({
    questionId,
    answers,
}: AnswerSectionProps) {
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit = async () => {
        if (!content.trim()) {
            toast.error("Answer cannot be empty.");
            return;
        }
        setIsSubmitting(true);
        try {
            const { success, answer } = await addAnswer(questionId, content);
            if (success && answer) {
                toast.success("Answer posted");
                setContent("");
            }
        } catch (error) {
            console.error("Failed to post answer:", error);
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className="mt-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Answer</h2>
                <div className="flex gap-2">
                    <Button variant="outline">Highest Score</Button>
                    <Button variant="ghost">Newest</Button>
                </div>
            </div>

            <div className="space-y-6 divide-y-2">
                {answers.map((answers) => (
                        <div key={answers.id} className="flex gap-4 ">
                            <div className="hidden sm:flex flex-col items-center gap-2 mb-6">
                                <button className="text-muted-foreground hover:text-foreground">
                                    <ArrowUp className="size-6" />
                                </button>
                                <span className="font-medium text-lg py-1">
                                    {10}
                                </span>
                                <button className="text-muted-foreground hover:text-foreground">
                                    <ArrowDown className="size-6" />
                                </button>
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

                            <div className="flex-1">
                                <div className="prose  dark:prose-invert max-w-none  md:prose-lg lg:prose-xl dark:prose-pre:bg-accent">
                                    <ReactMarkdown
                                        rehypePlugins={[rehypeRaw]}
                                        remarkPlugins={[remarkGfm]}
                                    >
                                        {answers.content}
                                    </ReactMarkdown>
                                </div>

                                <div className="flex sm:hidden items-center gap-4 mt-4 text-muted-foreground">
                                    <button className="hover:text-foreground">
                                        <ArrowUp className="size-4" />
                                    </button>
                                    <span className="font-medium text-lg py-1">
                                        {10}
                                    </span>
                                    <button className="hover:text-foreground">
                                        <ArrowDown className="size-4" />
                                    </button>
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

                                <div className="flex justify-end my-6">
                                    <div className="bg-accent/50 rounded-md p-3 max-w-xs">
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={`/users/${answers.authorId}`}
                                            >
                                                <img
                                                    src="/placeholder.svg"
                                                    className="size-8 rounded-full"
                                                />
                                            </Link>
                                            <div>
                                                <Link
                                                    href={`/users/${answers.authorId}`}
                                                >
                                                    Johen
                                                </Link>
                                                <p className="text-xs text-muted-foreground">
                                                    asked{" "}
                                                    {formatDistanceToNow(
                                                        new Date(
                                                            answers.createdAt
                                                        ),
                                                        { addSuffix: true }
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <CommentSection
                                    comments={answers.comments}
                                    answerId={answers.id}
                                />
                            </div>
                        </div>
                ))}
            </div>

            <div className="">
                <h2 className="text-xl font-semibold mb-4">Your Answer</h2>
                <div>
                    <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your answer here..."
                        className="min-h-50 mb-4"
                    />
                    <Button onClick={handleSubmit} disabled={isSubmitting}>
                        Post Your Answer
                    </Button>
                </div>
            </div>
        </div>
    );
}
