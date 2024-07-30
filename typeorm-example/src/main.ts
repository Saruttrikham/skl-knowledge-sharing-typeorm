import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { Category } from "./entity/Category";
import { Post } from "./entity/Post";
import { createClient } from "redis";

async function main(): Promise<void> {
  try {
    await AppDataSource.initialize();

    // Create categories
    const categoryRepository = AppDataSource.getRepository(Category);
    const categories = await categoryRepository.save([
      { name: "Technology" },
      { name: "Sports" },
      { name: "Travel" },
    ]);
    console.log("Categories inserted");

    // Create posts
    const postRepository = AppDataSource.getRepository(Post);
    await postRepository.save([
      { title: "Tech News", content: "lorem", category: categories[0] },
      { title: "Coding Tips", content: "lorem", category: categories[0] },
      { title: "Football Match", content: "lorem", category: categories[1] },
    ]);

    await AppDataSource.queryResultCache.remove(["postCate"]);

    console.log("Posts inserted");

    // Query posts with category join and cache
    const postsWithCategory = await postRepository
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.category", "category")
      // .cache("postCate", 20000)
      .getMany();

    console.log(postsWithCategory.length);

    // console.log(JSON.stringify(postsWithCategory, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await AppDataSource.destroy();
  }
}

main();
