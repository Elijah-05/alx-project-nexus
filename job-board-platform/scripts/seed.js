#!/usr/bin/env node
/**
 * Simple seed script to populate the `jobs` collection.
 * Usage:
 *   MONGODB_URI="your-uri" node scripts/seed.js
 */
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config({ path: ".env" });

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error(
    "MONGODB_URI environment variable is required. See .env.example"
  );
  process.exit(1);
}

// Generate ~50 diverse sample jobs programmatically so the app has enough data
const titles = [
  "Frontend Engineer",
  "Backend Engineer",
  "Fullstack Developer",
  "Product Designer",
  "Data Scientist",
  "DevOps Engineer",
  "QA Engineer",
  "Mobile Engineer",
  "UX Researcher",
  "Project Manager",
  "Customer Success Manager",
  "Technical Writer",
  "Security Engineer",
  "Site Reliability Engineer",
  "Machine Learning Engineer",
  "Sales Engineer",
  "Marketing Specialist",
  "Business Analyst",
  "HR Generalist",
  "Support Engineer",
];

const companies = [
  "Acme Corp",
  "Beta Labs",
  "Design Studio",
  "QualityWorks",
  "Orbit Tech",
  "Nebula Inc",
  "Blue Peak",
  "Greenfield",
  "NorthStar",
  "Summit Labs",
];

const locations = [
  "Remote",
  "Hybrid",
  "San Francisco, CA",
  "New York, NY",
  "London, UK",
  "Berlin, Germany",
  "Toronto, Canada",
  "Austin, TX",
  "Seattle, WA",
  "Lagos, Nigeria",
  "Bangalore, India",
];

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];
const workTypes = ["On-site", "Remote", "Hybrid"];

const experienceLevels = ["Junior", "Mid Level", "Senior Level", "Lead"];

function randomExperienceLevels(arr) {
  // choose how many experience levels the job should have (1–4)
  const count = Math.floor(Math.random() * arr.length - 2) + 1;

  // shuffle array
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  // return first N items
  return shuffled.slice(0, count);
}

function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function lorem(words = 20) {
  const w =
    "innovative platform collaborate deliver product stakeholders engineers design improve performance scalable systems modern stack cloud infrastructure";
  const tokens = w.split(" ");
  let s = "";
  for (let i = 0; i < words; i++) {
    s += tokens[i % tokens.length] + " ";
  }
  return s.trim() + ".";
}

const sampleJobs = [];
const now = Date.now();

for (let i = 0; i < 50; i++) {
  const title = rand(titles);
  const company = rand(companies);
  const location = rand(locations);
  const jobType = rand(jobTypes);
  const workType = rand(workTypes);
  const experienceLevel = randomExperienceLevels(experienceLevels);
  const minSalary = 30000 + Math.floor(Math.random() * 120000);
  const maxSalary = minSalary + 10000 + Math.floor(Math.random() * 60000);
  const isFeatured = i % 7 === 0 || (i < 6 && Math.random() > 0.2); // some featured spread
  const postedAt = new Date(
    now - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 90)
  ).toISOString();

  sampleJobs.push({
    title: `${title}${i % 5 === 0 ? " II" : ""}`,
    company,
    location,
    description: `${title} at ${company} - ${lorem(30)}`,
    salary: { min: minSalary, max: maxSalary },
    jobType,
    workType,
    experienceLevel: experienceLevel,
    isFeatured,
    postedAt,
    remote: location === "Remote",
    tags: [title.split(" ")[0].toLowerCase(), "remote"],
  });
}

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    const col = db.collection("jobs");

    // Optional: clear existing sample data
    console.log("Clearing existing jobs collection (only in seed script)...");
    await col.deleteMany({});

    const res = await col.insertMany(sampleJobs);
    console.log(`Inserted ${res.insertedCount} jobs`);
  } catch (err) {
    console.error("Seed failed:", err);
  } finally {
    await client.close();
  }
}

run();
