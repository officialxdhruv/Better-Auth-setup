import { Home, MessageCircleQuestion, Tags } from "lucide-react";

export const navItems = [
    { name: "Home", href: "/", icon: Home },
    {
        name: "Questions",
        href: "/questions",
        icon: MessageCircleQuestion,
    },
    { name: "Tags", href: "/tags", icon: Tags },
    {
        name: "Ask Questions",
        href: "/questions/ask",
        icon: MessageCircleQuestion,
    },
];

export const tags = [
    {
        id: "t1",
        name: "javascript",
        description:
            "For questions about programming in ECMAScript (JavaScript/JS) and its different dialects/implementations.",
        questionsCount: 2345,
        todayCount: 15,
    },
    {
        id: "t2",
        name: "reactjs",
        description:
            "React is a JavaScript library for building user interfaces. It uses a declarative, component-based paradigm and aims to be efficient and flexible.",
        questionsCount: 1876,
        todayCount: 12,
    },
    {
        id: "t3",
        name: "nextjs",
        description:
            "Next.js is a React framework that enables server-side rendering, static site generation, and more.",
        questionsCount: 1243,
        todayCount: 10,
    },
    {
        id: "t4",
        name: "typescript",
        description:
            "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.",
        questionsCount: 1654,
        todayCount: 8,
    },
    {
        id: "t5",
        name: "tailwindcss",
        description:
            "Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces.",
        questionsCount: 987,
        todayCount: 7,
    },
    {
        id: "t6",
        name: "css",
        description:
            "CSS (Cascading Style Sheets) is a representation style sheet language used for describing the look and formatting of HTML, XML, and SVG.",
        questionsCount: 2156,
        todayCount: 9,
    },
    {
        id: "t7",
        name: "html",
        description:
            "HTML (HyperText Markup Language) is the standard markup language used for creating web pages and web applications.",
        questionsCount: 1876,
        todayCount: 6,
    },
    {
        id: "t8",
        name: "node.js",
        description:
            "Node.js is an event-based, non-blocking, asynchronous I/O runtime that uses JavaScript and is built on Chrome's V8 JavaScript engine.",
        questionsCount: 1543,
        todayCount: 11,
    },
    {
        id: "t9",
        name: "express",
        description:
            "Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.",
        questionsCount: 876,
        todayCount: 5,
    },
    {
        id: "t10",
        name: "mongodb",
        description:
            "MongoDB is a cross-platform document-oriented database program. It uses JSON-like documents with schema.",
        questionsCount: 765,
        todayCount: 4,
    },
    {
        id: "t11",
        name: "postgresql",
        description:
            "PostgreSQL is a powerful, open source object-relational database system with over 30 years of active development.",
        questionsCount: 654,
        todayCount: 3,
    },
];
