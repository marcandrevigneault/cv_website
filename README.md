# MVX Portfolio Website

Minimalist CV website with separate frontend/backend architecture.

## Architecture

```
mvx-portfolio/
├── frontend/           # Next.js React app
│   ├── src/
│   │   ├── app/       # Pages
│   │   └── components/# UI components
│   └── public/        # Static files
│
└── backend/           # Express API server
    ├── src/
    │   ├── routes/    # API endpoints
    │   └── server.ts  # Main server
    └── data/          # JSON content
```

## Quick Start

```bash
# Frontend (port 3000)
cd frontend
npm install
npm run dev

# Backend (port 5000)
cd backend
npm install
npm run dev

# Docker (both services)
docker-compose up -d
```

## Features

### Animated Backgrounds
Click the 🎨 button to test 6 different animated backgrounds:
- Particles
- Waves
- Matrix
- Geometric
- Gradient
- Stars

### API Endpoints
- `GET /api/content` - Fetch site content
- `POST /api/content` - Update content
- `GET /api/stats/world-stats` - Statistical data
- `GET /api/stats/random-fact` - Random facts

### Content Management
Edit `backend/data/content.json` to update site content.

### Documents
Place PDFs in `frontend/public/documents/`

## Docker Deployment
```bash
docker-compose up -d
```
- Frontend: http://localhost:3000
- Backend: http://localhost:5000