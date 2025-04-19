import { Home, MessageCircleQuestion, Tags } from "lucide-react";

export const getQuestions = [
    {
        id: "q1",
        title: "How to center a div with Tailwind CSS?",
        excerpt:
            "I'm trying to center a div both horizontally and vertically using Tailwind CSS. I've tried using flex but can't seem to get it right.",
        content:
            "I'm trying to center a div both horizontally and vertically using Tailwind CSS. I've tried using flex but can't seem to get it right. Here's my current code:\n\n```html\n<div class=\"flex\">\n  <div class=\"bg-blue-500 p-4\">Content</div>\n</div>\n```\n\nHow can I center this properly?",
        tags: ["tailwindcss", "css", "html", "flexbox"],
        votes: 15,
        answers: 3,
        views: 142,
        createdAt: "2023-09-15T10:30:00Z",
        author: {
            id: "u1",
            username: "johndoe",
            name: "John Doe",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        comments: [
            {
                id: "c1",
                content:
                    "Have you tried using the flex justify-center and items-center classes?",
                createdAt: "2023-09-15T11:15:00Z",
                author: {
                    id: "u2",
                    username: "janedoe",
                    name: "Jane Doe",
                },
            },
        ],
    },
    {
        id: "q2",
        title: "Understanding React useEffect cleanup function",
        excerpt:
            "I'm confused about when to use the cleanup function in useEffect and how it works. Can someone explain with examples?",
        content:
            "I'm confused about when to use the cleanup function in useEffect and how it works. Can someone explain with examples?",
        tags: ["reactjs", "javascript", "hooks"],
        votes: 32,
        answers: 5,
        views: 287,
        createdAt: "2023-09-14T08:45:00Z",
        author: {
            id: "u3",
            username: "bobsmith",
            name: "Bob Smith",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        comments: [],
    },
    {
        id: "q3",
        title: "Best practices for API error handling in Next.js",
        excerpt:
            "What are the recommended patterns for handling API errors in a Next.js application? Should I use try/catch or is there a better way?",
        content:
            "What are the recommended patterns for handling API errors in a Next.js application? Should I use try/catch or is there a better way?",
        tags: ["nextjs", "api", "error-handling", "typescript"],
        votes: 24,
        answers: 2,
        views: 198,
        createdAt: "2023-09-13T15:20:00Z",
        author: {
            id: "u4",
            username: "sarahj",
            name: "Sarah Johnson",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        comments: [],
    },
    {
        id: "q4",
        title: "How to implement authentication with NextAuth.js?",
        excerpt:
            "I'm building a Next.js application and want to add authentication. I've heard NextAuth.js is good, but I'm not sure how to set it up properly.",
        content:
            "I'm building a Next.js application and want to add authentication. I've heard NextAuth.js is good, but I'm not sure how to set it up properly.",
        tags: ["nextjs", "authentication", "nextauth", "oauth"],
        votes: 41,
        answers: 7,
        views: 356,
        createdAt: "2023-09-12T09:10:00Z",
        author: {
            id: "u5",
            username: "mikebrown",
            name: "Mike Brown",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        comments: [],
    },
    {
        id: "q5",
        title: "Optimizing Tailwind CSS bundle size for production",
        excerpt:
            "My Tailwind CSS bundle is quite large. What are some strategies to reduce the size for production?",
        content:
            "My Tailwind CSS bundle is quite large. What are some strategies to reduce the size for production?",
        tags: ["tailwindcss", "optimization", "webpack", "css"],
        votes: 19,
        answers: 4,
        views: 213,
        createdAt: "2023-09-11T14:05:00Z",
        author: {
            id: "u1",
            username: "johndoe",
            name: "John Doe",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        comments: [],
    },
];

export const navItems = [
    { name: "Home", href: "/", icon: Home },
    {
        name: "Questions",
        href: "/questions",
        icon: MessageCircleQuestion,
    },
    { name: "Tags", href: "/tags", icon: Tags },
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
    {
        id: "t12",
        name: "authentication",
        description:
            "Authentication is the process of verifying the identity of a user or system.",
        questionsCount: 543,
        todayCount: 6,
    },
];
