# AyurVision - Frontend

A modern, responsive web interface for the AyurVision skin disease detection platform. Built with React 19, Vite 7, and Tailwind CSS 4, it provides a seamless user experience for uploading images, viewing analysis results, and managing medical history.

## Features

-   **Modern UI/UX**: Clean, responsive interface built with Tailwind CSS v4.
-   **Authentication**: Integrated Login and Signup forms with secure JWT handling.
-   **Dashboard**: Centralized hub for users to manage their profile and history.
-   **Image Upload**: Drag-and-drop support for skin image analysis.
-   **Real-time Analysis**: Instant display of ML predictions and AI-generated remedies.
-   **Route Protection**: Secure routes that redirect unauthenticated users.

## Technology Stack

-   **Framework**: [React 19](https://react.dev/)
-   **Build Tool**: [Vite 7](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
-   **Routing**: [React Router 7](https://reactrouter.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **HTTP Client**: [Axios](https://axios-http.com/)

## Project Structure

```
src/
├── assets/          # Static assets (images, logos)
├── components/      # Reusable UI components
│   ├── Navbar.jsx   # Top navigation
│   ├── Sidebar.jsx  # Dashboard navigation
│   └── ...
├── contexts/        # React Context (UserContext, AxiosContext)
├── pages/           # Full-page views
│   ├── Home.jsx     # Landing page
│   ├── Dashboard.jsx # User dashboard
│   ├── ExaminePage.jsx # Analysis interface
│   └── ...
├── protectedWrapper/ # HOCs for route security
└── utils/           # Helper functions
```

## Setup & Installation

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

4.  **Build for production:**
    ```bash
    npm run build
    ```

## Environment Variables

Ensure you have a `.env` file in the `frontend` directory (though most config is currently hardcoded or relative, best practice suggests using VITE_ prefixed variables for API endpoints):

```env
VITE_API_URL=http://localhost:3000
```
*(Note: Current implementation may use proxy or direct URLs, check `AxiosContext.jsx`)*

## Contributing

1.  Fork the repo
2.  Create a feature branch
3.  Commit your changes
4.  Push to the branch
5.  Create a Pull Request

---
**Built for AyurVision**