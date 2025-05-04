"use client";
import { addAnswer } from "@/actions/question.action";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

export default function PostAnswer({ questionId }: { questionId: string }) {
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
        <>
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
        </>
    );
}
