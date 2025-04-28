-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('PENDING', 'ACCEPTED', 'TLE', 'WRONG_ANSWER', 'ERROR');

-- CreateEnum
CREATE TYPE "DiscussionType" AS ENUM ('FEEDBACK', 'QUESTION', 'TIP');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "GenderType" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "Id" TEXT NOT NULL,
    "userId" TEXT,
    "profileId" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "DailyProblems" (
    "Id" TEXT NOT NULL,

    CONSTRAINT "DailyProblems_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "DailyProblemDate" (
    "Id" TEXT NOT NULL,
    "dailyProblemId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "problemId" TEXT NOT NULL,

    CONSTRAINT "DailyProblemDate_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "Id" TEXT NOT NULL,
    "Name" TEXT,
    "location" TEXT,
    "summary" TEXT,
    "Gender" "GenderType" NOT NULL DEFAULT 'MALE',
    "work" TEXT,
    "education" TEXT,
    "skills" TEXT[],
    "socialLinkId" TEXT NOT NULL,
    "points" TEXT[],
    "avatar" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "SocialLinks" (
    "Id" TEXT NOT NULL,
    "website" TEXT,
    "github" TEXT,
    "linkedin" TEXT,
    "twitter" TEXT,

    CONSTRAINT "SocialLinks_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Question" (
    "Id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "example" TEXT[],
    "constraints" TEXT[],
    "topics" TEXT[],
    "companies" TEXT[],
    "acceptancerate" TEXT,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "dislikes" INTEGER NOT NULL DEFAULT 0,
    "problemdiscussionId" TEXT,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "ProblemDiscussion" (
    "Id" TEXT NOT NULL,
    "discussionId" TEXT NOT NULL,

    CONSTRAINT "ProblemDiscussion_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Discussion" (
    "Id" TEXT NOT NULL,
    "query" TEXT NOT NULL,
    "upvotes" INTEGER NOT NULL,
    "downvotes" INTEGER NOT NULL,
    "replies" TEXT[],
    "problemDiscussionId" TEXT,
    "type" "DiscussionType" NOT NULL DEFAULT 'QUESTION',

    CONSTRAINT "Discussion_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "UserOnJunction" (
    "Id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,

    CONSTRAINT "UserOnJunction_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Submission" (
    "Id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "errorType" TEXT,
    "status" "SubmissionStatus" NOT NULL DEFAULT 'PENDING',
    "time" INTEGER NOT NULL DEFAULT 0,
    "message" TEXT,
    "testCaseLength" INTEGER,
    "acceptedtestCase" INTEGER,
    "wrongTestCaseLength" INTEGER,
    "memoryUsed" INTEGER NOT NULL DEFAULT 0,
    "expectedInput" TEXT[],
    "expectedOutput" TEXT,
    "userOutput" TEXT,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "TestCase" (
    "Id" TEXT NOT NULL,
    "submissionId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "time" TEXT,
    "memory" TEXT,
    "Input" TEXT[],
    "output" TEXT,

    CONSTRAINT "TestCase_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DailyProblemDate_date_key" ON "DailyProblemDate"("date");

-- CreateIndex
CREATE UNIQUE INDEX "TestCase_token_key" ON "TestCase"("token");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyProblemDate" ADD CONSTRAINT "DailyProblemDate_dailyProblemId_fkey" FOREIGN KEY ("dailyProblemId") REFERENCES "DailyProblems"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_socialLinkId_fkey" FOREIGN KEY ("socialLinkId") REFERENCES "SocialLinks"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_problemdiscussionId_fkey" FOREIGN KEY ("problemdiscussionId") REFERENCES "ProblemDiscussion"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discussion" ADD CONSTRAINT "Discussion_problemDiscussionId_fkey" FOREIGN KEY ("problemDiscussionId") REFERENCES "ProblemDiscussion"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnJunction" ADD CONSTRAINT "UserOnJunction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnJunction" ADD CONSTRAINT "UserOnJunction_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
