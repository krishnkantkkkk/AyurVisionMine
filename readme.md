# AyurVision - Skin Disease Detection & Analysis Platform

AyurVision is a full-stack web application that leverages machine learning to detect and analyze skin diseases from uploaded images. The platform combines a modern React frontend, a Node.js/Express backend, and a Python-based deep learning model to provide users with accurate skin disease predictions and medical analysis.

## Features

- **User Authentication**: Secure signup and login functionality with JWT tokens and bcrypt password hashing
- **Image Upload & Analysis**: Upload skin images for real-time disease detection
- **ML-Powered Predictions**: TensorFlow-based deep learning model for accurate skin disease classification
- **Medical History**: Track and view analysis history for each user
- **Cloud Storage**: Cloudinary integration for reliable image hosting
- **Responsive UI**: Modern, user-friendly interface built with React and Tailwind CSS
- **Protected Routes**: Secure API endpoints with authentication middleware

## Project Structure

```
AyurVisionMine/
├── readme.md                   # Project documentation
│
├── backend/                    # Node.js/Express API server
│   ├── app.js                 # Main server entry point
│   ├── Dockerfile             # Container configuration
│   ├── package.json           # Backend dependencies
│   ├── readme.md              # Backend documentation
│   ├── config/
│   │   └── cloudinary.js      # Cloudinary configuration
│   ├── controllers/
│   │   ├── diseaseController.js    # Disease analysis logic
│   │   └── userController.js       # User management logic
│   ├── db/
│   │   └── db.js              # MongoDB connection setup
│   ├── middlewares/
│   │   └── isLoggedIn.js       # Authentication middleware
│   ├── models/
│   │   ├── diseaseModel.js     # Disease schema
│   │   └── userModel.js        # User schema
│   ├── routes/
│   │   ├── diseaseRouter.js    # Disease endpoints
│   │   └── userRouter.js       # User endpoints
│   └── utils/
│       ├── analyzeImage.js     # Image analysis utility
│       ├── hashGenerator.js    # Hash generation
│       ├── multerConfig.js     # Multer upload configuration
│       ├── tokenGenerator.js   # JWT token generation
│       └── verifyPassword.js   # Password verification
│
├── frontend/                   # React + Vite application
│   ├── eslint.config.js       # ESLint configuration
│   ├── index.html             # HTML entry point
│   ├── package.json           # Frontend dependencies
│   ├── README.md              # Frontend documentation
│   ├── tailwind.config.js     # Tailwind CSS configuration
│   ├── vite.config.js         # Vite build configuration
│   ├── public/                # Static assets
│   └── src/
│       ├── App.jsx            # Main app component
│       ├── index.css          # Global styles
│       ├── main.jsx           # Vite entry point
│       ├── assets/            # Image and media assets
│       ├── components/        # Reusable React components
│       │   ├── ExamineCard.jsx      # Image examination card
│       │   ├── GetStartedButton.jsx # Call-to-action button
│       │   ├── Hero.jsx             # Hero section
│       │   ├── Loading.jsx          # Loading indicator
│       │   ├── LoginForm.jsx        # Login form component
│       │   ├── Navbar.jsx           # Navigation bar
│       │   ├── NeuButton.jsx        # Neuomorphic button
│       │   ├── Sidebar.jsx          # Sidebar navigation
│       │   └── SignupForm.jsx       # Signup form component
│       ├── contexts/          # React context providers
│       │   ├── AxiosContext.jsx     # Axios instance context
│       │   └── UserContext.jsx      # User state context
│       ├── pages/             # Page components
│       │   ├── AnalysisPage.jsx     # Disease analysis results
│       │   ├── Dashboard.jsx        # User dashboard
│       │   ├── ExaminePage.jsx      # Image examination page
│       │   ├── HistoryPage.jsx      # Analysis history
│       │   ├── Home.jsx             # Landing page
│       │   ├── LoginPage.jsx        # Login page
│       │   ├── ProfiePage.jsx       # User profile page
│       │   ├── SignupPage.jsx       # Signup page
│       │   ├── UploadPage.jsx       # Image upload page
│       │   └── User.jsx             # User page
│       ├── protectedWrapper/ # Route protection HOCs
│       │   ├── AuthRedirectProtectedWrapper.jsx  # Auth redirect wrapper
│       │   └── UserProtectedWrapper.jsx          # User access wrapper
│       └── utils/             # Utility functions
│           └── callLogout.js  # Logout helper function
│
└── mlModel/                    # Python ML Model with FastAPI
    ├── app.py                 # FastAPI server
    ├── Dockerfile             # Container configuration
    ├── readme.md              # ML Model documentation
    ├── requirements.txt       # Python dependencies
    ├── skin_disease_model.keras  # Pre-trained TensorFlow model
    └── utils/
        ├── classes.py         # Disease class definitions
        ├── load_model.py      # Model loading utility
        ├── predict.py         # Prediction logic
        └── __pycache__/       # Python cache directory
```

