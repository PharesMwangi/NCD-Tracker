# NCD-Tracker

A minimal full-stack Non-Communicable Diseases (NCD) tracker: React + Vite frontend and an Express + MongoDB backend. Users can create, list and  update patient health records (blood sugar, blood pressure, weight/height) — backend also computes BMI and returns simple feedback messages.

## Tech stack

- Frontend: React, Vite, Tailwind CSS, Clerk for auth, Axios
- Backend: Node.js, Express, Mongoose (MongoDB)
- Deployments in this project: frontend on Vercel, backend on Render

## Repo structure

- backend/ — Express API
  - src/server.js — server and route registration
  - src/config/db.js — MongoDB connection
  - src/controllers/patientController.js — CRUD and health feedback logic
  - src/models/HealthData.js — Mongoose schema/model
  - routes/healthDataRoutes.js — REST routes for `/api/patients`

- frontend/ — Vite + React app
  - src/App.jsx — main app + routing
  - src/pages/Dashboard.jsx — main UI that calls the API
  - src/lib/api.js — Axios client and PatientsAPI wrapper
  - components/ — UI components

## Features

- Create health records (disease type, blood sugar, blood pressure, weight, height)
- Backend computes BMI and generates textual feedback for diabetes/hypertension
- List, update, delete records per user
- Clerk is used on the frontend for authentication flows

## Environment variables

Backend (set in Render or your local `.env` when running locally):

- MONGO_URI — MongoDB connection string (required)
- PORT — optional; default 5000
- ALLOWED_ORIGINS — comma-separated list of allowed CORS origins.

Frontend (set in Vercel or local `.env` — Vite reads these at build time):

- VITE_API_URL — Full URL to the backend
- VITE_CLERK_PUBLISHABLE_KEY — Clerk publishable key for auth

Notes about Vite env vars
- Vite injects env variables at build time. Changing env values in Vercel requires a redeploy. The env var must begin with `VITE_` and be set with exact casing: `VITE_API_URL`.

## Running locally (development)

Prerequisites: Node (compatible with project), pnpm or npm, and a running MongoDB instance (local or cloud).

From the repo root run the following in two terminals (backend and frontend):

Backend (PowerShell):

```powershell
cd backend
pnpm install
# or: npm install
pnpm run dev
# or: npm run dev
```

Frontend (PowerShell):

```powershell
cd frontend
pnpm install
# or: npm install
pnpm run dev
# or: npm run dev
```

Open the frontend dev URL (default Vite dev server) shown by the frontend dev server. When running locally, set `VITE_API_URL=http://localhost:5000` in `frontend/.env` (and rebuild/restart the dev server if needed).

## API Endpoints

Base path: `GET/POST/PUT/DELETE /api/patients`

- GET /api/patients?userId=<id>
  - Returns a list of patient records. If `userId` is provided, results are filtered to that user.

- POST /api/patients
  - Creates a record. Required fields: `diseaseType` (one of `hypertension|diabetes|both`), `bloodSugar`, `bloodPressureSystolic`, `bloodPressureDiastolic`, `weight`, `height`. The backend computes `bmi` and `feedback` and stores the record.

- PUT /api/patients/:id
  - Updates a record by id.

- DELETE /api/patients/:id
  - Deletes a record by id.


## Deployment notes

Frontend (Vercel):
- Ensure the environment variable in Vercel is named exactly `VITE_API_URL` and points to your backend URL.
- After updating/adding `VITE_API_URL` in Vercel, redeploy the project so the built assets contain the correct API URL. If not set, the built app will make relative requests (e.g. `/api/patients`) to the frontend origin and will get 404.
- If you see missing chunk errors (404 for `index-*.js`), try a full redeploy and clear browser cache (hard refresh/incognito) — stale HTML can reference old build hashes.

Backend (Render):
- Set `MONGO_URI` and any other secrets in the Render service environment.
- If you need to allow the frontend origin, set `ALLOWED_ORIGINS` to include your Vercel origin (comma-separated). 
- Note: The backend's CORS configuration in the repository is currently set to accept requests from the production Vercel origin by default. If you use preview domains or test locally, update CORS or set `ALLOWED_ORIGINS` accordingly.

## Troubleshooting

Common issues and fixes:

- CORS errors ("No 'Access-Control-Allow-Origin' header is present")
  - Ensure the backend's allowed origins include the exact origin from the browser address bar (protocol + hostname). Example: `https://ncd-tracker.vercel.app`.
  - If you changed env vars for CORS on Render, restart/redeploy the Render service and confirm the logs.

- 404 for API requests from the browser
  - Verify `VITE_API_URL` is set in Vercel and that the frontend was redeployed after the change. Inspect Network tab to see the requested Request URL; it must point to the Render hostname, not the Vercel frontend origin.

- Missing JS chunk (404 for index-*.js)
  - Redeploy the frontend and clear browser cache. This typically happens when the site’s HTML references a build manifest that no longer exists after a new build.

## Notes for maintainers

- The backend computes BMI and simple feedback in `src/controllers/patientController.js`.
- The data model is `HealthData` (Mongoose schema in `backend/src/models/HealthData.js`).
- Clerk is integrated in the frontend for authentication — make sure Clerk keys are correctly set in Vercel.

## Contributing

PRs welcome. Please follow the project's lint rules for the frontend and keep changes small and focused.

