# RentEase

RentEase is a MERN stack rental platform for furniture and appliances.

## Stack

- React, React Router DOM, Axios, Tailwind CSS
- Node.js, Express
- MongoDB, Mongoose
- JWT authentication

## Project Structure

```text
rentease/
  client/        React frontend
  server/        Express REST API
```

## Setup

1. Install dependencies:

```bash
npm run install-all
```

2. Create the backend environment file:

```bash
copy server\.env.example server\.env
```

3. Start MongoDB locally, then seed sample data:

```bash
npm run seed --prefix server
```

4. Run the full app:

```bash
npm run dev
```

Frontend: `http://localhost:3000`

Backend: `http://localhost:5000`

## Seed Admin

- Email: `admin@rentease.com`
- Password: `admin123`

## API Routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products` admin
- `PUT /api/products/:id` admin
- `DELETE /api/products/:id` admin
- `POST /api/bookings`
- `GET /api/bookings/my`
- `GET /api/bookings` admin
- `PATCH /api/bookings/:id/status` admin
