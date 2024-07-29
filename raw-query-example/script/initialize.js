const oracledb = require("oracledb");
const connection = require("../config/database");

async function initializeData() {
    try {
      const conn = await oracledb.getConnection(connection);
  
      // Create tables if they do not exist
      const createCategoriesTable = `
        BEGIN
          EXECUTE IMMEDIATE 'CREATE TABLE "categories" (
            "category_id" NUMBER,
            "category_name" VARCHAR2(255)
          )';
        EXCEPTION
          WHEN OTHERS THEN
            IF SQLCODE != -955 THEN
              RAISE;
            END IF;
        END;
      `;
      await conn.execute(createCategoriesTable);
  
      const createPostsTable = `
        BEGIN
          EXECUTE IMMEDIATE 'CREATE TABLE "posts" (
            "post_id" NUMBER,
            "category_id" NUMBER,
            "post_title" VARCHAR2(255),
            "post_content" VARCHAR2(255)
          )';
        EXCEPTION
          WHEN OTHERS THEN
            IF SQLCODE != -955 THEN
              RAISE;
            END IF;
        END;
      `;
      await conn.execute(createPostsTable);
  
      // Create categories
      const insertCategories = `
        INSERT INTO "categories" ("category_id", "category_name")
        VALUES (:category_id, :category_name)
      `;
      const categoriesData = [
        { category_id: 1, category_name: 'Technology' },
        { category_id: 2, category_name: 'Sports' },
        { category_id: 3, category_name: 'Travel' }
      ];
  
      const resultCategories = await conn.executeMany(insertCategories, categoriesData);
      console.log('Categories inserted:', resultCategories.rowsAffected);
  
      // Commit the transaction
      await conn.commit();
  
      // Create posts
      const insertPosts = `
        INSERT INTO "posts" ("post_id", "category_id", "post_title", "post_content")
        VALUES (:post_id, :category_id, :post_title, :post_content)
      `;
      const postsData = [
        { post_id: 1, category_id: 1, post_title: 'Tech News', post_content: 'lorem' },
        { post_id: 2, category_id: 1, post_title: 'Coding Tips', post_content: 'lorem' },
        { post_id: 3, category_id: 2, post_title: 'Football Match', post_content: 'lorem' },
      ];
  
      const resultPosts = await conn.executeMany(insertPosts, postsData);
      console.log('Posts inserted:', resultPosts.rowsAffected);
  
      // Commit the transaction
      await conn.commit();
  
      console.log('Data initialized successfully');
  
      await conn.close();
    } catch (err) {
      console.error(err);
    }
  }
  
  initializeData()