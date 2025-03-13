CREATE TYPE "public"."importance_level" AS ENUM('HIGH', 'MEDIUM', 'LOW');--> statement-breakpoint
CREATE TABLE "gifts" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"product_name" text NOT NULL,
	"description" text,
	"price" numeric(10, 2),
	"importance_level" "importance_level" DEFAULT 'MEDIUM' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
