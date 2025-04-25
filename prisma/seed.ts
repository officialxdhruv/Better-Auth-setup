import prisma from "@/lib/prisma";
import { faker } from "@faker-js/faker";

async function main() {
    // Create 10 Users
    const users = [];
    for (let i = 0; i < 10; i++) {
        const user = await prisma.user.create({
            data: {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                emailVerified: true,
                username: faker.internet.username(),
                displayUsername: faker.internet.username(),
            },
        });
        users.push(user);
    }

    // Create 15 Questions
    const questions = [];
    for (let i = 0; i < 15; i++) {
        const question = await prisma.question.create({
            data: {
                title: faker.lorem.sentence(),
                excerpt: faker.lorem.sentences(2),
                content: faker.lorem.paragraphs(2),
                tags: faker.lorem.words(3).split(" "),
                authorId: users[i % users.length].id,
            },
        });
        questions.push(question);
    }

    // Create 30 Answers
    const answers = [];
    for (let i = 0; i < 30; i++) {
        const answer = await prisma.answer.create({
            data: {
                content: faker.lorem.paragraph(),
                authorId: users[i % users.length].id,
                questionId: questions[i % questions.length].id,
            },
        });
        answers.push(answer);
    }

    // Create 40 Comments
    for (let i = 0; i < 40; i++) {
        const isCommentOnQuestion = Math.random() < 0.5;
        await prisma.comment.create({
            data: {
                content: faker.lorem.sentence(),
                userId: users[i % users.length].id,
                ...(isCommentOnQuestion
                    ? { questionId: questions[i % questions.length].id }
                    : { answerId: answers[i % answers.length].id }),
            },
        });
    }

    // Create 25 Question Votes
    for (let i = 0; i < 25; i++) {
        await prisma.questionVote.create({
            data: {
                userId: users[i % users.length].id,
                questionId: questions[i % questions.length].id,
                value: Math.random() > 0.2 ? 1 : -1,
            },
        });
    }

    // Create 25 Answer Votes
    for (let i = 0; i < 25; i++) {
        await prisma.answerVote.create({
            data: {
                userId: users[i % users.length].id,
                answerId: answers[i % answers.length].id,
                value: Math.random() > 0.2 ? 1 : -1,
            },
        });
    }

    // Create follow relationships
    for (let i = 0; i < users.length; i++) {
        const follower = users[i];
        const following = users[(i + 1) % users.length];
        await prisma.follows.create({
            data: {
                followerId: follower.id,
                followingId: following.id,
            },
        });
    }

    console.log("✅ Seeded database with dummy data.");
}

main()
    .catch((e) => {
        console.error("❌ Error seeding data:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
