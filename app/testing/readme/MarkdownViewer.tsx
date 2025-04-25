// components/MarkdownViewer.tsx
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";

const options: Options = {
    theme: "one-dark-pro",
    keepBackground: false,
};

type Props = {
    content: string;
};

export default function MarkdownViewer({ content }: Props) {
    return (
        <div className="prose dark:prose-invert mx-auto m-4 max-w-5xl">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
        </div>
    );
}
