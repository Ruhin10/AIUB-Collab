# AIUB Collab: Campus Based Collaboration Platfrom 

> **Course:** CSC4161 · Advanced Programming in Web Technology  
> **Institution:** American International University-Bangladesh (AIUB)  
> **Semester:** Fall 2026–2027 · Section E · Group 09  
> **Instructor:** Sultanul Arifeen Hamim, Lecturer, Department of Computer Science  

---

## 📌 Project Overview

**AIUB Collab** is a web-based academic collaboration platform designed to connect AIUB students and faculty through shared interests, skills, and goals, featuring user profiles, opportunity discovery, collaboration requests, team formation. Built with **NestJS 11, TypeScript, TypeORM, and PostgreSQL 18**. 

Students often struggle to find suitable teammates for academic projects, thesis work, research 
papers, startups, and other innovative initiatives due to the lack of a centralized platform for discovering 
collaboration opportunities. AIUB Collab aims to address this challenge by providing a dedicated space where users can:
- Showcase their skills.
- Share Ideas.
- Explore oppertunities.
- Find suitable collborators.

---

## 👥 Group Members & Contribution

| Student ID | Student Name | Assigned Modules & Responsibilities |
| :--- | :--- | :--- |
| **23-53292-3** | **Md Shafiur Rahman Ruhin** | **Collaboration Request & Platform Management:** Collaboration Application (`/collab_application`),  from a user's application on a collaboration opportunity to that application's state handling. Along with keeping the platform updated with the trend by introducing new skills (`/skill`), interest (`/interest`) on the platform. |
| **23-53008-3** | **Md. Samin Raiyan Kabbo** | **User Onboarding, Authentication & Profiling:** Authentication (`/auth`), User (`/user`), User Profile (`/user_profile`), from registering a user to creating the user's profile. |
| **23-54422-3** | **Tawfiqul Hasan** | **Collaboration Post Optimaization:** For better reach of a collaboration post to specific audience(users) a collaboration should include required skill (`/collab_post_required_skill`), preferred interests (`/collab_post_preferred_interest`), preferred academic identity (`/collab_post_preferred_academic_identity`). |
| **23-54301-3** | **Wamia Fairooz Rafa** | **User Profile Enhancement:** To showcase user's skill (`/user_profile_skill`), express interest (`/user_profile_interest`), attaching user's presence on different platforms (`/user_linked_profile`) and adding more ways to connect (`/user_profile_contact`). |
| **23-54267-3** | **Zuhayer Hasan** | **Collaboration Post & Complain Reports:** From publishing a collboration post to handling it's state based lifecycle (`/collab_post`) and reporting and managing in non-disciplinary acts thorugh (`/complaint_report`).|
---
**Before starting development of the project database schema, migrations were decided in group decisions. We followed iterative method in the software development stage to make sure each member works on all the minimum requirements stated in the project requirements document.**

## 🛠️ Technology Stack & Architecture

- **Backend Framework:** NestJS 11.1.8 (Modular Monolith).
- **Language & Runtime:** TypeScript 5.9, Node.js 26.13.0 (`.nvmrc`), pnpm.
- **Database & ORM:** PostgreSQL 18.6 with TypeORM 0.3.27 (`synchronize: false`, versioned migrations).
- **Authentication & Security:** `@nestjs/jwt`, `argon` password hashing.
- **Validation:** `class-validator` & `class-transformer` with global `ValidationPipe` (whitelist + forbidden unknown fields).
- **API Documentation:** Interactive Swagger UI (`@nestjs/swagger`).
- **Testing:** Postman API testing with isolated PostgreSQL schemas.

---

## 📋 Course Requirements Coverage

### 1. Minimum Course Requirements (5/5 Complete)
- **Multiple Entities with Full CRUD:** 16 relational tables (`user`, `user_profile`, ` user_profile_skill`, `user_profile_interest`, `user_profile_contact`, `user_linked_profile`, `Deparment`, `Skill`, `Interest`, `collab_post`, `collab_application`, `collab_post_required_skill`, `collab_post_prefrred_department`, `collab_post_preferred_academic_identity`, `collab_post_preferred_academic_interest`, `complaint_report` ).
- **Database Integration:** PostgreSQL integration via TypeORM with foreign keys and check constraints.
- **JWT Authentication & RBAC:** Register and login with argon password hashing. Role-Based Access Control (`USER`, `ADMIN`) enforced with `@Roles()` decorator and `RolesGuard`.
- **Input Validation with DTOs:** Strict create/update DTOs for every write endpoint. Strips unwhitelisted fields and returns formatted `400 Bad Request` messages.
- **HTTP Exception Handling:** Global `HttpExceptionFilter` ensuring unified JSON responses (`{ success, statusCode, message, path, timestamp }`).

