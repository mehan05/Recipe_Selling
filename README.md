# Project Setup and Run Instructions

This guide will help you set up and run both the **Frontend** and **Backend** parts of the project on your local machine. The project is split into two main parts: the frontend (React) and the backend (Node.js/Express). Both need to be running concurrently for the project to function properly.

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

- **Node.js** (v14 or higher)
- **npm** (Node package manager) - Comes bundled with Node.js
- **Git** (Optional, but recommended for cloning repositories)
- **MongoDB** (If using MongoDB as a database) or a connection string for your database provider

## Step-by-Step Instructions

### 1. Clone the Project

Start by cloning the project repository:

```bash
   git clone <repo_Link>
```

### 2. Paste the mongo db connection string in file present inside /backend/.env
### 3. Split the terminal 
  ## In one locate to backend by typing
  ```bash
        cd backend
  ```
  ## In Another locate to frontend by typing
  ```bash
        cd frontend
  ```
### 4. In Frontend directory terminal run:
```bash
    npm install
    npm run dev
```
### 5. In Backend directory terminal run:
```bash
    npm install
    npm start
``` 

 
