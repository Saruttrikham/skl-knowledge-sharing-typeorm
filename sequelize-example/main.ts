import sequelize from "./config/database";
import Category from "./models/Category";
import Post from "./models/Posts";

async function queryData(): Promise<void> {
  try {
    await sequelize.sync({ force: false });

    // Query posts with category join
    const postsWithCategory = await Post.findAll({
      include: [
        {
          model: Category,
        },
      ],
    });

    console.log(
      "Posts with categories:",
      JSON.stringify(postsWithCategory, null, 2)
    );
  } catch (err) {
    console.error(err);
  } finally {
    await sequelize.close();
  }
}

queryData();

// Disadvantages of Using Sequelize with TypeScript
// 1. Type Safety:
// While Sequelize provides TypeScript support, it is not as type-safe as some other ORMs like TypeORM or Prisma. You might still encounter situations where type inference is not as strong, leading to potential runtime errors.
// 2. Complexity:
// Sequelize's API can be complex and verbose, especially when dealing with associations and complex queries. This complexity can be exacerbated when adding TypeScript into the mix.
// Boilerplate Code:
// Defining models and their associations in Sequelize can require a lot of boilerplate code. This can be more cumbersome in TypeScript due to the need for additional type definitions and interfaces.
// 4. Migration Support:
// While Sequelize has migration support, it is not as robust or user-friendly as some other ORMs. Managing migrations in a TypeScript project can add another layer of complexity.
// 5. Community and Ecosystem:
// Although Sequelize has a large community, some other ORMs like TypeORM or Prisma have more active TypeScript-specific communities and better TypeScript documentation.
