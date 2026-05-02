-- ================================================================
-- CYBERFUN SOFTWARE — COMPLETE DATABASE SETUP
-- Paste this entire file into Neon SQL Editor and click Run
-- ================================================================

-- Drop everything cleanly
DROP TABLE IF EXISTS "Application" CASCADE;
DROP TABLE IF EXISTS "Job" CASCADE;
DROP TABLE IF EXISTS "Contact" CASCADE;
DROP TABLE IF EXISTS "Project" CASCADE;
DROP TABLE IF EXISTS "BlogPost" CASCADE;
DROP TABLE IF EXISTS "TeamMember" CASCADE;
DROP TABLE IF EXISTS "Service" CASCADE;
DROP TABLE IF EXISTS "Testimonial" CASCADE;
DROP TABLE IF EXISTS "User" CASCADE;
DROP TYPE IF EXISTS "Role" CASCADE;
DROP TYPE IF EXISTS "ContactStatus" CASCADE;
DROP TYPE IF EXISTS "JobType" CASCADE;
DROP TYPE IF EXISTS "ApplicationStatus" CASCADE;

-- Enums
CREATE TYPE "Role"              AS ENUM ('USER','ADMIN');
CREATE TYPE "ContactStatus"     AS ENUM ('NEW','READ','REPLIED','ARCHIVED');
CREATE TYPE "JobType"           AS ENUM ('FULL_TIME','PART_TIME','CONTRACT','INTERNSHIP','REMOTE');
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING','REVIEWING','INTERVIEW','OFFER','REJECTED','WITHDRAWN');

