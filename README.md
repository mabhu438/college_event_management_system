# College Event Management System (CampusConnect)

A full-stack FSD-2 project. Students can browse college events and register. An administrator can log in, create/update/delete events, and review/remove registrations.

## Technology
- Frontend: React 18 + Vite
- Backend: Node.js + Express
- Database: MongoDB Atlas / MongoDB
- Authentication: JWT-based admin login

## Project structure
```
college-event-management/
├── backend/
│   ├── src/models/       # Event and Registration schemas
│   ├── src/routes/       # Auth, event and registration APIs
│   ├── src/middleware/   # Admin authentication
│   ├── src/server.js
│   └── .env.example
└── frontend/
    └── src/              # React application and styles
```

## Setup
### 1. Requirements
Install Node.js (LTS) and create a MongoDB database (MongoDB Atlas or local MongoDB).

### 2. Backend
```bash
cd backend
npm install
```
Copy `.env.example` to `.env`, then set your own values:
- `MONGODB_URI`: your MongoDB connection string
- `JWT_SECRET`: a long random secret
- `ADMIN_EMAIL`: admin login email
- `ADMIN_PASSWORD`: strong admin password

Start the backend:
```bash
npm run dev
```
Backend runs at `http://localhost:5000`.

### 3. Frontend
Open a second terminal:
```bash
cd frontend
npm install
npm run dev
```
Open the Vite URL, normally `http://localhost:5173`.

If the backend is hosted at another URL, create `frontend/.env` with:
```
VITE_API_URL=https://your-backend-domain/api
```
Restart Vite after changing environment variables.

## Admin use
Use the email and password you configured in `backend/.env`. Do not publish or share the `.env` file. Change the sample password before deployment.

## API endpoints
| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | `/api/health` | Public | API status |
| POST | `/api/auth/login` | Public | Admin login |
| GET | `/api/events` | Public | List events |
| GET | `/api/events/:id` | Public | Event details |
| POST | `/api/events` | Admin | Create event |
| PUT | `/api/events/:id` | Admin | Update event |
| DELETE | `/api/events/:id` | Admin | Delete event and registrations |
| POST | `/api/registrations` | Public | Register a student |
| GET | `/api/registrations` | Admin | List registrations (`?eventId=` optional) |
| DELETE | `/api/registrations/:id` | Admin | Remove registration |

## External lab record
### Aim
To design and develop a College Event Management System using React, Node.js, Express.js and MongoDB that allows students to view and register for college events and allows an administrator to manage events and registrations.

### Explanation
The system has two user roles. Students can view the available events and submit their name, college email, roll number and department to register. The backend validates the submitted information, checks event capacity and prevents the same email from registering twice for the same event. The administrator signs in and can add, edit or delete events and view or remove student registrations. React provides the user interface, Express exposes REST APIs, Node.js runs the server, and MongoDB stores event and registration records.

### Expected output
1. A home page showing the CampusConnect title, event summary and event cards.
2. A student registration form for each event.
3. A successful registration message after valid submission.
4. An admin login form.
5. Admin controls to add, edit and delete events.
6. An admin registration table showing student and event details.

### Executed output
After configuring MongoDB and starting both servers, open the frontend in a browser. Verify the home page, register a test student for an event, log in as admin, create or edit an event, and check the registration table. Capture screenshots of these actual running screens and attach them here in the lab record. The screenshots must be taken after running the project; they are not pre-generated in this source package.

## Sample test data
Create an event from the admin panel, for example:
- Title: Web Development Workshop
- Category: Workshop
- Description: A hands-on introduction to building modern web applications.
- Venue: Computer Lab 1
- Date: Choose a future date
- Time: 10:00 AM
- Capacity: 60

Then register a test student using a valid test email and roll number.

## Notes
- This is an academic starter implementation. Use a strong admin password and JWT secret.
- For production deployment, add rate limiting, stronger validation, secure cookie/token handling, HTTPS, email verification and audit logging.
- The app requires a working MongoDB connection; it does not use fake local database data.
