-- CreateTable
CREATE TABLE "DJ" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tagline" TEXT,
    "bio" TEXT,
    "location" TEXT,
    "genres" TEXT,
    "highlights" TEXT,
    "labels" TEXT,
    "email" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Hero" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "djId" TEXT NOT NULL,
    "backgroundImage" TEXT,
    "backgroundType" TEXT NOT NULL DEFAULT 'image',
    "logo" TEXT,
    "showLogo" BOOLEAN NOT NULL DEFAULT true,
    "useTextInstead" BOOLEAN NOT NULL DEFAULT false,
    "artistName" TEXT,
    "tagline" TEXT,
    "position" TEXT NOT NULL DEFAULT 'center',
    "logoSize" INTEGER NOT NULL DEFAULT 120,
    "overlayOpacity" REAL NOT NULL DEFAULT 0.4,
    "showButtons" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Hero_djId_fkey" FOREIGN KEY ("djId") REFERENCES "DJ" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Appearance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "djId" TEXT NOT NULL,
    "primaryColor" TEXT NOT NULL DEFAULT '#ffffff',
    "backgroundColor" TEXT NOT NULL DEFAULT '#000000',
    "textColor" TEXT NOT NULL DEFAULT '#ffffff',
    "font" TEXT NOT NULL DEFAULT 'Inter',
    "backgroundType" TEXT NOT NULL DEFAULT 'solid',
    "backgroundImage" TEXT,
    "textureImage" TEXT,
    "textureOpacity" REAL NOT NULL DEFAULT 0.5,
    "stylePreset" TEXT NOT NULL DEFAULT 'dark',
    CONSTRAINT "Appearance_djId_fkey" FOREIGN KEY ("djId") REFERENCES "DJ" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "djId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "city" TEXT NOT NULL,
    "venue" TEXT NOT NULL,
    "promoter" TEXT NOT NULL,
    CONSTRAINT "Event_djId_fkey" FOREIGN KEY ("djId") REFERENCES "DJ" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MusicLink" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "djId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "MusicLink_djId_fkey" FOREIGN KEY ("djId") REFERENCES "DJ" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GalleryImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "djId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "GalleryImage_djId_fkey" FOREIGN KEY ("djId") REFERENCES "DJ" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RiderItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "djId" TEXT NOT NULL,
    "item" TEXT NOT NULL,
    "requirement" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "RiderItem_djId_fkey" FOREIGN KEY ("djId") REFERENCES "DJ" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "djId" TEXT NOT NULL,
    "email" TEXT,
    "instagram" TEXT,
    "soundcloud" TEXT,
    "spotify" TEXT,
    "youtube" TEXT,
    "beatport" TEXT,
    "apple" TEXT,
    "showBookingButton" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Contact_djId_fkey" FOREIGN KEY ("djId") REFERENCES "DJ" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Sections" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "djId" TEXT NOT NULL,
    "about" BOOLEAN NOT NULL DEFAULT true,
    "events" BOOLEAN NOT NULL DEFAULT true,
    "music" BOOLEAN NOT NULL DEFAULT true,
    "gallery" BOOLEAN NOT NULL DEFAULT true,
    "rider" BOOLEAN NOT NULL DEFAULT true,
    "contact" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Sections_djId_fkey" FOREIGN KEY ("djId") REFERENCES "DJ" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "DJ_slug_key" ON "DJ"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Hero_djId_key" ON "Hero"("djId");

-- CreateIndex
CREATE UNIQUE INDEX "Appearance_djId_key" ON "Appearance"("djId");

-- CreateIndex
CREATE INDEX "Event_djId_idx" ON "Event"("djId");

-- CreateIndex
CREATE INDEX "MusicLink_djId_idx" ON "MusicLink"("djId");

-- CreateIndex
CREATE INDEX "GalleryImage_djId_idx" ON "GalleryImage"("djId");

-- CreateIndex
CREATE INDEX "RiderItem_djId_idx" ON "RiderItem"("djId");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_djId_key" ON "Contact"("djId");

-- CreateIndex
CREATE UNIQUE INDEX "Sections_djId_key" ON "Sections"("djId");
