CREATE TABLE "users" (
	"id" serial NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"name" TEXT NOT NULL,
	"pictureUrl" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "sessions" (
	"id" serial NOT NULL,
	"userId" integer NOT NULL,
	"token" TEXT NOT NULL UNIQUE,
	CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "posts" (
	"id" serial NOT NULL,
	"link" TEXT NOT NULL,
	"linkTitle" TEXT NOT NULL,
	"linkDescription" TEXT NOT NULL,
	"linkImage" TEXT NOT NULL,
	"text" TEXT NOT NULL,
	"authorId" integer NOT NULL,
	"time" TIMESTAMP NOT NULL DEFAULT NOW(),
	CONSTRAINT "posts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "likes" (
	"id" serial NOT NULL,
	"postId" integer NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "likes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "hashtags" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL UNIQUE,
	CONSTRAINT "hashtags_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "hashtagsPosts" (
	"id" serial NOT NULL,
	"hashtagId" integer NOT NULL,
	"postId" integer NOT NULL,
	CONSTRAINT "hashtagsPosts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "followers" (
	"id" serial NOT NULL,
	"followedId" integer NOT NULL,
	"followerId" integer NOT NULL,
	CONSTRAINT "followers_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "comments" (
	"id" serial NOT NULL,
	"text" TEXT NOT NULL,
	"postId" integer NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "comments_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "reposts" (
	"id" serial NOT NULL,
	"userId" integer NOT NULL,
	"postId" integer NOT NULL,
	CONSTRAINT "reposts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");

ALTER TABLE "posts" ADD CONSTRAINT "posts_fk0" FOREIGN KEY ("authorId") REFERENCES "users"("id");

ALTER TABLE "likes" ADD CONSTRAINT "likes_fk0" FOREIGN KEY ("postId") REFERENCES "posts"("id");
ALTER TABLE "likes" ADD CONSTRAINT "likes_fk1" FOREIGN KEY ("userId") REFERENCES "users"("id");


ALTER TABLE "hashtagsPosts" ADD CONSTRAINT "hashtagsPosts_fk0" FOREIGN KEY ("hashtagId") REFERENCES "hashtags"("id");
ALTER TABLE "hashtagsPosts" ADD CONSTRAINT "hashtagsPosts_fk1" FOREIGN KEY ("postId") REFERENCES "posts"("id");

ALTER TABLE "followers" ADD CONSTRAINT "followers_fk0" FOREIGN KEY ("followedId") REFERENCES "users"("id");
ALTER TABLE "followers" ADD CONSTRAINT "followers_fk1" FOREIGN KEY ("followerId") REFERENCES "users"("id");

ALTER TABLE "comments" ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("postId") REFERENCES "posts"("id");
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk1" FOREIGN KEY ("userId") REFERENCES "users"("id");

ALTER TABLE "reposts" ADD CONSTRAINT "reposts_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");
ALTER TABLE "reposts" ADD CONSTRAINT "reposts_fk1" FOREIGN KEY ("postId") REFERENCES "posts"("id");
