# Circularia 🌿

AI-Powered Circular Economy Platform using Digital Twin technology.

## Architecture
- **apps/web**: Next.js 15 (App Router) Frontend
- **apps/api**: NestJS Backend
- **packages/ui**: Shared UI components
- **packages/types**: Shared TypeScript types
- **packages/utils**: Shared utility functions

## Tech Stack
- **Frontend**: TypeScript, TailwindCSS, Shadcn UI, Framer Motion, Zustand, TanStack Query
- **Backend**: NestJS, Prisma ORM, MySQL
- **Realtime**: Socket.IO
- **Auth**: JWT + Refresh Token

## Features Implemented
1. **Landing Page**: Futuristic eco-tech design with Digital Twin visualization.
2. **Dashboard Overview**: Realtime analytics, charts, and AI recommendation cards.
3. **Smart Collection Map**: Interactive map with station capacity monitoring.
4. **Waste Tracking**: End-to-end trace from Kitchen to Marketplace.
5. **AI Simulator**: Image-based waste conversion analysis and ROI estimation.
6. **Marketplace**: Recycled products store with environmental impact labels.
7. **Education Academy**: Interactive learning platform with gamification.
8. **Driver Dashboard**: Pickup task management and earnings tracking.
9. **Authentication**: Modern Login/Register with Role Selection.

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Setup Database**
   - Configure `DATABASE_URL` in `apps/api/.env`
   - Run migrations:
     ```bash
     cd apps/api
     npx prisma migrate dev
     ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

## Design System
- **Theme**: Dark/Light mode supported (Dark prioritized)
- **Colors**: Eco-Green & Cyan gradients
- **UI Style**: Glassmorphism, Premium SaaS aesthetic
- **Typography**: Inter & Outfit (Google Fonts)
