# URL Shortener App

A full-stack URL shortening service built with Node.js, Express, MongoDB, and React.

## What's Inside

- **Backend**: REST API for shortening URLs and handling redirects
- **Frontend**: Clean React interface for creating short links
- **Logging**: Custom middleware that tracks all requests

## Quick Start

### Backend Setup
```bash
cd backend-test-submission
npm install
```

Create a `.env` file:
```
MONGO_URI=mongodb://localhost:27017/urlshortener
PORT=5000
```

Start the server:
```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend-test-submission
npm install
npm start
```

## How It Works

1. **Shorten a URL**: Send a POST request to `/api/url/shorten` with your long URL
2. **Use the short link**: Visit the shortened URL and get redirected automatically
3. **All requests are logged**: The middleware sends usage data to the evaluation service

## API Endpoints

- `POST /api/url/shorten` - Create a shortened URL
- `GET /:shortId` - Redirect to original URL

## Example Usage

**Create a short URL:**
```bash
curl -X POST http://localhost:5000/api/url/shorten \
  -H "Content-Type: application/json" \
  -d '{"originalUrl": "https://www.google.com"}'
```

**Response:**
```json
{
  "originalUrl": "https://www.google.com",
  "shortUrl": "http://localhost:5000/abc123"
}
```

## Tech Stack

- **Backend**: Node.js, Express, MongoDB
- **Frontend**: React, Material-UI
- **Database**: MongoDB for storing URL mappings

## Features

✅ Clean, responsive UI  
✅ Fast URL shortening  
✅ Automatic redirects  
✅ Request logging  
✅ Mobile-friendly design

---

Built for evaluation purposes with integrated logging middleware.
