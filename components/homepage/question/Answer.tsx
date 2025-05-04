import VotePanel from "./VotePanel";
import { formatDistanceToNow } from "date-fns";
import { ArrowDown, ArrowUp, Flag, MessageSquare, Share2 } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import CommentSection from "./CommentSection";
import {
    countTotalVotes,
    existingVote,
    voteOnAnswer,
} from "@/actions/answer.action";
import { AnswerType } from "@/lib/types";


export default async function Answer({ answer }: { answer: AnswerType }) {
    const isUserVote = await existingVote(answer.id);
    const totalVotes = await countTotalVotes(answer.id);
    return (
        <div key={answer.id} className="flex gap-4 ">
            <div className="hidden sm:flex flex-col items-center gap-2 mb-6">
                <VotePanel
                    type="answer"
                    id={answer.id}
                    initialVotes={totalVotes}
                    userVote={isUserVote.vote?.value || null}
                    voteAction={voteOnAnswer}
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

            <div className="flex-1">
                <div className="prose  dark:prose-invert max-w-none  md:prose-lg lg:prose-xl dark:prose-pre:bg-accent">
                    <ReactMarkdown
                        rehypePlugins={[rehypeRaw]}
                        remarkPlugins={[remarkGfm]}
                    >
                        {answer.content}
                    </ReactMarkdown>
                </div>

                <div className="flex sm:hidden items-center gap-4 mt-4 text-muted-foreground">
                    <VotePanel
                        type="answer"
                        id={answer.id}
                        initialVotes={totalVotes}
                        userVote={isUserVote.vote?.value || null}
                        voteAction={voteOnAnswer}
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

                <div className="flex justify-end my-6">
                    <div className="bg-accent/50 rounded-md p-3 max-w-xs">
                        <div className="flex items-center gap-2">
                            <Link href={`/users/${answer.authorId}`}>
                                <img
                                    src="/placeholder.svg"
                                    className="size-8 rounded-full"
                                />
                            </Link>
                            <div>
                                <Link href={`/users/${answer.authorId}`}>
                                {answer.author.name}
                                </Link>
                                <p className="text-xs text-muted-foreground">
                                    asked{" "}
                                    {formatDistanceToNow(
                                        new Date(answer.createdAt),
                                        { addSuffix: true }
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <CommentSection
                    comments={answer.comments}
                    answerId={answer.id}
                />
            </div>
        </div>
    );
}
