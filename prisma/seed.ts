import { PrismaClient } from "@/lib/generated/prisma";

const prisma = new PrismaClient();

async function main() {
    // Create users
    await prisma.user.createMany({
        data: [
            {
                id: "u1",
                name: "John Doe",
                email: "john@example.com",
                emailVerified: true,
                image: "/placeholder.svg?height=40&width=40",
                username: "johndoe",
                displayUsername: "johndoe",
            },
            {
                id: "u2",
                name: "Jane Doe",
                email: "jane@example.com",
                emailVerified: true,
                username: "janedoe",
                displayUsername: "janedoe",
            },
            {
                id: "u3",
                name: "Bob Smith",
                email: "bob@example.com",
                emailVerified: true,
                image: "/placeholder.svg?height=40&width=40",
                username: "bobsmith",
                displayUsername: "bobsmith",
            },
            {
                id: "u4",
                name: "Sarah Johnson",
                email: "sarah@example.com",
                emailVerified: true,
                image: "/placeholder.svg?height=40&width=40",
                username: "sarahj",
                displayUsername: "sarahj",
            },
            {
                id: "u5",
                name: "Mike Brown",
                email: "mike@example.com",
                emailVerified: true,
                image: "/placeholder.svg?height=40&width=40",
                username: "mikebrown",
                displayUsername: "mikebrown",
            },
            {
                id: "u6",
                name: "Emily Davis",
                email: "emily@example.com",
                emailVerified: true,
                image: "/placeholder.svg?height=40&width=40",
                username: "emilyd",
                displayUsername: "emilyd",
            },
            {
                id: "u7",
                name: "David Wilson",
                email: "david@example.com",
                emailVerified: true,
                image: "/placeholder.svg?height=40&width=40",
                username: "davidw",
                displayUsername: "davidw",
            },
            {
                id: "u8",
                name: "Olivia Martinez",
                email: "olivia@example.com",
                emailVerified: true,
                image: "/placeholder.svg?height=40&width=40",
                username: "oliviam",
                displayUsername: "oliviam",
            },
            {
                id: "u9",
                name: "Daniel Anderson",
                email: "daniel@example.com",
                emailVerified: true,
                image: "/placeholder.svg?height=40&width=40",
                username: "daniela",
                displayUsername: "daniela",
            },
            {
                id: "u10",
                name: "Sophia Thomas",
                email: "sophia@example.com",
                emailVerified: true,
                image: "/placeholder.svg?height=40&width=40",
                username: "sophiat",
                displayUsername: "sophiat",
            },
        ],
        skipDuplicates: true,
    });

    await Promise.all([
        prisma.question.create({
            data: {
                id: "q1",
                title: "How to center a div with Tailwind CSS?",
                excerpt:
                    "I'm trying to center a div both horizontally and vertically using Tailwind CSS...",
                content:
                    "I'm trying to center a div both horizontally and vertically using Tailwind CSS...",
                tags: ["tailwindcss", "css", "html", "flexbox"],
                votes: 15,
                answers: 3,
                views: 142,
                createdAt: new Date("2023-09-15T10:30:00Z"),
                authorId: "u1",
            },
        }),
        prisma.question.create({
            data: {
                id: "q2",
                title: "Understanding React useEffect cleanup function",
                excerpt:
                    "I'm confused about when to use the cleanup function in useEffect...",
                content:
                    "I'm confused about when to use the cleanup function in useEffect...",
                tags: ["reactjs", "javascript", "hooks"],
                votes: 32,
                answers: 5,
                views: 287,
                createdAt: new Date("2023-09-14T08:45:00Z"),
                authorId: "u3",
            },
        }),
        prisma.question.create({
            data: {
                id: "q3",
                title: "Best practices for API error handling in Next.js",
                excerpt:
                    "What are the recommended patterns for handling API errors...",
                content:
                    "What are the recommended patterns for handling API errors...",
                tags: ["nextjs", "api", "error-handling", "typescript"],
                votes: 24,
                answers: 2,
                views: 198,
                createdAt: new Date("2023-09-13T15:20:00Z"),
                authorId: "u4",
            },
        }),
        prisma.question.create({
            data: {
                id: "q4",
                title: "How to implement authentication with NextAuth.js?",
                excerpt:
                    "I'm building a Next.js application and want to add authentication...",
                content:
                    "I'm building a Next.js application and want to add authentication...",
                tags: ["nextjs", "authentication", "nextauth", "oauth"],
                votes: 41,
                answers: 7,
                views: 356,
                createdAt: new Date("2023-09-12T09:10:00Z"),
                authorId: "u5",
            },
        }),
        prisma.question.create({
            data: {
                id: "q5",
                title: "Optimizing Tailwind CSS bundle size for production",
                excerpt: "My Tailwind CSS bundle is quite large...",
                content: "My Tailwind CSS bundle is quite large...",
                tags: ["tailwindcss", "optimization", "webpack", "css"],
                votes: 19,
                answers: 4,
                views: 213,
                createdAt: new Date("2023-09-11T14:05:00Z"),
                authorId: "u1",
            },
        }),
        prisma.question.create({
            data: {
                id: "q6",
                title: "How to use Prisma with PostgreSQL in production?",
                excerpt:
                    "I'm looking for best practices to connect Prisma with PostgreSQL in a production environment.",
                content:
                    "I'm looking for best practices to connect Prisma with PostgreSQL in a production environment. Should I use connection pooling? How should I manage schema migrations?",
                tags: ["prisma", "postgresql", "database", "production"],
                votes: 12,
                answers: 2,
                views: 110,
                createdAt: new Date("2023-09-10T11:40:00Z"),
                authorId: "u6",
            },
        }),
        prisma.question.create({
            data: {
                id: "q7",
                title: "What is the difference between useMemo and useCallback?",
                excerpt:
                    "I see both useMemo and useCallback used in React apps...",
                content:
                    "I see both useMemo and useCallback used in React apps, but I'm confused about when to use each. Can someone clarify with examples?",
                tags: ["react", "javascript", "performance", "hooks"],
                votes: 25,
                answers: 6,
                views: 298,
                createdAt: new Date("2023-09-09T13:00:00Z"),
                authorId: "u7",
            },
        }),
        prisma.question.create({
            data: {
                id: "q8",
                title: "How to debounce an input field in React?",
                excerpt:
                    "I'm working with a search input field and want to debounce the API call...",
                content:
                    "I'm working with a search input field and want to debounce the API call to avoid unnecessary requests. What's the recommended approach?",
                tags: ["react", "javascript", "performance", "debounce"],
                votes: 30,
                answers: 3,
                views: 195,
                createdAt: new Date("2023-09-08T10:15:00Z"),
                authorId: "u8",
            },
        }),
        prisma.question.create({
            data: {
                id: "q9",
                title: "How to fix hydration errors in Next.js?",
                excerpt:
                    "Sometimes I get hydration errors when using dynamic data...",
                content:
                    "Sometimes I get hydration errors when using dynamic data. What causes hydration mismatches and how do I prevent them?",
                tags: ["nextjs", "hydration", "react", "ssr"],
                votes: 18,
                answers: 2,
                views: 167,
                createdAt: new Date("2023-09-07T17:00:00Z"),
                authorId: "u9",
            },
        }),
        prisma.question.create({
            data: {
                id: "q10",
                title: "What are server actions in Next.js 14?",
                excerpt:
                    "I heard about server actions introduced in Next.js 14...",
                content:
                    "I heard about server actions introduced in Next.js 14. What exactly are they and how do they work with forms or API routes?",
                tags: ["nextjs", "server-actions", "fullstack", "react"],
                votes: 44,
                answers: 5,
                views: 322,
                createdAt: new Date("2023-09-06T12:25:00Z"),
                authorId: "u10",
            },
        }),
    ]);

    // Create comments
    await prisma.comment.create({
        data: {
            id: "c1",
            content:
                "Have you tried using the flex justify-center and items-center classes?",
            createdAt: new Date("2023-09-15T11:15:00Z"),
            questionId: "q1",
            authorId: "u2",
        },
    });
}

main()
    .then(() => {
        console.log("✅ Seeded successfully");
        return prisma.$disconnect();
    })
    .catch((e) => {
        console.error("❌ Error seeding", e);
        return prisma.$disconnect();
    });
