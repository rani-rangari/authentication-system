<div align="center">

# Authentication System

Made by [Rani Rangari](https://linkedin.com/in/rani-rangari) • [EdgeCaseExchange](https://edgecaseexchange.com)

A React + Spring Boot + MySQL boilerplate implementing secure email/password login, registration, token refresh, and logout.

<br/>

![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-6DB33F?style=flat&logo=springboot&logoColor=white)
![React](https://img.shields.io/badge/React-18%2B-20232A?style=flat&logo=react&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.x-4479A1?style=flat&logo=mysql&logoColor=white)

</div>

---

## Getting Started

This is a full-stack application. To run it locally, you can choose between **Docker** (recommended for instant setup) or **Manual Setup**.

### 🐳 Option 1: Docker Quickstart (Recommended)

Spin up the entire full-stack ecosystem with a single command. 

1. Ensure your backend configuration profile is set to Docker in `backend/src/main/resources/application.properties`:

```properties
   spring.profiles.active=docker
```

2. Launch the containerized stack:

```bash
   docker-compose up --build -d
```

---

### 💻 Option 2: Manual Local Setup

If running bare-metal, ensure you have **Node.js (v18+)**, **Java (JDK 21+)**, and an active **MySQL** server instance running locally.

### 1. Configure Environment Profiles
Open `backend/src/main/resources/application.properties`, activate the local profile, and append your database and JWT credentials:

```properties
spring.profiles.active=local

# MySQL Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/your_database_name
spring.datasource.username=your_db_user
spring.datasource.password=your_db_password

# JWT Security Configuration
jwt.secret=your_super_secret_64_character_random_string
jwt.expiration=86400000
```

### 2. Spin Up Backend Service
Open a terminal window and launch the Spring Boot engine:

```bash
cd backend
./mvnw spring-boot:run
```

### 3. Initialize Frontend Client
Open a separate terminal window, install your project dependencies, and boot up the Vite development server:

```bash
cd frontend
npm install
npm run dev
```

---

## 🚀 Want to Upgrade?

Get **Google, GitHub, & Magic Link** sign-in pre-configured for your architecture.

[Upgrade to Premium Authentication →](https://edgecaseexchange.com/premium-authentication)
