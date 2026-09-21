import { relations } from "drizzle-orm";
import { date, index, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { categories } from "./category";

export const accomplishments = pgTable(
  "accomplishments",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, {
        onDelete: "cascade",
      }),
    categoryId: text("category_id")
      .notNull()
      .references(() => categories.id, {
        onDelete: "restrict",
      }),
    title: text("title").notNull(),
    date: date("date").notNull(),
    impact: text("impact"),
    notes: text("notes"),
    link: text("link"),
    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("accomplishments_user_id_idx").on(table.userId),
    index("accomplishments_category_id_idx").on(table.categoryId),
    index("accomplishments_user_date_idx").on(table.userId, table.date),
    index("accomplishments_user_category_idx").on(
      table.userId,
      table.categoryId,
    ),
  ],
);

export const accomplishmentsRelations = relations(
  accomplishments,
  ({ one }) => ({
    user: one(user, {
      fields: [accomplishments.userId],
      references: [user.id],
    }),
    category: one(categories, {
      fields: [accomplishments.categoryId],
      references: [categories.id],
    }),
  }),
);
