"use client";

import Sidebar from "@/components/homepage/Sidebar";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useActionState, useState } from "react";
import { PostQuestion } from "../action";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export default function page() {
    const [state, formAction, pending] = useActionState(PostQuestion, null);
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState<string[]>([]);

    const handleAddTag = () => {
        if (
            tagInput.trim() &&
            !tags.includes(tagInput.trim()) &&
            tags.length < 5
        ) {
            setTags([...tags, tagInput.trim()]);
            setTagInput("");
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            handleAddTag();
        }
    };

    return (
        <div className="container mx-auto py-6 px-4 md:px-0 md:h-[87vh]">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Sidebar />
                <div className="md:col-span-3">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">
                                Ask a public question
                            </CardTitle>
                            <CardDescription>
                                Get help from the community by asking a
                                question. Provide as much detail as possible.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form action={formAction} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-xl">
                                        Title
                                    </Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        placeholder="e.g How to center a div with Tailwind CSS?"
                                        required
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
                                        placeholder="Include all the information someone would need to answer your question"
                                        className=""
                                        required
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
                                        {tags.map((tag) => (
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
                                            id="tags"
                                            name="tags"
                                            onChange={(e) =>
                                                setTagInput(e.target.value)
                                            }
                                            value={tagInput}
                                            onKeyDown={handleKeyDown}
                                            placeholder="eg. javascript, react, tailwind"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={handleAddTag}
                                            disabled={tags.length >= 5}
                                        >
                                            Add
                                        </Button>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Add up to 5 tags to describe what your
                                        question is about
                                    </p>
                                </div>
                                {tags.map((tag, index) => (
                                    <input
                                        key={index}
                                        type="hidden"
                                        name="tags[]"
                                        value={tag}
                                    />
                                ))}
                                <Button
                                    type="submit"
                                    className="w-full md:w-auto"
                                    disabled={pending}
                                >
                                    Post Your Question
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
