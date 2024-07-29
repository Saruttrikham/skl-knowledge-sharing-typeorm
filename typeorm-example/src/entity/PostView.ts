import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
  expression: `
    SELECT * FROM "post"
  `,
})
export class PostView {
  @ViewColumn()
  id: number;
}


// Data Security: You can restrict access to specific data by creating views that only show relevant information.   
// Simplified Queries: Complex queries can be encapsulated in a view, making it easier to use for other users.   
// Data Independence: Changes to underlying tables don't necessarily affect the view's structure.
// Performance Optimization: In some cases, views can improve query performance by using indexes on the underlying tables.   
