-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Poll" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Poll_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Option" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "pollId" TEXT NOT NULL,
    CONSTRAINT "Option_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Poll" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Vote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "pollId" TEXT NOT NULL,
    "optionId" TEXT NOT NULL,
    CONSTRAINT "Vote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Vote_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Poll" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Vote_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Option" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
