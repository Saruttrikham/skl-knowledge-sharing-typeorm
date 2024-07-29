"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Category_1 = require("./entity/Category");
const Post_1 = require("./entity/Post");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "oracle",
    host: "localhost",
    port: 1521, // Oracle default port
    connectString: "localhost:1521/orcl",
    username: "demo",
    password: "demo",
    database: "demo",
    synchronize: true,
    logging: true,
    dropSchema: true,
    entities: [Post_1.Post, Category_1.Category],
    subscribers: [],
    migrations: ['src/migration/*.ts'], // Ensure this path is correct
    cache: {
        type: "database",
        tableName: "configurable-table-query-result-cache",
    },
});
exports.AppDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization", err);
});