## Technology Stack

### Backend
- **Express.js** 5.x - Web framework
- **MongoDB** - Database (via Mongoose)
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Cloudinary** - Image hosting and management
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** 19.x - UI library
- **Vite** 7.x - Build tool
- **React Router** 7.x - Client-side routing
- **Tailwind CSS** 4.x - Styling
- **Axios** - HTTP client
- **Lucide React** - Icon library

### ML Model
- **TensorFlow/Keras** - Deep learning framework
- **FastAPI** - API framework
- **Python** - ML implementation

## Installation & Setup

### Prerequisites
- Node.js 16+
- Python 3.8+
- MongoDB (local or cloud instance)
- Cloudinary account
- Git

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```env
PORT=3000
HOST=localhost
FRONTEND_ORIGIN=http://localhost:5173
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_jwt_secret_key
```

4. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

### ML Model Setup

1. Navigate to the ML model directory:
```bash
cd mlModel
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Start the FastAPI server:
```bash
fastapi run app.py
```

The ML model API will run on `http://localhost:8000`

```

## API Endpoints

### User Routes (`/users`)
- `POST /users/signup` - User registration
- `POST /users/login` - User login
- `POST /users/logout` - User logout
- `GET /users/profile` - Get user profile

### Disease Routes (`/diseases`)
- `POST /diseases/create` - Upload image and create disease record
- `GET /diseases/fetchOne/:id` - Fetch specific disease analysis
- `GET /diseases/fetchOnePatientAllDiseases` - Get all disease records for logged-in user

## Authentication

The application uses JWT (JSON Web Tokens) for authentication:
- Tokens are issued upon successful login
- Tokens are stored in HTTP-only cookies
- Protected routes require valid token in the `isLoggedIn` middleware
- Passwords are hashed using bcrypt

## Frontend Pages

- **Home** - Landing page with introduction
- **Login** - User login form
- **Signup** - User registration form
- **Dashboard** - Main user dashboard
- **Upload** - Image upload for disease analysis
- **Examine** - View and examine uploaded images
- **Analysis** - View detailed disease predictions
- **History** - View past analyses
- **Profile** - User profile and settings

## ML Model Features

- **Skin Disease Classification** - Identifies multiple skin diseases
- **Confidence Scoring** - Provides prediction confidence levels
- **Image Preprocessing** - Automatic image normalization and preparation
- **TensorFlow-based** - Uses pre-trained Keras model for predictions

## Integration Flow

1. User uploads an image via the frontend
2. Frontend sends image to backend API
3. Backend processes image with Multer and uploads to Cloudinary
4. Backend forwards image to ML model for analysis
5. ML model returns prediction with confidence scores
6. Backend stores analysis in MongoDB
7. Frontend displays results to user
8. User can view history of all analyses

## Additional Documentation

- See `/backend/readme.md` for backend-specific details
- See `/frontend/README.md` for frontend-specific details
- See `/mlModel/readme.md` for ML model documentation

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

ISC

## Support

For issues, questions, or contributions, please open an issue in the repository.

---

**Built with ❤️ for healthcare innovation**