### 2. Bonus Features Implemented (6/10 included)
- **Custom Decorators:** `@CurrentUser()`, `@Roles()` decorator for authentication and authorization.
- **Env:** Configuration kept outside the code.
- **Mailer:** Welcome mail on user registration using google SMTP.
- **Response Manipulation:** Structured response on every request.
- **TypeORM Versioned Migrations:** Production-ready schema migration (`1794260917000-create-user-table.ts`) with `synchronize: false`.
- **Swagger UI:**  Interactive Swagger UI api testing and Bearer auth.

---

## ⚙️ Local Environment Setup & Installation

### Prerequisites
- Node.js 26.x (Recommneded)
- pnpm (`npm install -g pnpm`)
- PostgreSQL 18.x (running on port `5432`)

```terminal
git clone https://github.com/saminraiyan93/AIUB-Collab.git
cd impactid-volunteer-platform
pnpm install
pnpm approve-builds
pnpm install
```

### Step 2: Configure Environment Variables
Copy the example environment configuration:
```terminal
Copy-Item .env.example .env
```
Ensure your `.env` contains valid credentials for your local PostgreSQL:
```env
PORT=5001
NODE_ENV=development
JWT_BEARER_SECRET="your-secure-random-secret"

DB_CLIENT="postgres"
DB_HOST="localhost"
DB_PORT=5432
DB_USER="your_db_username"
DB_PASSWORD="your_db_password"
DB_DATABASE="AIUB_COLLAB"

MAILER_HOST="your_mailer_host_name"
MAILER_PORT="your_mailer_service_based_port"
MAILER_SECURE="true/false_depending_on_your_mailer_service"
MAILER_USER="your_mailer_service_account"
MAILER_PASSWORD="your_mailer_sevice_account_password"
MAILER_FROM="custom_sender<your_mailer_service_account>"
```
`JWT_BEARER_SECRET` can be generated using:
```terminal
[Convert]::ToBase64String([Security.Cryptography.RandomNumberGenerator]::GetBytes(64))
````

### Step 3: Run Database Migrations
Create the database instance `AIUB_COLLAB` in PostgreSQL/pgAdmin, then run:
```powershell
pnpm run migration:run
```

### Step 4: Start the Development Server
```powershell
pnpm run start:dev
```

- **Health Check:** [http://localhost:5001/health](http://localhost:5001/health)
- **Swagger UI:** [http://localhost:5001/api](http://localhost:5001/api)

---

## 🔄 Core Features (End-to-End Workflow)

1. **Registration & Profile Setup:**
   -  User registers (`POST /auth/register`), logins (`POST /auth/login`) and creates an user profile (`POST /user_profile`).
   - Before exploring the platform new user completes own profile (`POST /user-profiles`), showcase skills (`POST /user-profile-skills`), express interests (`POST /user-profile-interests`), includes profiles on other platforms (`POST /user-linked-profiles`), adds communication paths (`POST /user-profile-contacts`).
2. **Collaboration Opportunity & Application:**
   - User can publish collaboration opportunities (`POST /collab-posts`) targeting for people for specific skills (`POST /collab-post-required-skills`), interests (`POST /collab-post-preferred-interests`), academic identities (`POST /collab-post-preferred-academic-identities`) and departments (`POST /collab-post-preferred-departments`).
   - Collaboration posts published by users are scheduled to inspected by admins for any kind of irregularities. After inspection admins can set the collaboration post          (`PATCH /collab-posts/:id/postStatus`) available for other users on the platform to view and engage.
   - Other users can apply in the collaboration posts as applicant (`POST /collab-application`).
   - Publishers can manage each individual request (application) on their published collaboration posts, states from accepted to recruited, a mutli-step state management.(`PATCH /collab-applications`).
4. **Complaints:**
   - User can report about a specific collaboration post or another user (`POST /complaint-reports`).
   - Admin overseas each complains, reviews those, updates report status and finally take action if necessary (`PATCH /complain-reports/:id`) .
5. **Platform Management:**
   - Admin keeps the platform updated with trends by updating skills (`POST /skills`), interests (`POST /interests`), departments (`POST /departments`).
   - Admin handles complain reports and even can delete which collaboration post go against the policy of platform (`DELETE /collaboration-posts`) or even deactivate a policy      breaker user's account (`PATCH /users/:id`).

---

## 📜 Acknowledgement & Academic Integrity

This project is developed by the contribution of each group members stated above, under the supervision of the course faculty and submitted as part of the academic requirements of **Advanced Programming in Web Technology (CSC4161)** course at **American International University-Bangladesh (AIUB)**. During development **AI was used in learning purpose (to explore some features which were uncovered in the course lectures)** but implementation took place only after those were **understandable and explainable**. Thus, **the whole project was not generated by AI or not acquired from anywhere else**. 
