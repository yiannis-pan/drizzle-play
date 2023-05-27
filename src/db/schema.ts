import { mysqlTable, serial, varchar, timestamp } from "drizzle-orm/mysql-core";

export const posts = mysqlTable("posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  createadAt: timestamp("createdAt").defaultNow(),
});
