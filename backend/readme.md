# AyurVision Backend API Documentation

## User Authentication Endpoints

### 1. User Registration

**Endpoint:** `POST /users/register`

**Description:** Register a new user account with name, email, and password.

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

**Request Example:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (Success - 201):**
```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Response (Error - 400):**
```json
{
  "message": "User already exists"
}
```

**Notes:**
- Email must be unique
- Password is hashed before storing in database
- Returns a JWT token upon successful registration
- User ID, name, and email are returned without password

---

### 2. User Login

**Endpoint:** `POST /users/login`

**Description:** Login with existing user credentials (email and password).

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Request Example:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (Success - 201):**
```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Response (Error - 401):**
```json
{
  "message": "Invalid email or password"
}
```

**Notes:**
- Email must exist in the database
- Password is verified against the hashed password in database
- Returns a JWT token upon successful login
- User ID, name, and email are returned without password

---

### 3. User Logout

**Endpoint:** `GET /users/logout`

**Description:** Logout the current user and clear their authentication token.

**Response (Success - 200):**
```
Logout successful
```

**Notes:**
- Clears the 'token' cookie from the client
- No request body required

---

### 4. User Profile

**Endpoint:** `GET /users/profile`

**Description:** Retrieve the authenticated user's profile information. This endpoint is protected and requires a valid JWT token.

**Authentication:** Required (JWT Token)
- Token must be passed in the `Authorization` header as `Bearer {token}` or in cookies as `token`

**Request Headers:**
```
Authorization: Bearer {jwt_token}
```
OR
```
Cookie: token={jwt_token}
```

**Response (Success - 200):**
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response (Error - 401):**
```json
{
  "message": "Unauthorized access"
}
```

**Notes:**
- Requires authentication via `isLoggedIn` middleware
- Returns the authenticated user object
- No request body required
- Password is never returned in the response
- Status code 401 is returned if the token is invalid, expired, or missing

---

## Error Handling

All endpoints handle errors gracefully and return appropriate HTTP status codes:
- **201:** Success (Registration/Login)
- **400:** Bad Request (User already exists during registration)
- **401:** Unauthorized (Invalid credentials during login)

