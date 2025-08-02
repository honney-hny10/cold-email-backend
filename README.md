# Cold Email Backend

A backend service built with Node.js and TypeScript for managing cold email campaigns efficiently. It handles user management, email scheduling, throttling, and campaign tracking with a modular and scalable architecture.

Features:

User management with basic routes

Campaign creation and email job handling

Throttling service for controlled email sending

REST API built using Express

Environment-based configuration using .env

Modular TypeScript project structure


# 1.Getting Started:

Clone the Repository:

git clone https://github.com/honney-hny10/cold-email-backend.git

cd cold-email-backend

# 2.Install Dependencies:

npm install

# 3.Set Up Environment Variables:

Create a .env file:

cp .env.example .env

# 4.Configure your environment:

PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
EMAIL_API_KEY=your_email_service_api_key

# 5.Run the Development Server:

npm run dev

Available Scripts:

npm run dev → Start development mode (nodemon)
npm run build → Compile TypeScript to JavaScript
npm start → Run the compiled app in production

# 6.Environment Variables:

PORT → Port number the server runs on
DB_HOST → Database host
DB_PORT → Database port
DB_USERNAME → Database username
DB_PASSWORD → Database password
DB_NAME → Database name
EMAIL_API_KEY → API key for your email provider

# Author:

Made with 💻 by @honney-hny10
https://github.com/honney-hny10
