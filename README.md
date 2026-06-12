# Authentication System

Built with React (Frontend), Spring Boot (Backend) and Database (MySQL). This project demonstrates a complete user lifecycle: Signup, Login, Logout and Protected Routing

## Technologies Used
### Frontend
- **Framework**: React.js with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide-React
- **Routing**: React Router DOM
- **State Management**: React Context API

### Backend
- **Framework**: Spring Boot (Java)
- **Security**: Spring Security & JWT (JSON Web Tokens)
- **Database**: MySQL

## Project Structure
```text
/root
├── /frontend      # React source code
└── /backend       # Spring Boot source code
```

### ⚙️ How to Run Locally

#### Prerequisites
Before starting, ensure you have the following installed:
* **Node.js**: v18 or higher
* **Java**: JDK 17 or higher
* **Database**: [MySQL]

### Backend Setup

- Navigate to `/backend`.
- Configure your database credentials in `application.properties`.
- Run the application:
  ```bash
  ./mvnw spring-boot:run
  ```

### Frontend Setup

- Navigate to `/frontend`.
- Install dependencies:
  ```bash
  npm install
  ```
- Start the development server:
  ```bash
  npm run dev
  ```

## Key Features

- **JWT Authentication**: Secure stateless token handling.
- **Form Validation**: Robust client-side validation using custom utilities.
- **Protected Routes**: Ensuring only authorized users reach the /dashboard.
- **Responsive UI**: Mobile-first design using Tailwind CSS.

## License

This project is open-source and available under the MIT License.