-- Tables
CREATE TABLE "User" (
  "id" TEXT PRIMARY KEY, "name" TEXT, "email" TEXT NOT NULL UNIQUE,
  "password" TEXT, "role" "Role" NOT NULL DEFAULT 'USER',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE "Contact" (
  "id" TEXT PRIMARY KEY, "name" TEXT NOT NULL, "email" TEXT NOT NULL,
  "phone" TEXT, "company" TEXT, "subject" TEXT NOT NULL, "message" TEXT NOT NULL,
  "status" "ContactStatus" NOT NULL DEFAULT 'NEW',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE "Job" (
  "id" TEXT PRIMARY KEY, "title" TEXT NOT NULL, "department" TEXT NOT NULL,
  "location" TEXT NOT NULL, "type" "JobType" NOT NULL, "experience" TEXT NOT NULL,
  "salary" TEXT, "description" TEXT NOT NULL, "requirements" TEXT NOT NULL,
  "benefits" TEXT, "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE "Application" (
  "id" TEXT PRIMARY KEY, "jobId" TEXT NOT NULL, "name" TEXT NOT NULL,
  "email" TEXT NOT NULL, "phone" TEXT, "resumeUrl" TEXT NOT NULL,
  "coverLetter" TEXT, "portfolio" TEXT,
  "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE
);
CREATE TABLE "Project" (
  "id" TEXT PRIMARY KEY, "title" TEXT NOT NULL, "slug" TEXT NOT NULL UNIQUE,
  "description" TEXT NOT NULL, "category" TEXT NOT NULL, "client" TEXT,
  "liveUrl" TEXT, "githubUrl" TEXT, "techStack" TEXT[] DEFAULT '{}',
  "featured" BOOLEAN NOT NULL DEFAULT false, "published" BOOLEAN NOT NULL DEFAULT true,
  "order" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE "BlogPost" (
  "id" TEXT PRIMARY KEY, "title" TEXT NOT NULL, "slug" TEXT NOT NULL UNIQUE,
  "excerpt" TEXT NOT NULL, "content" TEXT NOT NULL, "tags" TEXT[] DEFAULT '{}',
  "published" BOOLEAN NOT NULL DEFAULT false, "publishedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE "TeamMember" (
  "id" TEXT PRIMARY KEY, "name" TEXT NOT NULL, "role" TEXT NOT NULL,
  "bio" TEXT, "linkedin" TEXT, "twitter" TEXT, "github" TEXT,
  "order" INTEGER NOT NULL DEFAULT 0, "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE "Service" (
  "id" TEXT PRIMARY KEY, "title" TEXT NOT NULL, "slug" TEXT NOT NULL UNIQUE,
  "description" TEXT NOT NULL, "icon" TEXT NOT NULL, "features" TEXT[] DEFAULT '{}',
  "order" INTEGER NOT NULL DEFAULT 0, "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE "Testimonial" (
  "id" TEXT PRIMARY KEY, "name" TEXT NOT NULL, "role" TEXT NOT NULL,
  "company" TEXT NOT NULL, "content" TEXT NOT NULL, "rating" INTEGER NOT NULL DEFAULT 5,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ================================================================
-- ADMIN USER
-- Email:    admin@cyberfunsoftware.com
-- Password: Admin@Cyberfun2024!
-- ================================================================
INSERT INTO "User" VALUES (
  'admin_001', 'Super Admin', 'admin@cyberfunsoftware.com',
  '$2b$10$8K1p/a0dhrx2x4OpVBMhJuhi3nGH6AEbBDJFUJYoqo8X5/4yLxgOm',
  'ADMIN', NOW(), NOW()
);

-- ================================================================
-- JOBS
-- ================================================================
INSERT INTO "Job" VALUES
('job_001','Senior Full-Stack Engineer','Engineering','New Delhi / Remote','FULL_TIME','4-6 years','₹18-28 LPA',
'We are looking for a Senior Full-Stack Engineer to build complex web applications for our global clients, mentor junior developers, and contribute to internal tooling.',
'4+ years React/Node.js. Strong TypeScript. PostgreSQL experience. CI/CD knowledge. Cloud platform familiarity.',
'Competitive salary + ESOPs. Health insurance. ₹50K learning budget. Remote-friendly.',
true, NOW(), NOW()),
('job_002','UI/UX Designer','Design','New Delhi / Hybrid','FULL_TIME','3-5 years','₹12-20 LPA',
'Own the end-to-end design process for client projects — from user research and wireframes to high-fidelity prototypes and design systems.',
'3+ years UI/UX design. Expert Figma skills. Design systems experience. WCAG 2.1 knowledge.',
'Competitive salary. MacBook provided. Health insurance. Conferences budget.',
true, NOW(), NOW()),
('job_003','ML/AI Engineer','AI Division','Remote','FULL_TIME','3-5 years','₹20-35 LPA',
'Build production ML systems for clients in fintech, healthcare, and e-commerce. LLM integration, computer vision, custom ML models.',
'3+ years ML engineering. PyTorch or TensorFlow. LLM API experience. MLOps skills. Vector database knowledge.',
'Top ML salaries. Fully remote. GPU compute budget. Research publication opportunities.',
true, NOW(), NOW()),
('job_004','DevOps Engineer','Engineering','New Delhi / Remote','FULL_TIME','2-4 years','₹15-25 LPA',
'Help clients modernize cloud infrastructure. Design and implement CI/CD pipelines, container orchestration, and infrastructure-as-code.',
'2+ years DevOps. AWS/GCP/Azure hands-on. Docker and Kubernetes. Terraform or Pulumi. Monitoring tools.',
'Competitive salary. Remote-friendly. Cloud cert reimbursement. On-call compensation.',
true, NOW(), NOW()),
('job_005','React Native Developer','Mobile','Remote','REMOTE','2-4 years','₹12-22 LPA',
'Build beautiful, performant mobile applications for our global clients. Work on greenfield projects and maintain apps with 100K+ users.',
'2+ years React Native. Published apps on App Store / Play Store. Strong JS/TS. React Navigation. Performance optimization.',
'Fully remote. Flexible hours. Devices provided. Annual bonus.',
true, NOW(), NOW());

-- ================================================================
-- PROJECTS  
-- ================================================================
INSERT INTO "Project" VALUES
('prj_001','FinanceAI Dashboard','financeai-dashboard','Real-time financial analytics platform with AI-powered insights and predictive modeling. Handles $50M+ daily transactions at sub-100ms latency.','Web App','FinovateAI','https://financeai-demo.vercel.app',null,ARRAY['Next.js 14','TypeScript','Python','TensorFlow','PostgreSQL','Redis','AWS'],true,true,1,NOW(),NOW()),
('prj_002','MedConnect Platform','medconnect-platform','HIPAA-compliant telemedicine serving 50,000+ patients across 120+ hospitals. Features video consultations, AI diagnostics, and prescription management.','Full Stack','MedConnect India','https://medconnect.in',null,ARRAY['React','Node.js','MongoDB','WebRTC','AWS','Docker'],true,true,2,NOW(),NOW()),
('prj_003','ShopAI Marketplace','shopai-marketplace','Multi-vendor e-commerce with AR product preview, AI recommendations, real-time inventory. Processes 100K+ daily orders.','E-Commerce','RetailGiant UK','https://shopai-demo.netlify.app',null,ARRAY['Next.js','React Native','Stripe','PostgreSQL','Elasticsearch','Redis'],true,true,3,NOW(),NOW()),
('prj_004','TradeRoute B2B App','traderoute-b2b','Mobile-first B2B trade platform connecting 10,000+ SME businesses for procurement and supply chain management.','Mobile','TradeRoute Logistics',null,null,ARRAY['React Native','Node.js','MongoDB','Firebase','Razorpay'],false,true,4,NOW(),NOW()),
('prj_005','DeepSense AI Vision','deepsense-ai','Computer vision defect detection achieving 99.2% accuracy. Processes 10,000+ images/hour in real-time on factory floor.','AI/ML','PrecisionMfg Industries',null,null,ARRAY['Python','PyTorch','OpenCV','FastAPI','Docker','NVIDIA CUDA'],true,true,5,NOW(),NOW()),
('prj_006','LegalTech Suite','legaltech-suite','Legal document automation and case management reducing drafting time by 70% using AI-powered templates.','Web App','LexAssist LLP',null,null,ARRAY['Next.js','TypeScript','Prisma','PostgreSQL','OpenAI GPT-4','AWS S3'],false,true,6,NOW(),NOW()),
('prj_007','FitLife Mobile','fitlife-mobile','Personal training and nutrition app with 200K+ active users, AI workout recommendations, and real-time coach communication.','Mobile','FitLife Health',null,null,ARRAY['Flutter','Dart','Firebase','Python','TensorFlow Lite','Razorpay'],false,true,7,NOW(),NOW()),
('prj_008','EdTech Platform','edtech-platform','Live online learning with 100K+ students, real-time video classes, AI quizzes, and automated certificate issuance.','Web App','LearnSphere Education','https://learnsphere-demo.vercel.app',null,ARRAY['Next.js','WebRTC','Socket.io','PostgreSQL','Redis','AWS'],false,true,8,NOW(),NOW());

-- ================================================================
-- BLOG POSTS
-- ================================================================
INSERT INTO "BlogPost" VALUES
('blg_001','Mastering Next.js 15 App Router: Performance Patterns for 2025','nextjs-15-app-router',
'Deep dive into Server Components, Partial Prerendering, and Turbopack — build ultra-fast web apps scoring 100 on Core Web Vitals.',
'# Mastering Next.js 15

Next.js 15 introduces groundbreaking improvements that fundamentally change how we build web applications.

## Server Components by Default

Every component in the App Router is a Server Component by default — zero JavaScript sent to the client unless you opt in with "use client".

## Partial Prerendering

Combine static and dynamic content in a single route, streaming dynamic parts as they resolve.

## Turbopack in Production

Turbopack is now stable and delivers 10x faster builds compared to Webpack.

Start migrating your pages to Server Components today for dramatically better performance.',
ARRAY['Next.js','Performance','React','TypeScript'],true,NOW()-INTERVAL'16 days',NOW()-INTERVAL'16 days',NOW()-INTERVAL'16 days'),

('blg_002','Running LLMs in Production: Cost, Latency & Reliability at Scale','llms-in-production',
'Practical guide to deploying AI language models — semantic caching, RAG architecture, and managing API costs effectively.',
'# Running LLMs in Production

After deploying LLM features for 15+ clients, here is what we learned.

## 1. Semantic Caching

Similar prompts should not hit the API twice. Use a vector database to cache semantically similar queries — we typically see 40-60% cache hit rates.

## 2. RAG Architecture

Retrieval Augmented Generation dramatically reduces hallucinations and grounds the LLM in your actual data.

## 3. Cost Optimization

Use GPT-3.5 for simple tasks, GPT-4 only when needed. Implement token budgets per session. Batch non-realtime requests.

Production LLMs require careful engineering around cost, latency, and reliability.',
ARRAY['AI','LLM','Production','Architecture'],true,NOW()-INTERVAL'23 days',NOW()-INTERVAL'23 days',NOW()-INTERVAL'23 days'),

('blg_003','The Ideal Tech Stack for Startups in 2025','startup-tech-stack-2025',
'After helping 50+ startups launch and scale, we developed an opinionated stack balancing speed-to-market and long-term scalability.',
'# The Ideal Tech Stack for Startups in 2025

We have helped 50+ startups go from zero to production. Here is the stack we recommend.

## Frontend: Next.js + TypeScript + Tailwind

Next.js gives you SSR, SSG, API routes, and excellent DX out of the box.

## Database: PostgreSQL on Neon

Serverless PostgreSQL with automatic scaling. Free tier validates your idea.

## Auth: Custom JWT or Clerk

Keep it simple. Custom JWT for full control, Clerk for managed auth.

## Deployment: Vercel

Zero-config deployments, preview URLs for every PR, global CDN.

This stack lets a team of 2 ship production-grade software in weeks, not months.',
ARRAY['Startups','Architecture','Next.js','Strategy'],true,NOW()-INTERVAL'30 days',NOW()-INTERVAL'30 days',NOW()-INTERVAL'30 days');

-- ================================================================
-- TEAM MEMBERS
-- ================================================================
INSERT INTO "TeamMember" VALUES
('tm_001','Arjun Kapoor','CEO & Co-Founder','10+ years building scalable software. Previously at Flipkart and Razorpay.','https://linkedin.com/in/arjunkapoor',null,'https://twitter.com/arjunkapoor',1,true,NOW(),NOW()),
('tm_002','Divya Sharma','CTO & Co-Founder','Ex-Google Engineer, AI/ML specialist. IIT Delhi alumna.','https://linkedin.com/in/divyasharma','https://github.com/divyasharma',null,2,true,NOW(),NOW()),
('tm_003','Vikram Singh','Head of Design','Award-winning UI/UX designer with 8+ years at Fortune 500 companies.','https://linkedin.com/in/vikramsingh',null,'https://twitter.com/vikramdesigns',3,true,NOW(),NOW()),
('tm_004','Ananya Patel','Head of Engineering','Full-stack & DevOps expert. Former Tech Lead at Swiggy.','https://linkedin.com/in/ananyapatel','https://github.com/ananyapatel',null,4,true,NOW(),NOW()),
('tm_005','Rajan Mehta','Head of Business Dev','12+ years in enterprise software sales across India, UAE, and SE Asia.','https://linkedin.com/in/rajanmehta',null,'https://twitter.com/rajanmehta',5,true,NOW(),NOW()),
('tm_006','Neha Gupta','Lead AI Engineer','PhD in Machine Learning, IIT Delhi. NLP and computer vision specialist.','https://linkedin.com/in/nehagupta','https://github.com/nehagupta',null,6,true,NOW(),NOW());

-- ================================================================
-- SAMPLE CONTACTS
-- ================================================================
INSERT INTO "Contact" VALUES
('con_001','Rohit Agarwal','rohit@techstartup.in','+91 98100 23456','TechStartup India','Need a full-stack web app for our fintech product','Hi, we are building a fintech product and need a reliable development partner. Budget around ₹25-30 lakhs, 4-5 month timeline. Can we schedule a call?','NEW',NOW()-INTERVAL'2 days',NOW()-INTERVAL'2 days'),
('con_002','Emily Watson','emily@globalretail.co.uk','+44 7700 900123','Global Retail Co.','E-commerce platform with AI recommendations','We want to rebuild our e-commerce platform with modern tech and AI-powered recommendations. Your ShopAI project impressed us. Please share availability for a discovery call.','READ',NOW()-INTERVAL'5 days',NOW()-INTERVAL'4 days'),
('con_003','Mohammed Al-Farsi','mohammed@dubaivision.ae','+971 50 123 4567','Dubai Vision Tech','AI chatbot for customer service automation','We operate a large customer service center and want AI automation. We handle 50,000 monthly interactions. Looking for a pilot project to start.','REPLIED',NOW()-INTERVAL'8 days',NOW()-INTERVAL'6 days'),
('con_004','Sneha Kulkarni','sneha@healthtech.in','+91 87654 32109','HealthTech Innovations','Telemedicine platform with video consultations','Building a telemedicine platform. Need HIPAA-compliant video consultations, appointment scheduling, and EHR integration. Want to launch beta in 6 months.','NEW',NOW()-INTERVAL'1 day',NOW()-INTERVAL'1 day');

-- ================================================================
-- SAMPLE APPLICATIONS
-- ================================================================
INSERT INTO "Application" VALUES
('app_001','job_001','Karan Malhotra','karan.malhotra@gmail.com','+91 98765 11111','https://drive.google.com/resume-karan','I have been following Cyberfun for over a year. With 5 years in React/Node.js, I led teams at Paytm and Zepto. Excited about your product-focused culture.','https://karanmalhotra.dev','REVIEWING',NOW()-INTERVAL'3 days',NOW()-INTERVAL'2 days'),
('app_002','job_002','Aisha Inamdar','aisha@designstudio.in','+91 90123 44444','https://drive.google.com/resume-aisha','4 years designing at CRED and MakeMyTrip. My design system at CRED reduced design-to-dev handoff time by 40%. Portfolio at link.','https://aishainamdar.design','INTERVIEW',NOW()-INTERVAL'5 days',NOW()-INTERVAL'3 days'),
('app_003','job_003','Prateek Joshi','prateek@iitd.ac.in','+91 87654 22222','https://drive.google.com/resume-prateek','Completing PhD in ML at IIT Delhi. Published 3 papers at NeurIPS and ICML. Excited about applying research to production systems.','https://github.com/prateekjoshi-ml','PENDING',NOW()-INTERVAL'1 day',NOW()-INTERVAL'1 day'),
('app_004','job_001','Vijay K','vijay@backend.dev','+91 98765 33333','https://drive.google.com/resume-vijay','Senior backend engineer. 6 years at Amazon and Meesho. Expert in distributed systems and PostgreSQL. Seeking a more impactful environment.',null,'OFFER',NOW()-INTERVAL'10 days',NOW()-INTERVAL'2 days');

-- ================================================================
-- SERVICES
-- ================================================================
INSERT INTO "Service" VALUES
('svc_001','Web Development','web-development','Blazing-fast, scalable web applications using the latest technologies.','Globe',ARRAY['Next.js & React','TypeScript backend','API design','Performance optimization','SEO-first','PWA'],1,true,NOW(),NOW()),
('svc_002','App Development','app-development','Cross-platform mobile apps that feel truly native on iOS and Android.','Smartphone',ARRAY['React Native & Flutter','iOS & Android native','App Store optimization','Offline-first','Push notifications','In-app payments'],2,true,NOW(),NOW()),
('svc_003','UI/UX Design','ui-ux-design','Human-centered design combining aesthetics with functionality.','Palette',ARRAY['User research','Wireframing & prototyping','Design systems','WCAG 2.1','Usability testing','Motion design'],3,true,NOW(),NOW()),
('svc_004','AI Solutions','ai-solutions','AI and ML systems that automate workflows and generate insights.','Brain',ARRAY['LLM integration','Custom ML models','Computer vision','NLP & chatbots','Predictive analytics','AI automation'],4,true,NOW(),NOW()),
('svc_005','Cloud & DevOps','cloud-services','Scalable cloud infrastructure with enterprise-grade reliability.','Cloud',ARRAY['AWS, GCP, Azure','Kubernetes','CI/CD pipelines','Infrastructure as Code','Security','Cost optimization'],5,true,NOW(),NOW());

-- ================================================================
-- TESTIMONIALS
-- ================================================================
INSERT INTO "Testimonial" VALUES
('tst_001','Priya Sharma','CTO','FinovateAI','Cyberfun delivered our fintech platform 3 weeks ahead of schedule. Their technical expertise is unmatched. The team felt like true partners.',5,true,NOW(),NOW()),
('tst_002','Rahul Mehta','Founder','MedConnect India','They built our HIPAA-compliant healthcare platform with exceptional quality and guided us through complex compliance requirements.',5,true,NOW(),NOW()),
('tst_003','Sarah Johnson','VP Engineering','RetailGiant UK','60% faster page loads after their optimization work — directly increased our conversion rate by 23%. Phenomenal team.',5,true,NOW(),NOW()),
('tst_004','Ahmed Al-Hassan','CEO','TechVentures MENA','The AI chatbot they built handles 80% of customer queries automatically with remarkable accuracy. Completely transformed our operations.',5,true,NOW(),NOW());

-- Verify
SELECT 'Setup complete!' as status;
SELECT 'Users: '||COUNT(*) FROM "User";
SELECT 'Jobs: '||COUNT(*) FROM "Job";
SELECT 'Projects: '||COUNT(*) FROM "Project";
SELECT 'Blog Posts: '||COUNT(*) FROM "BlogPost";
SELECT 'Team: '||COUNT(*) FROM "TeamMember";
SELECT 'Contacts: '||COUNT(*) FROM "Contact";
SELECT 'Applications: '||COUNT(*) FROM "Application";

-- ================================================================
-- IF LOGIN FAILS: Run this to reset the admin password
-- This sets password to: Admin@Cyberfun2024!
-- ================================================================
-- UPDATE "User" 
-- SET "password" = '$2b$10$8K1p/a0dhrx2x4OpVBMhJuhi3nGH6AEbBDJFUJYoqo8X5/4yLxgOm'
-- WHERE "email" = 'admin@cyberfunsoftware.com';
