# AyurVision Backend API Documentation

## User Authentication Endpoints

### 1. User Registration

**Endpoint:** `POST /users/register`

**Description:** Register a new user account with first name, last name, email, and password.

**Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string"
}
```

**Request Example:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
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
    "firstName": "John",
    "lastName": "Doe",
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
- User ID, firstName, lastName, and email are returned without password

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
    "firstName": "John",
    "lastName": "Doe",
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
- User ID, firstName, lastName, and email are returned without password

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
  "firstName": "John",
  "lastName": "Doe",
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

### 5. User Update

**Endpoint:** `POST /users/update`

**Description:** Update the authenticated user's profile information. This endpoint is protected and requires a valid JWT token.

**Authentication:** Required (JWT Token)
- Token must be passed in the `Authorization` header as `Bearer {token}` or in cookies as `token`

**Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "age": "number"
}
```

**Request Example:**
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com",
  "age": 28
}
```

**Response (Success - 200):**
```json
{
  "_id": "user_id",
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com",
  "age": 28
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
- Updates user profile with provided fields
- Returns the updated user object
- Status code 401 is returned if the token is invalid, expired, or missing

---

## Disease Analysis Endpoints

### 1. Create Disease Record

**Endpoint:** `POST /diseases/create`

**Description:** Create a new disease record with detailed information. This endpoint is protected and requires a valid JWT token.

**Authentication:** Required (JWT Token)

**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "date": "string",
  "remedies": "string",
  "suggestion": "string",
  "cause": "string",
  "suggestion_seriousness": "string"
}
```

**Request Example:**
```json
{
  "name": "Skin Disease",
  "description": "Red spots on skin",
  "date": "2024-01-20",
  "remedies": "Apply neem oil",
  "suggestion": "Consult dermatologist",
  "cause": "Fungal infection",
  "suggestion_seriousness": "Moderate"
}
```

**Response (Success - 201):**
```json
{
  "disease": {
    "_id": "disease_id",
    "name": "Skin Disease",
    "description": "Red spots on skin",
    "date": "2024-01-20",
    "remedies": "Apply neem oil",
    "suggestion": "Consult dermatologist",
    "cause": "Fungal infection",
    "suggestion_seriousness": "Moderate",
    "patient": "user_id"
  }
}
```

**Notes:**
- Requires authentication via `isLoggedIn` middleware
- Disease is automatically associated with the authenticated user
- All fields are required for proper documentation

---

### 2. Fetch Single Disease

**Endpoint:** `GET /diseases/fetchOne`

**Description:** Retrieve a specific disease record by ID. This endpoint is protected and requires a valid JWT token.

**Authentication:** Required (JWT Token)

**Request Body:**
```json
{
  "id": "disease_id"
}
```

**Response (Success - 200):**
```json
{
  "_id": "disease_id",
  "name": "Skin Disease",
  "description": "Red spots on skin",
  "date": "2024-01-20",
  "remedies": "Apply neem oil",
  "suggestion": "Consult dermatologist",
  "cause": "Fungal infection",
  "suggestion_seriousness": "Moderate",
  "patient": "user_id"
}
```

**Response (Error - 404):**
```json
{
  "message": "Not Found"
}
```

**Notes:**
- Only users can retrieve their own disease records
- Returns 404 if the disease does not exist or belongs to another user

---

### 3. Fetch All Diseases for Patient

**Endpoint:** `GET /diseases/fetchOnePatientAllDiseases`

**Description:** Retrieve all disease records for the authenticated user. This endpoint is protected and requires a valid JWT token.

**Authentication:** Required (JWT Token)

**Response (Success - 200):**
```json
{
  "diseasesList": [
    {
      "_id": "disease_id_1",
      "name": "Skin Disease",
      "description": "Red spots on skin",
      "patient": "user_id"
    },
    {
      "_id": "disease_id_2",
      "name": "Headache",
      "description": "Persistent headache",
      "patient": "user_id"
    }
  ]
}
```

**Notes:**
- Requires authentication via `isLoggedIn` middleware
- Returns all diseases associated with the authenticated user
- Returns an empty list if the user has no disease records

---

### 4. Analyze Disease with Image

**Endpoint:** `POST /diseases/analyze`

**Description:** Upload and analyze an image to detect and record a disease. This endpoint is protected and requires a valid JWT token and multipart image upload.

**Authentication:** Required (JWT Token)

**Request:** Multipart Form Data
- `image`: Image file (required)

**Response (Success - 201):**
```json
{
  "_id": "disease_id",
  "name": "Alchoimiosis",
  "description": "This is the disease",
  "image": "cloudinary_image_url",
  "patient": "user_id"
}
```

**Notes:**
- Requires authentication via `isLoggedIn` middleware
- Image is uploaded to Cloudinary and stored in the "diseaeImage" folder
- Currently returns a predefined disease name "Alchoimiosis" (to be integrated with actual disease detection model)
- The image URL is stored in the database for future reference
- Returns 201 status code upon successful analysis

---

## Error Handling

All endpoints handle errors gracefully and return appropriate HTTP status codes:
- **201:** Success (Registration/Login/Create Disease/Analyze Disease)
- **200:** Success (Update/Fetch operations)
- **400:** Bad Request (User already exists during registration)
- **401:** Unauthorized (Invalid credentials, invalid/expired/missing token)
- **404:** Not Found (Disease not found)

