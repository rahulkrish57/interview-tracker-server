# Interview Tracker — Backend

A production-grade REST API built with NestJS, PostgreSQL and TypeORM.

## Tech Stack
- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Auth**: JWT + Passport
- **Validation**: class-validator

## Features
- JWT Authentication (register/login)
- Full CRUD for interview entries
- User-scoped data (each user sees only their own data)
- DTO validation on all endpoints
- Environment-based configuration

## Getting Started

### Prerequisites
- Node.js v18+
- PostgreSQL

### Installation
```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/interview-tracker-server.git
cd interview-tracker-server

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your database credentials

# Start development server
npm run start:dev
```

### API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/auth/register | Register new user | ❌ |
| POST | /api/auth/login | Login | ❌ |
| GET | /api/interviews | Get all interviews | ✅ |
| POST | /api/interviews | Create interview | ✅ |
| PATCH | /api/interviews/:id | Update interview | ✅ |
| DELETE | /api/interviews/:id | Delete interview | ✅ |

### Environment Variables
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=
DB_NAME=interview_tracker
JWT_SECRET=
JWT_EXPIRES_IN=7d
PORT=3000
```