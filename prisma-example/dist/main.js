"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function queryData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Query posts with category join
            const postsWithCategory = yield prisma.post.findMany({
                include: {
                    category: true
                }
            });
            console.log('Posts with categories:', JSON.stringify(postsWithCategory, null, 2));
        }
        catch (err) {
            console.error(err);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
// async function savePost(data: any) {
//     try {
//         const modPost: Prisma.PostCreateInput = {
//             title: data.title,
//             content: data.content,
//             category: {
//                 connect: { id: data.category?.id } // Ensure data.category is an object with an id field
//             }
//         }
//       const newPost = await prisma.post.create({
//         data: modPost
//       });
//       console.log('New post created:', newPost);
//     } catch (err) {
//       console.error('Error creating post:', err);
//     } finally {
//       await prisma.$disconnect();
//     }
//   }
//   // Example usage
//   const newPostData = {
//     title: 'New Post Title',
//     content: 'New post content',
//     category: {
//        id: 1  // Assuming category with ID 1 exists
//     }
//   };
//   savePost(newPostData);
queryData();
// Advantages of Using Prisma Over TypeORM
// Type Safety:
// Prisma: Automatically generates a fully type-safe client based on your schema. This ensures that your database queries are type-checked at compile time, reducing runtime errors.
// TypeORM: While TypeORM has good TypeScript support, it doesn't generate a type-safe client automatically. You need to define types manually, which can lead to inconsistencies.
// 2. Developer Experience:
// Prisma: Provides a modern and intuitive API for database operations. The Prisma Client is easy to use and integrates well with modern JavaScript/TypeScript practices.
// TypeORM: Has a more traditional ORM API, which can be more complex and less intuitive, especially for developers new to ORMs.
// Schema Management:
// Prisma: Uses a declarative schema definition file (schema.prisma) to define your data model. This file is the single source of truth, and Prisma automatically generates migrations based on changes to this file.
// TypeORM: Uses decorators in your entity classes to define the schema. While this is powerful, it can become cumbersome in large projects. Migrations need to be managed separately.
// Migrations:
// Prisma: Automatically generates and applies migrations based on changes to the schema file. This makes it easy to keep your database schema in sync with your application code.
// TypeORM: Requires manual creation and management of migrations. While TypeORM provides tools to generate migrations, it can be more error-prone and less seamless compared to Prisma.
// Performance:
// Prisma: Optimized for performance with a focus on efficient database queries. The Prisma Client is designed to minimize the number of database queries and reduce latency.
// TypeORM: While performant, it can sometimes generate less efficient queries, especially in complex scenarios with multiple relations.
// 6. Community and Ecosystem:
// Prisma: Has a rapidly growing community and ecosystem. Prisma's documentation is comprehensive, and the community is active in providing support and building plugins.
// TypeORM: Has been around longer and has a mature ecosystem. However, the community is not as active as Prisma's, and the documentation can be less comprehensive.
