"use client";

import Sidebar from "@/components/homepage/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useRef, useState } from "react";
import { createQuestion } from "@/actions/question.action";
import { toast } from "sonner";
type FormState = {
    tags: string[];
    tagInput: string;
    title: string;
    content: string;
    isPosting: boolean;
};

export default function page() {
    const [state, setState] = useState<FormState>({
        tags: [],
        tagInput: "",
        title: "",
        content: "",
        isPosting: false,
    });
    const tagInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async () => {
        if (!state.title || !state.content || state.tags.length === 0) {
            toast.error("Please fill in all fields and add at least one tag");
            return;
        }

        setState((prev) => ({ ...prev, isPosting: true }));

        const result = await createQuestion(
            state.title,
            state.content,
            state.tags
        );

        if ("success" in result && result.success) {
            toast.success("Question posted successfully!");

            setState({
                title: "",
                content: "",
                tagInput: "",
                tags: [],
                isPosting: false,
            });
        } else {
            toast.error(result.error || "Failed to post question");
            setState((prev) => ({ ...prev, isPosting: false }));
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setState((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddTag = () => {
        const trimmedTag = state.tagInput.trim();
        if (
            trimmedTag &&
            !state.tags.includes(trimmedTag) &&
            state.tags.length < 5
        ) {
            setState((prev) => ({
                ...prev,
                tags: [...prev.tags, trimmedTag],
                tagInput: "", // reset input
            }));
            tagInputRef.current?.focus();
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setState((prev) => ({
            ...prev,
            tags: prev.tags.filter((tag) => tag !== tagToRemove),
        }));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            handleAddTag();
        }
    };

    return (
        <div className="container mx-auto py-6 px-4 md:px-0 md:h-[87vh]">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Ask a public question
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Get help from the community by asking a question.
                        Provide as much detail as possible.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Sidebar />
                <div className="md:col-span-3">
                    <Card>
                        <CardContent>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-xl">
                                        Title
                                    </Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        value={state.title}
                                        onChange={handleChange}
                                        placeholder="e.g How to center a div with Tailwind CSS?"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Be specific and imagine you're asking a
                                        question to another person
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="content"
                                        className="text-xl"
                                    >
                                        Body
                                    </Label>
                                    <Textarea
                                        id="content"
                                        name="content"
                                        value={state.content}
                                        onChange={handleChange}
                                        placeholder="Include all the information someone would need to answer your question"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Include all the information someone
                                        would need to answer your question
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="tags" className="text-xl">
                                        Tags
                                    </Label>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {state.tags.map((tag) => (
                                            <Badge
                                                key={tag}
                                                variant="secondary"
                                                className="flex items-center gap-1"
                                            >
                                                {tag}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleRemoveTag(tag)
                                                    }
                                                    className="text-muted-foreground hover:text-foreground"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <Input
                                            id="tag"
                                            name="tagInput"
                                            onChange={handleChange}
                                            value={state.tagInput}
                                            onKeyDown={handleKeyDown}
                                            placeholder="eg. javascript, react, tailwind"
                                            ref={tagInputRef}
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={handleAddTag}
                                            disabled={state.tags.length >= 5}
                                        >
                                            Add
                                        </Button>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Add up to 5 tags to describe what your
                                        question is about
                                    </p>
                                </div>
                                <input
                                    type="hidden"
                                    name="tags"
                                    value={state.tags.join(",")}
                                />
                                <Button
                                    type="submit"
                                    className="w-full md:w-auto"
                                    onClick={handleSubmit}
                                    disabled={state.isPosting}
                                >
                                    Post Your Question
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
