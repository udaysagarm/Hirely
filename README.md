# Hirely

Hirely is a gig-matching platform designed to connect job seekers with employers for short-term, location-based work. It facilitates the entire process from job posting and discovery to assignment and rating.

## Features

-   **User Roles**: Support for Job Seekers, Employers, and Admins.
-   **Geolocation**: Location-based job matching using latitude/longitude.
-   **Job Management**: Post, browse, assign, and track status of jobs.
-   **Ratings & Reviews**: Reputation system for both workers and employers.
-   **Real-time Interaction**: Job interests and assignments.

## Technology Stack

### Frontend
-   **React**: UI Library (v19)
-   **Vite**: Build tool and development server
-   **TailwindCSS**: Utility-first CSS framework for styling
-   **React Router**: Navigation and routing
-   **Lucide React**: Icon set

### Backend
-   **Node.js**: Runtime environment
-   **Express**: Web framework for API
-   **PostgreSQL**: Relational database
-   **BCrypt**: Password hashing
-   **JSON Web Tokens (JWT)**: Authentication

## Prerequisites

Ensure you have the following installed on your machine:
-   [Node.js](https://nodejs.org/) (v16+)
-   [PostgreSQL](https://www.postgresql.org/)

## Setup Instructions

### 1. Database Setup
1.  Ensure PostgreSQL is running.
2.  Create a new database for the project (e.g., `hirely_db`).
3.  Run the SQL commands found in `Database_schema.txt` to initialize the tables.

### 2. Backend Setup
1.  Navigate to the server directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `server` directory and configure your environment variables (Database credentials, JWT secret, etc.).
4.  Start the backend server:
    ```bash
    node server.js
    ```
    The server typically runs on port 3000 (or as configured).

### 3. Frontend Setup
1.  Open a new terminal and navigate to the project root:
    ```bash
    cd .. # if you are in the server directory
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open your browser and navigate to the URL shown (usually `http://localhost:5173`).

## Project Structure

-   `/src`: Frontend React source code.
-   `/server`: Backend Node/Express API code.
    -   `server.js`: Main entry point for the API.
    -   `db/`: Database connection logic.
    -   `routes/`: API route definitions.
-   `Database_schema.txt`: SQL schema for database creation.
