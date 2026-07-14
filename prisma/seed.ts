/**
 * Seed a handful of sample leads so the database has realistic rows to
 * develop against. Run with: npm run db:seed
 */
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

try {
  process.loadEnvFile(".env");
} catch {
  // no .env — rely on platform env
}

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is not set");

const db = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

async function main() {
  await db.lead.createMany({
    skipDuplicates: true,
    data: [
      {
        refCode: "ML-100001",
        type: "quick_apply",
        payload: { mobile: "9876543210" },
        source: "/apply",
        consentGiven: true,
        consentTextVersion: "seed",
        consentTimestamp: new Date(),
      },
      {
        refCode: "ML-100002",
        type: "personal_loan",
        payload: {
          firstName: "Ravi",
          lastName: "Kumar",
          pan: "ABCDE1234F",
          dob: "15/06/1992",
          pincode: "600094",
          company: "Sample Industries",
          monthlyIncome: 55000,
          loanAmount: 400000,
          tenureMonths: 36,
          mobile: "9876543211",
          consent: true,
        },
        source: "/products/personal-loan/application",
        consentGiven: true,
        consentTextVersion: "seed",
        consentTimestamp: new Date(),
        status: "contacted",
      },
      {
        refCode: "CS-100003",
        type: "credit_score",
        payload: {
          name: "Meena Iyer",
          pan: "FGHIJ5678K",
          mobile: "9876543212",
          consent: true,
        },
        source: "/credit-score-checker",
        consentGiven: true,
        consentTextVersion: "seed",
        consentTimestamp: new Date(),
      },
      {
        refCode: "PT-100004",
        type: "partner",
        payload: {
          name: "Suresh Sharma",
          mobile: "9876543213",
          email: "suresh@example.com",
          profession: "Ex-banker",
          city: "Chennai",
        },
        source: "/partner-with-us",
        consentGiven: true,
        consentTextVersion: "seed",
        consentTimestamp: new Date(),
      },
      {
        refCode: "CT-100005",
        type: "contact",
        payload: {
          name: "Anita Rao",
          mobile: "9876543214",
          email: "",
          topic: "Business loan",
          message: "Looking for working capital options for my boutique.",
        },
        source: "/contact-us",
        consentGiven: true,
        consentTextVersion: "seed",
        consentTimestamp: new Date(),
      },
    ],
  });
  const count = await db.lead.count();
  console.log(`Seed complete — ${count} leads in the table.`);
}

main().finally(() => db.$disconnect());
