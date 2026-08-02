# TezDial — Backend

Node.js + Express + MongoDB backend powering **TezDial**, a JustDial-style
local business directory.

## Tech Stack

- Node.js + Express
- MongoDB with Mongoose
- Cloudinary — business image uploads
- bcryptjs — pin hashing for listing security

## Features

- Create a business listing with two images (uploaded to Cloudinary)
- Fetch all listings with filters — category, city, and free-text search
- Fetch a single listing by ID
- Delete a listing — protected by a bcrypt-hashed security pin set at
  creation time
- Timestamped listings (`createdAt`, `updatedAt`)

## Project Structure

backend/
├── src/
│ ├── config/
│ │ └── db.js
│ ├── controllers/
│ │ └── business.controller.js
│ ├── middlewares/
│ │ ├── multyer.middleware.js
│ ├── models/
│ │ └── business.model.js
│ ├── routes/
│ │ └── business.routes.js
│ ├── utils/
│ │ └── cloudinary.js
│ ├── app.js
│ └── server.js
├── .env
└── package.json


## Environment Variables

Create a `.env` file in the root:

PORT=8000
MONGO_URI=your_mongodb_atlas_connection_string
CORS_ORIGIN=your_frontend_origin

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

## Getting Started

```bash
npm install
npm run dev
```

Server runs at `http://localhost:8000` by default.

## API Endpoints

| Method | Endpoint                | Description                              |
|--------|--------------------------|-------------------------------------------|
| POST   | `/api/business/new`     | Create a new business listing (multipart) |
| GET    | `/api/business/all`     | Get all listings — supports `?category=` `&city=` `&search=` |
| GET    | `/api/business/:id`     | Get a single listing by ID                |
| DELETE | `/api/business/delete`  | Delete a listing — body: `{ id, pin }`    |

## Security Notes

- The `pin` field is bcrypt-hashed before saving and never returned in
  plaintext.
- Deleting a listing requires the correct pin, verified via
  `business.ispinCorrect()`.

## Deployment

Deployed on [Render](https://render.com). Build command: `npm install`.
Start command: `npm run start`.
