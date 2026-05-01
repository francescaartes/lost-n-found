# TraceBack | Lost & Found

TraceBack is a full-stack web application built with the MERN stack. It is designed to help communities efficiently report, track, and recover lost and found items.

## Features

- **Secure Authentication:** User registration and login utilizing JSON Web Tokens (JWT) stored in HTTP-only cross-domain cookies.
- **Report Management:** Users can seamlessly submit reports for lost or found items, complete with descriptions, dates, and status tracking (Resolved/Unresolved).
- **Media Uploads:** Integrated with Cloudinary for fast, optimized, and stateless image hosting (up to 3 images per report).
- **Interactive Mapping:** Utilizes Leaflet.js to allow users to pin the exact geographical location where an item was lost or found.
- **Dashboard & Filtering:** A central feed displaying active reports with search and filter capabilities.
- **Personalized Control:** Users have a dedicated "My Reports" section to edit, update, or delete their own submissions.

## Tech Stack

**Frontend (Client)**

- React.js (Vite)
- Shadcn and Tailwind CSS (Styling)
- React Router (SPA Navigation)
- Leaflet.js (Interactive Maps)
- Lucide React (Icons)

**Backend (Server)**

- Node.js & Express.js
- MongoDB & Mongoose (Database)
- JSON Web Tokens (JWT) & Bcrypt.js (Security)
- Cloudinary API (Image Storage)

**Deployment & Hosting**

- **Frontend:** Azure Static Web Apps (with SPA routing configuration)
- **Backend:** Azure App Service (Node.js Container)
- **CI/CD:** GitHub Actions

## Project Structure

TraceBack is organized as a monorepository:

```text
lost-n-found/
├── client/                 # React/Vite Frontend
│   ├── public/             # Static assets and Azure routing config
│   ├── src/                # React components, pages, and context
│   │   ├── assets/         # Static images and global CSS
│   │   ├── components/     # Reusable UI elements (Cards, Navbar, Inputs)
│   │   ├── context/        # React Context providers (AuthContext)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions and Axios configurations
│   │   └── pages/          # Main route views (Home, Login, Dashboard)
│   └── package.json
├── server/                 # Express/Node.js Backend
│   ├── config/             # Database connection setup
│   ├── controllers/        # Route logic and request handling
│   ├── middlewares/        # Custom Express middlewares (Auth protection)
│   ├── models/             # Mongoose database schemas
│   ├── routes/             # API endpoint definitions
│   ├── index.js            # Server entry point
│   └── package.json
└── README.md
```

## Local Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/francescaartes/lost-n-found.git
cd lost-n-found
```

### 2. Install Dependencies

You will need to install packages for both the client and the server.

```bash
# Install Server dependencies
cd ./server
npm install

# Install Client dependencies
cd ../client
npm install
```

### 3. Environment Variables

Create a `.env` file in the `server` directory and add the following keys:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
FRONTEND_URL=http://localhost:5173

# Cloudinary Credentials
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Create a `.env` file in the `client` directory and add the following key:

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Run the Application

Open two separate terminal windows.

**Terminal 1 (Backend):**

```bash
cd server
npm run dev
```

**Terminal 2 (Frontend):**

```bash
cd client
npm run dev
```

Your frontend should now be running on `http://localhost:5173` and connected to your local backend.

## Deployment (Azure)

This application is configured for deployment on Microsoft Azure.

- **Cross-Domain Cookies**: The backend is configured to `trust proxy` and utilizes `sameSite: "none"` and `secure: true` to allow JWT cookies to pass successfully between the Azure App Service (Backend) and Azure Static Web Apps (Frontend).
- **SPA Routing**: The frontend includes a `staticwebapp.config.json` in the `public` directory to ensure React Router handles deep linking without throwing 404 errors.

---

_Francesca Q. Artes, BSCpE 4-1_
