# AyurVision - AI-Powered Skin Disease Detection Platform

AyurVision is a comprehensive full-stack application designed to detect and analyze skin diseases using advanced Machine Learning and Large Language Models. By combining a custom TensorFlow vision model with the Groq API for medical insights, it provides users with instant analysis, home remedies, and medical suggestions.

## Key Features

-   **Dual-AI Architecture**:
    -   **Vision Model**: Custom TensorFlow/Keras model hosted on FastAPI for accurate disease identification.
    -   **Medical LLM**: Integrated **Groq API** to generate instant, context-aware home remedies and medical suggestions.
-   **Security-First Architecture**:
    -   **Secure Authentication**: JWT-based auth with HTTP-Only, Secure, SameSite cookies.
    -   **Protection**: Implemented `Helmet` for security headers and `Express-Rate-Limit` to prevent abuse.
-   **User Dashboard**: Track analysis history, view reports, and manage profile.
-   **Responsive Design**: Built with React 19, Vite, and Tailwind CSS v4 for a seamless mobile and desktop experience.

## Technology Stack

### Backend
-   **Runtime**: Node.js & Express.js 5.x
-   **Database**: MongoDB (Mongoose) with connection optimization
-   **Security**: Helmet, Rate Limiting, BCrypt, JWT
-   **AI Integration**: Groq SDK (LLM), Cloudinary (Image Management)

### Frontend
-   **Framework**: React 19 & Vite 7
-   **Styling**: Tailwind CSS 4 & Lucide React
-   **State/Routing**: React Router 7, Context API, Axios

### AI & ML Services
-   **Vision Service**: Python (FastAPI) serving a custom TensorFlow/Keras model.
-   **LLM Service**: Groq API for natural language generation.

## Project Structure

```
AyurVisionMine/
├── backend/            # Express API & Business Logic
├── frontend/           # React + Vite Client
├── mlModel/            # Python FastAPI Vision Service
└── readme.md           # Documentation
```

## Installation & Setup

### Prerequisites
-   Node.js v18+
-   Python 3.9+
-   MongoDB Instance
-   Cloudinary Account
-   Groq API Key

### 1. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:
```env
PORT=3000
FRONTEND_ORIGIN=http://localhost:5173
DB_URI=your_mongodb_connection_string
JWT_KEY=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GROQ_API_KEY=your_groq_api_key
NODE_ENV=development  # Use 'production' for deployment
```

Start the Server:
```bash
npm start
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 3. ML Model Setup
```bash
cd mlModel
pip install -r requirements.txt
fastapi run app.py
```

## Security Features (Production Ready)
-   **HTTP Headers**: Configured via `helmet` to prevent XSS, Clickjacking, etc.
-   **Rate Limiting**: global limit of 100 requests/15min to prevent DDoS.
-   **Secure Cookies**: Authentication tokens are stored in HttpOnly, Secure (in prod) cookies to prevent theft.
-   **Error Handling**: Centralized error handling prevents sensitive info leakage.

## Contributing
Contributions are welcome! Please open an issue or submit a PR.

