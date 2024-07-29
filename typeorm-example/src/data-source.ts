import "reflect-metadata";
import { DataSource } from "typeorm";
import { Category } from "./entity/Category";
import { Post } from "./entity/Post";
import { PostView } from "./entity/PostView";

export const AppDataSource = new DataSource({
  type: "oracle",
  host: "localhost",
  port: 1521, // Oracle default port
  connectString: "localhost:1521/orcl",
  username: "demo",
  password: "demo",
  database: "demo",
  synchronize: false,
  logging: true,
  dropSchema: false,
  entities: [Post, Category, PostView],
  subscribers: [],
  migrations: ["src/migration/*.ts"], // Ensure this path is correct
  cache: {
    type: "database",
    tableName: "configurable-table-query-result-cache",
  },
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
