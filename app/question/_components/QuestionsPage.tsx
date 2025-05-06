"use client";

import { useState } from "react";
import {
    BookOpen,
    Clock,
    Code,
    Grid,
    Layers,
    Search,
    Tag,
    User,
    X,
} from "lucide-react";
import { getAllQuestion } from "@/actions/question.action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type Question = Awaited<ReturnType<typeof getAllQuestion>>;

function QuestionsPage({ questions }: { questions: Question }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [view, setView] = useState<"grid" | "list">("grid");

    const tags = [...new Set(questions.flatMap((q) => q.tags))];
    const popularTags = tags.slice(0, 5);

    const filteredQuestions = questions.filter((question) => {
        const matchesSearch =
            question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            question.author.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            question.tags.some((tag) =>
                tag.toLowerCase().includes(searchQuery.toLowerCase())
            );

        const matchesTag = !selectedTag || question.tags.includes(selectedTag);

        return matchesSearch && matchesTag;
    });

    return (
        <div>
            <div className="relative max-w-7xl mx-auto px-4 py-12">
                {/* Hero */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background border text-sm text-green-600 mb-6">
                        <BookOpen className="w-4 h-4" />
                        Community Questions Board
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 text-transparent bg-clip-text mb-6">
                        Ask & Answer
                        <div className="h-14 bg-gradient-to-b from-green-600 from-50% to-black bg-clip-text text-transparent">Programming Questions</div>
                    </h1>
                    <p className="text-lg text-gray-400 mb-8">
                        Explore coding questions from the community and help
                        others grow
                    </p>
                </div>
                {/* Filters */}
                <div className="relative max-w-5xl mx-auto mb-12 space-y-6">
                    {/* Search */}
                    <div className="relative group">
                        <div className="relative flex items-center">
                            <Search className="absolute left-4 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search questions by title, tag, or author..."
                                className="w-full pl-12 pr-4 py-4  hover:bg-card text-white
                  rounded-xl border border-green-600 hover:border-[#414155] transition-all duration-200
                  placeholder:text-gray-500 focus:outline-none focus:ring-2 "
                            />
                        </div>
                    </div>

                    {/* Tags Filter */}
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2 px-4 py-2  rounded-lg ring-1 ring-gray-800">
                            <Tag className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-400">
                                Popular Tags:
                            </span>
                        </div>

                        {popularTags.map((tag, index) => (
                            <button
                                key={`${tag}-${index}`}
                                onClick={() =>
                                    setSelectedTag(
                                        tag === selectedTag ? null : tag
                                    )
                                }
                                className={`
                    group relative px-3 py-1.5 rounded-lg transition-all duration-200
                    ${
                        selectedTag === tag
                            ? "text-green-600 bg-green-600/10 ring-2 ring-green-600/50"
                            : "text-gray-400 hover:text-gray-300   hover:bg-[#262637] ring-1 ring-gray-800"
                    }
                  `}
                            >
                                <span className="text-sm">{tag}</span>
                            </button>
                        ))}

                        {selectedTag && (
                            <button
                                onClick={() => setSelectedTag(null)}
                                className="flex items-center gap-1 px-2 py-1 text-xs text-gray-400 hover:text-gray-300 transition-colors"
                            >
                                <X className="w-3 h-3" />
                                Clear
                            </button>
                        )}

                        <div className="ml-auto flex items-center gap-3">
                            <span className="text-sm text-gray-500">
                                {filteredQuestions.length} questions found
                            </span>

                            {/* View Toggle */}
                            <div className="flex items-center gap-1 p-1 bg-[#1e1e2e] rounded-lg ring-1 ring-gray-800">
                                <button
                                    onClick={() => setView("grid")}
                                    className={`p-2 rounded-md transition-all ${
                                        view === "grid"
                                            ? "bg-green-600/20 text-green-600"
                                            : "text-gray-400 hover:text-gray-300 hover:bg-[#262637]"
                                    }`}
                                >
                                    <Grid className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setView("list")}
                                    className={`p-2 rounded-md transition-all ${
                                        view === "list"
                                            ? "bg-green-600/20 text-green-600"
                                            : "text-gray-400 hover:text-gray-300 hover:bg-[#262637]"
                                    }`}
                                >
                                    <Layers className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className={`grid gap-6 ${
                        view === "grid"
                            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                            : "grid-cols-1 max-w-3xl mx-auto"
                    }`}
                >
                    {filteredQuestions.map((question) => (
                        <Card key={question.id}>
                            <CardContent className="space-y-4">
                                <div>
                                    <Link href={`/question/${question.id}`}>
                                        <p className="text-green-600 font-bold">
                                            {question.title}
                                        </p>
                                    </Link>
                                </div>

                                <div className="flex items-center  justify-between">
                                    <Link
                                        href={`/users/${question.author.id}`}
                                        className="flex gap-2 items-center"
                                    >
                                        <div className="bg-green-500 rounded-md p-1">
                                            <User className="size-4" />
                                        </div>
                                        {question.author.name}
                                    </Link>
                                    <div className="text-muted-foreground flex items-center gap-2">
                                        <Clock className="size-4" />
                                        {question.createdAt.toLocaleDateString()}
                                    </div>
                                </div>
                                <div className="flex gap-2">
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
                                <div className="bg-card rounded-md px-2 mt-2 max-h-32  overflow-hidden">
                                    <div className="prose  dark:prose-invert max-w-none  md:prose-lg lg:prose-xl dark:prose-pre:bg-accent">
                                        <ReactMarkdown
                                            rehypePlugins={[rehypeRaw]}
                                            remarkPlugins={[remarkGfm]}
                                        >
                                            {question.content}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                {/* Empty State */}
                {filteredQuestions.length === 0 && (
                    <div className="relative max-w-md mx-auto mt-20 p-8 rounded-2xl overflow-hidden">
                        <div className="text-center">
                            <div
                                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br 
                from-blue-500/10 to-purple-500/10 ring-1 ring-white/10 mb-6"
                            >
                                <Code className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-medium text-white mb-3">
                                No questions found
                            </h3>
                            <p className="text-gray-400 mb-6">
                                {searchQuery || selectedTag
                                    ? "Try adjusting your search query or filters"
                                    : "Be the first to ask a question in the community"}
                            </p>

                            {(searchQuery || selectedTag) && (
                                <button
                                    onClick={() => {
                                        setSearchQuery("");
                                        setSelectedTag(null);
                                    }}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#262637] text-gray-300 hover:text-white rounded-lg 
                    transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                    Clear all filters
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default QuestionsPage;
