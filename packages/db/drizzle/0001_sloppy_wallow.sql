ALTER TABLE "bookmark" ALTER COLUMN "title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "bookmark" ADD COLUMN "document_title" text;--> statement-breakpoint
ALTER TABLE "bookmark" ADD COLUMN "document_description" text;--> statement-breakpoint
ALTER TABLE "bookmark" ADD COLUMN "og_title" text;--> statement-breakpoint
ALTER TABLE "bookmark" ADD COLUMN "og_description" text;--> statement-breakpoint
ALTER TABLE "bookmark" ADD COLUMN "og_image" text;--> statement-breakpoint
ALTER TABLE "bookmark" ADD COLUMN "og_url" text;--> statement-breakpoint
ALTER TABLE "bookmark" ADD COLUMN "og_type" text;--> statement-breakpoint
ALTER TABLE "bookmark" ADD COLUMN "twitter_title" text;--> statement-breakpoint
ALTER TABLE "bookmark" ADD COLUMN "twitter_description" text;--> statement-breakpoint
ALTER TABLE "bookmark" ADD COLUMN "twitter_image" text;--> statement-breakpoint
ALTER TABLE "bookmark" ADD COLUMN "twitter_card" text;--> statement-breakpoint
ALTER TABLE "bookmark" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "bookmark" DROP COLUMN "description";--> statement-breakpoint
ALTER TABLE "bookmark" DROP COLUMN "canonical_url";--> statement-breakpoint
ALTER TABLE "bookmark" DROP COLUMN "site_name";--> statement-breakpoint
ALTER TABLE "bookmark" DROP COLUMN "author";--> statement-breakpoint
ALTER TABLE "bookmark" DROP COLUMN "published_at";--> statement-breakpoint
ALTER TABLE "bookmark" DROP COLUMN "image_url";--> statement-breakpoint
ALTER TABLE "bookmark" DROP COLUMN "locale";--> statement-breakpoint
ALTER TABLE "bookmark" DROP COLUMN "type";--> statement-breakpoint
ALTER TABLE "bookmark" DROP COLUMN "excerpt";--> statement-breakpoint
ALTER TABLE "bookmark" DROP COLUMN "featured_image_url";--> statement-breakpoint
ALTER TABLE "bookmark" DROP COLUMN "images";--> statement-breakpoint
ALTER TABLE "bookmark" ADD CONSTRAINT "uq_bookmarks_userId_url" UNIQUE("user_id","url");