"use client";
import { createComment } from "@/actions/question.action";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CommentsType } from "@/lib/types";
import { withAuthClient, WithAuthProps } from "@/lib/withAuthClient";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

type CommentSectionProps = {
    questionId?: string;
    answerId?: string;
    comments: CommentsType;
} & WithAuthProps;

function CommentSection({
    questionId,
    answerId,
    comments,
    user,
}: CommentSectionProps) {
    const [showComments, setShowComments] = useState(false);
    const [showAddComment, setShowAddComment] = useState(false);
    const [isPosting, setIsPosting] = useState(false);
    const [content, setContent] = useState("");
    const [localComments, setLocalComments] = useState<CommentsType>(comments);
    const handleSubmit = async () => {
        if (!content.trim()) {
            toast.error("Comment cannot be empty.");
            return;
        }

        const tempId = `temp-${Date.now()}`;

        // 1. Optimistically add comment
        const newComment = {
            id: tempId,
            content,
            createdAt: new Date().toISOString(),
            user: {
                id: user.id,
                name: user.name,
            },
        };

        setLocalComments((prev) => [newComment as any, ...prev]);
        setContent("");
        setIsPosting(true);
        try {
            const { comment: result, success } = await createComment(
                content,
                questionId,
                answerId
            );
            if (success && result) {
                setContent("");
                setLocalComments((prev) =>
                    prev.map((c) => (c.id === tempId ? { ...result, user } : c))
                );
                toast.success("Comment posted!");
                // Optionally: refresh comment list here
            } else {
                setLocalComments((prev) => prev.filter((c) => c.id !== tempId));
                toast.error("Failed to post comment.");
            }
        } catch (err) {
            setLocalComments((prev) => prev.filter((c) => c.id !== tempId));
            toast.error("Something went wrong.");
        } finally {
            setIsPosting(false);
        }
    };
    return (
        <div className="my-4 space-y-2">
            {localComments.length > 0 && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowComments((prev) => !prev)}
                    className="text-muted-foreground"
                >
                    {showComments ? "Hide comments" : "Show comments"}
                </Button>
            )}

            {localComments.length > 0 && showComments && (
                <div className="border-t pt-4 space-y-3">
                    {localComments.map((comment) => (
                        <div key={comment.id} className="flex gap-2 text-sm">
                            <div className="flex-1">
                                <span>{comment.content}</span>
                                <span className="mx-1">-</span>
                                <Link
                                    href={`/users/${comment.user.id}`}
                                    className="text-muted-foreground hover:text-foreground underline"
                                >
                                    {comment.user.name}
                                </Link>
                                <span className="text-xs text-muted-foreground ml-1">
                                    {formatDistanceToNow(
                                        new Date(comment.createdAt),
                                        { addSuffix: true }
                                    )}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!showAddComment ? (
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground mt-2"
                    onClick={() => setShowAddComment(true)}
                >
                    Add a comment
                </Button>
            ) : (
                <div className="mt-2 space-y-4">
                    <Textarea
                        placeholder="Add your comment..."
                        className="min-h-20"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <div className="flex justify-between">
                        <Button
                            variant="default"
                            size="default"
                            onClick={() => setShowAddComment(false)}
                            className="w-20"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="default"
                            size="default"
                            onClick={handleSubmit}
                            className="w-20"
                            disabled={isPosting}
                        >
                            Add
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
export default withAuthClient(CommentSection);
