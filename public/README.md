# 1. Introduction

## Background and Motivation

In the rapidly growing tech ecosystem, developers frequently encounter challenges while coding and often turn to online forums for solutions. However, many existing platforms are either cluttered, too generalized, or lack a community-driven focus specifically for coders. Blaze Code was conceptualized to bridge this gap by creating a dedicated platform where developers can ask coding-related questions and receive high-quality, community-curated answers.

The motivation behind Blaze Code stems from a desire to build a space that not only promotes knowledge sharing but also encourages collaborative learning. This project is technically relevant in today’s developer-centric world, and academically valuable as it involves implementing full-stack web development skills using cutting-edge technologies like Next.js, Prisma, and PostgreSQL.

## Problem Statement

Current question-and-answer platforms for programmers often suffer from poor content moderation, lack of structure, and minimal engagement for new contributors. There is a need for a clean, focused platform that offers a better user experience, supports modern web standards, and fosters a vibrant developer community. Blaze Code aims to address this by offering a seamless, fast, and intuitive solution for coders to interact and learn from one another.

## Objectives

- To design and develop a full-stack web application for code-based Q&A using Next.js.
- To implement secure user authentication using NextAuth.
- To enable users to post questions, provide answers, and interact through tags and content filters.
- To ensure clean UI/UX with Tailwind CSS and markdown support for rendering content.
- To manage data efficiently using Prisma ORM with PostgreSQL.

## Scope of the Project

**Included in the scope:**
- User registration and authentication system.
- Posting and answering of questions.
- Tag-based filtering and search functionality.
- Markdown rendering for question and answer formatting.

**Excluded from the scope:**
- Real-time chat or messaging features.
- Advanced moderation tools or AI-driven recommendations.
- Mobile app development.

## Organization of the Report

The report is structured as follows:

1. **Introduction:** Provides the background, problem statement, objectives, scope, and an overview of the report structure.
2. **Requirement Design:** Details the functional and non-functional requirements, along with technology stack choices.
3. **Methodology/Design:** Describes the system architecture, data models, and UI/UX design decisions.
4. **Implementation and Development:** Covers the actual development process, including backend, frontend, and integration of features.
5. **Testing:** Explains the testing strategies used to ensure functionality, performance, and security.
6. **Results and Analysis:** Presents the outcomes of the testing phase and evaluates how well the objectives were met.
7. **Challenges and Limitations:** Discusses obstacles faced during development and the current limitations of the system.
8. **Future Work:** Suggests possible improvements and additional features for subsequent versions of the platform.
9. **Conclusion:** Summarizes the entire project, highlighting the key takeaways.
10. **References:** Lists the resources, tools, and documentation referred to during the project.
11. **Appendices (Code):** Includes relevant code snippets or complete code references as part of the appendix.


# 2. Requirement Design

## Existing Technologies and Frameworks

The development of Blaze Code is informed by a careful selection of modern technologies that are well-suited for building a scalable, maintainable, and user-friendly web application. The following technologies and tools were chosen based on their robustness, community support, and alignment with the project’s requirements:

- **Next.js:** A powerful React framework used for both server-side rendering and static site generation. It provides optimized performance, seamless routing, and full-stack capabilities, making it ideal for building a feature-rich coding platform like Blaze Code.

- **Better Auth (NextAuth):** Used for secure and flexible user authentication. It supports various providers and simplifies session management, ensuring a smooth login and registration experience for users.

- **Resend:** An email service API that facilitates sending transactional emails such as sign-up confirmations and password resets. Its clean integration with Next.js improves communication workflows within the app.

- **PostgreSQL:** A reliable, open-source relational database system chosen for its performance, support for advanced queries, and strong consistency. It handles the storage of user data, questions, answers, and tags.

- **Prisma ORM:** An elegant and developer-friendly ORM for interacting with the PostgreSQL database. Prisma abstracts complex SQL operations and allows for type-safe, efficient, and readable data queries.

## Influence on Project Design

These technologies significantly shaped the system design and overall project direction. Next.js allowed for the development of both frontend and backend logic in a unified environment, reducing development overhead. Prisma streamlined the process of defining and accessing the database schema, while PostgreSQL ensured data integrity and scalability.

Better Auth provided a robust authentication system out-of-the-box, reducing the time and complexity of building a secure login flow. Resend contributed to enhancing the user experience by adding email-based interactions without setting up an external SMTP server.

By integrating these modern tools, Blaze Code maintains a clean architecture, scalable infrastructure, and a smooth user experience tailored to the needs of the developer community.


# 4. Implementation and Development

## Development Environment Setup

The development environment for Blaze Code was configured to support full-stack web development with seamless integration between backend and frontend components. Below are the key configurations:

### Hardware:
- **Processor:** Intel Core i5 / AMD Ryzen 5 or higher
- **RAM:** Minimum 8 GB
- **Storage:** SSD recommended for faster build times

### Software:
- **Operating System:** Windows 11 / macOS / Ubuntu 22.04
- **Code Editor:** Visual Studio Code with recommended extensions (ESLint, Prettier, Prisma)
- **Node.js:** v18+
- **Package Manager:** npm or yarn
- **Database:** PostgreSQL 14
- **Version Control:** Git with GitHub for repository management
- **Email API:** Resend for transactional email communication
- **Authentication:** NextAuth for secure user sign-in
- **ORM:** Prisma for database management

## Description of Modules and Features

### 1. **User Authentication**
- Implemented using NextAuth with email/password and social login providers.
- Session management with JWTs.
- Email verification via Resend.

### 2. **Question Posting**
- Users can post questions with a title, detailed content, and relevant tags.
- Rich content support using Markdown rendering.

### 3. **Answering Questions**
- Registered users can submit answers.
- Answers are listed under their respective questions with timestamps.

### 4. **Tag System**
- Questions can be categorized using tags.
- Tags are clickable, enabling users to filter questions by specific topics.
- Helps organize content and improve discoverability.

### 5. **Search and Filtering**
- Users can search for questions using keywords.
- Tag-based filtering allows browsing through categorized content.

### 6. **Markdown Support**
- Both questions and answers support Markdown syntax.
- Implemented using `react-markdown` with `rehype-raw` for safe and styled rendering.
- Styled using Tailwind CSS's `prose` class for readable formatting.

### 7. **Responsive UI**
- Built with Tailwind CSS for fast, consistent, and responsive design.
- Layout adapts well across devices—mobile, tablet, and desktop.

### 8. **Database Management**
- Prisma handles schema definition and database operations.
- Data models include `User`, `Question`, `Answer`, and `Tag`.
- PostgreSQL used for persistent and relational data storage.

## Code Snippets or Pseudo-Code

### Example: Creating a New Question

```ts
// /lib/actions/createQuestion.ts
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function createQuestion({ title, content, tags }) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  return await prisma.question.create({
    data: {
      title,
      content,
      tags: {
        connectOrCreate: tags.map((tag) => ({
          where: { name: tag },
          create: { name: tag },
        })),
      },
      author: { connect: { id: session.user.id } },
    },
  });
}
```