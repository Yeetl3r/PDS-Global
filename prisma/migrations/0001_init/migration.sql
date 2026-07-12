-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "LeadType" AS ENUM ('quick_apply', 'personal_loan', 'credit_score', 'partner', 'contact');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('new', 'contacted', 'in_progress', 'closed', 'spam');

-- CreateEnum
CREATE TYPE "GrievanceKind" AS ENUM ('grievance', 'consent_revocation');

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "refCode" TEXT NOT NULL,
    "type" "LeadType" NOT NULL,
    "payload" JSONB NOT NULL,
    "status" "LeadStatus" NOT NULL DEFAULT 'new',
    "source" TEXT,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "utmTerm" TEXT,
    "utmContent" TEXT,
    "ipHash" TEXT,
    "userAgent" TEXT,
    "consentGiven" BOOLEAN NOT NULL DEFAULT false,
    "consentTextVersion" TEXT,
    "consentTimestamp" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrievanceTicket" (
    "id" TEXT NOT NULL,
    "refCode" TEXT NOT NULL,
    "kind" "GrievanceKind" NOT NULL,
    "payload" JSONB NOT NULL,
    "status" "LeadStatus" NOT NULL DEFAULT 'new',
    "ipHash" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GrievanceTicket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lead_refCode_key" ON "Lead"("refCode");

-- CreateIndex
CREATE INDEX "Lead_type_createdAt_idx" ON "Lead"("type", "createdAt");

-- CreateIndex
CREATE INDEX "Lead_ipHash_createdAt_idx" ON "Lead"("ipHash", "createdAt");

-- CreateIndex
CREATE INDEX "Lead_status_createdAt_idx" ON "Lead"("status", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "GrievanceTicket_refCode_key" ON "GrievanceTicket"("refCode");

-- CreateIndex
CREATE INDEX "GrievanceTicket_kind_createdAt_idx" ON "GrievanceTicket"("kind", "createdAt");
