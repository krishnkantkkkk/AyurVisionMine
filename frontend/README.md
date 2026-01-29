AyurVision Frontend Application
 * A React-based frontend application for Ayurvedic vision analysis and diagnosis.
 * This is a modern, responsive web application built with Vite, React, and Tailwind CSS.
 * 
 * @project AyurVision
 * @version 1.0.0
 * @description Frontend interface for analyzing Ayurvedic health conditions through vision examination
## Project Structure
 * ### Root Configuration Files
 * - `vite.config.js` - Vite build configuration
 * - `tailwind.config.js` - Tailwind CSS framework configuration
 * - `eslint.config.js` - ESLint linting rules configuration
 * - `.env` - Environment variables (API endpoints, keys, etc.)
 * - `.gitignore` - Git ignore patterns
 * - `package.json` - Project dependencies and scripts
 * - `README.md` - Project documentation
 * - `index.html` - HTML entry point
 * 
 * ### Source Directory (`src/`)
 * 
 * #### Core Files
 * - `main.jsx` - Application entry point, React DOM rendering
 * - `App.jsx` - Root component with routing and app-level logic
 * - `index.css` - Global styles and CSS utilities
 * 
 * #### Components (`src/components/`)
 * Reusable UI components throughout the application:
 * - `ExamineCard.jsx` - Card component for displaying examination options
 * - `GetStartedButton.jsx` - Call-to-action button component
 * - `Hero.jsx` - Hero section component for landing/home pages
 * - `Loading.jsx` - Loading spinner/skeleton component
 * - `LoginForm.jsx` - User login form component
 * - `Navbar.jsx` - Navigation bar component
 * - `NeuButton.jsx` - Neumorphic design button component
 * - `Sidebar.jsx` - Sidebar navigation component
 * - `SignupForm.jsx` - User registration form component
 * 
 * #### Context API (`src/contexts/`)
 * State management using React Context:
 * - `UserContext.jsx` - Global user authentication and profile state management
 * 
 * #### Pages (`src/pages/`)
 * Full-page components representing different routes:
 * - `Home.jsx` - Landing/home page
 * - `LoginPage.jsx` - User login page
 * - `SignupPage.jsx` - User registration page
 * - `Dashboard.jsx` - Main user dashboard
 * - `ExaminePage.jsx` - Examination/assessment page
 * - `UploadPage.jsx` - Image/file upload interface
 * - `AnalysisPage.jsx` - Analysis results and findings display
 * - `HistoryPage.jsx` - User examination history and records
 * - `ProfiePage.jsx` - User profile and settings page
 * 
 * #### Protected Routes (`src/protectedWrapper/`)
 * Components for route protection and authentication:
 * - `UserProtectedWrapper.jsx` - Wrapper for authenticated user-only routes
 * - `AuthRedirectProtectedWrapper.jsx` - Wrapper to redirect unauthenticated users
 * 
 * #### Utilities (`src/utils/`)
 * Helper functions and utility modules for common tasks
 * 
 * #### Assets (`src/assets/`)
 * Static assets (images, icons, fonts, etc.)
 * 
 * ## Technology Stack
 * - **Frontend Framework**: React 18+
 * - **Build Tool**: Vite
 * - **Styling**: Tailwind CSS
 * - **Linting**: ESLint
 * - **State Management**: React Context API
 * - **Routing**: React Router (inferred from page structure)
 * 
 * ## Key Features
 * - User authentication (Login/Signup)
 * - User profile and dashboard
 * - Vision-based examination interface
 * - Image upload and processing
 * - Analysis results display
 * - Examination history tracking
 * - Responsive design with Tailwind CSS
 * - Protected routes for authenticated users
 * 
 * ## Getting Started
 * - Install dependencies: `npm install`
 * - Set up environment variables in `.env`
 * - Run development server: `npm run dev`
 * - Build for production: `npm run build`
 * @author Krishn Kant Kumar