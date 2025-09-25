import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  uuid,
  varchar,
  integer,
  decimal,
  jsonb,
  primaryKey,
  index
} from "drizzle-orm/pg-core";

// Better-auth specific schema for authentication
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull()
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" })
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull()
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull()
});

// Custom application schema
export const collections = pgTable("collection", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  name: varchar("name", { length: 256 }).notNull(),
  description: text("description"),

  // Timestamps
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull()
});

export const bookmarks = pgTable("bookmark", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  collectionId: uuid("collection_id").references(() => collections.id, {
    onDelete: "set null"
  }),
  // tags: uuid("tags_id")
  //   .array()
  //   .notNull()
  //   .default([])
  //   .references(() => tags.id, {
  //     onDelete: "set null"
  //   }),
  // tags: text("tags").array().default([]).notNull(),

  url: text("url").notNull(),
  name: text("name").notNull(),
  description: text("description"),

  isArchived: boolean("is_archived").default(false).notNull(),
  isFavorite: boolean("is_favorite").default(false).notNull(),
  readingProgress: decimal("reading_progress", {
    precision: 5,
    scale: 4
  }).default("0"),
  readAt: timestamp("read_at", { withTimezone: true }),

  // Metadata
  domain: text("domain"),
  title: text("title"),
  canonicalUrl: text("canonical_url"),
  siteName: varchar("site_name", { length: 256 }),
  author: varchar("author", { length: 256 }),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  imageURL: text("image_url"),
  locale: varchar("locale", { length: 64 }),
  type: varchar("type", { length: 64 }),
  excerpt: text("excerpt"),

  // Content
  content: text("content"),
  contentHtml: text("content_html"),
  wordCount: integer("word_count"),
  readingTimeMinutes: integer("reading_time_minutes"),

  // Media
  featuredImageUrl: text("featured_image_url"),
  images: jsonb("images").default([]),

  // Timestamps
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull()
});

export const bookmarksToTags = pgTable(
  "bookmarks_to_tags",
  {
    bookmarkId: uuid("bookmark_id")
      .notNull()
      .references(() => bookmarks.id, { onDelete: "cascade" }),
    tagId: uuid("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull()
  },
  table => [
    primaryKey({ columns: [table.bookmarkId, table.tagId] }),
    index("idx_bookmark_tags_bookmark_id").on(table.bookmarkId),
    index("idx_bookmark_tags_tag_id").on(table.tagId)
  ]
);

export const tags = pgTable("tag", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  name: varchar("name", { length: 256 }).notNull(),
  description: text("description"),

  // Timestamps
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull()
});

export const collectionRelations = relations(collections, ({ many, one }) => ({
  user: one(user, {
    fields: [collections.userId],
    references: [user.id]
  }),
  bookmarks: many(bookmarks)
}));

export const bookmarkRelations = relations(bookmarks, ({ one, many }) => ({
  user: one(user, {
    fields: [bookmarks.userId],
    references: [user.id]
  }),
  collection: one(collections, {
    fields: [bookmarks.collectionId],
    references: [collections.id]
  }),
  bookmarksToTags: many(bookmarksToTags)
}));

export const bookmarksToTagsRelations = relations(
  bookmarksToTags,
  ({ one }) => ({
    bookmark: one(bookmarks, {
      fields: [bookmarksToTags.bookmarkId],
      references: [bookmarks.id]
    }),
    tag: one(tags, {
      fields: [bookmarksToTags.tagId],
      references: [tags.id]
    })
  })
);

export const tagRelations = relations(tags, ({ one, many }) => ({
  user: one(user, {
    fields: [tags.userId],
    references: [user.id]
  }),
  bookmarksToTags: many(bookmarksToTags)
}));

// Type exports for use in application
export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
export type Bookmark = typeof bookmarks.$inferSelect;
export type NewBookmark = typeof bookmarks.$inferInsert;
export type Collection = typeof collections.$inferSelect;
export type NewCollection = typeof collections.$inferInsert;
export type Tag = typeof tags.$inferSelect;
export type NewTag = typeof tags.$inferInsert;
export type BookmarkTag = typeof bookmarksToTags.$inferSelect;
export type NewBookmarkTag = typeof bookmarksToTags.$inferInsert;
// export type Highlight = typeof highlights.$inferSelect;
// export type NewHighlight = typeof highlights.$inferInsert;
// export type UserSession = typeof userSessions.$inferSelect;
// export type NewUserSession = typeof userSessions.$inferInsert;
// export type ImportJob = typeof importJobs.$inferSelect;
// export type NewImportJob = typeof importJobs.$inferInsert;
