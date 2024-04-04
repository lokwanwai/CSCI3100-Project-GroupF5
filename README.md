# CSCI3100-Project-GroupF5
# My E-commerce Website

This is the README file for the My E-commerce Website project. It provides instructions on how to set up the project, install the necessary dependencies, and start the application.

## Prerequisites

Before getting started, ensure that you have the following software installed on your system:

- Node.js (v21.4.0)
- npm (v10.2.4)

## Getting Started

Follow these steps to set up and run the project:

1. Clone the repository:
```bash
git clone https://github.com/lokwanwai/CSCI3100-Project-GroupF5.git
```
2. Install the frontend dependencies:
```bash
cd frontend
npm install
```
3. Install the backend dependencies:
```bash
cd backend
npm install
```

## Starting the Application

To start the application, follow these steps:

1. Start the backend server, the server will start running on `http://localhost:5001`:
```bash
cd backend
node app.js
```
2. Start the frontend development server, the frontend app will be accessible at `http://localhost:3000`:
```bash
cd frontend
npm start
```



## File Structure

The project has the following file structure:
```txt
our-repo/
├── backend/
│ ├── config/
│ │ └── db.js
│ ├── data/
│ │ ├── products.csv
│ │ ├── users.csv
│ │ └── orders.csv
│ ├── models/
│ │ ├── product.js
│ │ ├── user.js
│ │ └── order.js
│ ├── routes/
│ │ ├── productRoutes.js
│ │ ├── userRoutes.js
│ │ └── orderRoutes.js
│ ├── app.js
│ ├── package.json
│ └── package-lock.json
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ │ ├── Header/
│ │ │ │ ├── index.js
│ │ │ │ └── style.css
│ │ │ └── Footer/
│ │ │ ├── index.js
│ │ │ └── style.css
│ │ ├── pages/
│ │ │ ├── Home/
│ │ │ │ ├── index.js
│ │ │ │ └── style.css
│ │ │ └── /* Other pages */
│ │ ├── App.js
│ │ ├── App.css
│ │ └── index.js
│ ├── package.json
│ └── package-lock.json
└── README.md
```