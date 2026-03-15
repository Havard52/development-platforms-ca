# development-platforms-ca

I chose Option 1 because I wanted to build a backend API and learn more about server and databases.
I liked working in MySQL, baecause i found it to language to less comlpicatet then i first tought.
I struggled alout with put, post, delete, after connecting to the server. I found it pretty hard to find the specific reason for why it did not work.

I did not use any .gitin+gnore. So all files are visible ;)

## Overview
This project is a fake news plattform API built with Express.js and TypeScript  
Users can register, log in, and submit news articles.  
Articles can be viewed publicly i github.

The API uses MySQL for data storage and JWT authentication to protect article submission.

## Technology

- Express.js
- TypeScript
- MySQL
- MYsql2
- bcrypt
- JSON Web Token (JWT)

## Installation

1. Clone the repository
git clone https://github.com/YOUR_USERNAME/development-platforms-ca.git

cd development-platforms-ca

2. Install dependencies:

npm install

3. Create a `.env` file like this:
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=nyttpassord
DB_NAME=news_app
JWT_SECRET=my_secret_key

4. Set up the database:
Run the SQL file:
news_app.sql


5. Start server:
npm run dev


The API will run on:
http://localhost:3000


Body:

```json
{
  "email": "tesadasdst@gmail.com",
  "password": "sfgsvd88"
}
Login user
POST /auth/login

ReturnsvJWT token.

Get all articles
GET /articles

Public endpoint.

Create article
POST /articles

Requires JWT token.







