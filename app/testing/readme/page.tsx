// app/page.tsx

import path from "path";
import { promises as fs } from "fs";
import MarkdownViewer from "./MarkdownViewer";

export default async function Page() {
    const filePath = path.join(process.cwd(), "public/README.md");
    const markdown = await fs.readFile(filePath, "utf-8");

    return <MarkdownViewer content={markdown} />;
}
