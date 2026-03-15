# development-platforms-ca

Motivation

I chose Option 1 because I wanted to build a backend API and learn more about servers and databases.

What I liked:
Working with MySQL and learning SQL queries

- Building routes in Express
- Understanding how auth with JWT works

What I found difficult:
- Debugging POST, PUT, and DELETE requests
- Finding the exact reason when something in the server did not work
- Connecting all parts of the backend together

One benefit of building a custom API is that you have full control over how the backend works.
A service like Supabase can be easier to set up, but building your own API helps you understand backend development better.

## Overview
This project is a fake news plattform API built with Express.js and TypeScript  
Users can register, log in, and submit news articles.  
Articles can be viewed publicly i github.
gitigni+ore is not ignoring, . env file. so teachers can view it. 

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


Authorization: Bearer YOUR_TOKEN

Body example:

{
  "title": "My first article",
  "body": "This is the content of the article",
  "category": "Technology"
}
Database Structure
users
id
email
password_hash
created_at
articles
id
title
body
category
submitted_by
created_at





