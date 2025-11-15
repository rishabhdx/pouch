ALTER TABLE "tag" ADD COLUMN "slug" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "tag" DROP COLUMN "description";--> statement-breakpoint
ALTER TABLE "tag" ADD CONSTRAINT "uq_tags_userId_slug" UNIQUE("user_id","slug");