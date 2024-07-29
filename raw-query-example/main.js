const oracledb = require("oracledb");
const connection = require("./config/database");

oracledb.getConnection(connection, (err, conn) => {
  if (err) {
    console.error(err);
    return;
  }

  const rowSelect = ['p."post_id"', 'p."post_title"', 'p."post_content"', 'p."category_id"', 'c."category_name"']

  // ทำการ query ที่นี่
  const query = `
    SELECT ${rowSelect.join(', ')}
    FROM DEMO."posts" p
    INNER JOIN DEMO."categories" c
    ON c."category_id"  = p."category_id" 
  `;
  console.log("Executing query:", query);

  conn.execute(
    query,
    [], // พารามิเตอร์ของ query (ถ้ามี)
    (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
      const post = result.rows;
      console.log(post);

      const postsObject = result.rows.map((row) => ({
        post_id: row[0],
        post_title: row[1],
        post_content: row[2],
        category: {
          category_id: row[3],
          category_name: row[4],
        },
      }));

      console.log(postsObject, "postsObject");

      conn.close();
    }
  );
});

// result
// [
//   [ 1, 1, 'Tech News', '...' ],
//   [ 2, 1, 'Coding Tips', '...' ],
//   [ 3, 2, 'Football Match', '...' ]
// ]
