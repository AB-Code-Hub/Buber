# User Registration Endpoint

## 🌟 **Endpoint**: `/users/register`

### **Method**: `POST`

### **Description**:
Welcome to the **User Registration Endpoint**! 🚀 This API allows you to register a new user by submitting their details. Upon successful registration, you'll receive a **JWT token** and the user's data, making it easy to authenticate and manage user sessions.

---

## 📥 **Request Body**

The request body should be a **JSON object** with the following fields:

| Field         | Type   | Description                                                                 | Constraints                          |
|---------------|--------|-----------------------------------------------------------------------------|--------------------------------------|
| `fullName`    | Object | Contains the user's first and last name.                                    |                                      |
| ↳ `firstName` | String | The user's first name.                                                      | Minimum length: 3 characters (required) |
| ↳ `lastName`  | String | The user's last name.                                                       | Minimum length: 3 characters (optional) |
| `email`       | String | The user's email address.                                                   | Minimum length: 5 characters (required) |
| `password`    | String | The user's password.                                                        | Minimum length: 6 characters (required) |

### **Example Request**:
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

---

## 📤 **Responses**

### **201 Created** ✅
- **Description**: User successfully registered.
- **Response Body**:
  ```json
  {
    "token": "jwt_token_here",
    "data": {
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com",
       "_id": "user_id_here",
      "createdAt": "timestamp_here",
      "updatedAt": "timestamp_here"
    }
  }
  ```

---

### **400 Bad Request** ❌
- **Description**: Validation error. Check your request body for missing or invalid fields.
- **Response Body**:
  ```json
  {
    "errors": [
      {
        "msg": "Error message here",
        "param": "field_name",
        "location": "body"
      }
    ]
  }
  ```
- **Description**: Email already registered as a captain.
- **Response Body**:
  ```json
  {
    "message": "email already registred as Captain"
  }
  ```

---

### **500 Internal Server Error** ⚠️
- **Description**: An unexpected error occurred on the server.
- **Response Body**:
  ```json
  {
    "message": "Internal server error",
    "error": "error_message_here"
  }
  ```

---

# User Login Endpoint

## 🌟 **Endpoint**: `/users/login`

### **Method**: `POST`

### **Description**:
Welcome to the **User Login Endpoint**! 🚀 This API allows you to authenticate a user by submitting their email and password. Upon successful authentication, you'll receive a **JWT token** and the user's data, making it easy to manage user sessions.

---

## 📥 **Request Body**

The request body should be a **JSON object** with the following fields:

| Field      | Type   | Description                       | Constraints                          |
|------------|--------|-----------------------------------|--------------------------------------|
| `email`    | String | The user's email address.         | Must be a valid email (required)     |
| `password` | String | The user's password.              | Minimum length: 6 characters (required) |

### **Example Request**:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

---

## 📤 **Responses**

### **200 OK** ✅
- **Description**: User successfully authenticated.
- **Response Body**:
  ```json
  {
    "token": "jwt_token_here",
    "UserData": {
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com",
      "_id": "user_id_here",
      "createdAt": "timestamp_here",
      "updatedAt": "timestamp_here"
    }
  }
  ```

---

### **400 Bad Request** ❌
- **Description**: Validation error. Check your request body for missing or invalid fields.
- **Response Body**:
  ```json
  {
    "errors": [
      {
        "msg": "Error message here",
        "param": "field_name",
        "location": "body"
      }
    ]
  }
  ```
- **Description**: Email registered as a captain.
- **Response Body**:
  ```json
  {
    "message": "email registred as Captain"
  }
  ```

---

### **401 Unauthorized** ❌
- **Description**: Invalid email or password.
- **Response Body**:
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

---

### **500 Internal Server Error** ⚠️
- **Description**: An unexpected error occurred on the server.
- **Response Body**:
  ```json
  {
    "message": "Internal server error",
    "error": "error_message_here"
  }
  ```

---

# User Profile Endpoint

## 🌟 **Endpoint**: `/users/profile`

### **Method**: `GET`

### **Description**:
Welcome to the **User Profile Endpoint**! 🚀 This API allows you to retrieve the authenticated user's profile information. You must be authenticated to access this endpoint.

---

## 🛡️ **Authentication**

This endpoint requires a valid JWT token to be included in the request headers or cookies.

### **Example Request Headers**:
```http
Authorization: Bearer jwt_token_here
```

---

## 📤 **Responses**

### **200 OK** ✅
- **Description**: User profile successfully retrieved.
- **Response Body**:
  ```json
  {
    "_id": "user_id_here",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "createdAt": "timestamp_here",
    "updatedAt": "timestamp_here"
  }
  ```

---

### **401 Unauthorized** ❌
- **Description**: Missing or invalid authentication token.
- **Response Body**:
  ```json
  {
    "message": "Authentication required"
  }
  ```

---

### **500 Internal Server Error** ⚠️
- **Description**: An unexpected error occurred on the server.
- **Response Body**:
  ```json
  {
    "message": "Internal server error",
    "error": "error_message_here"
  }
  ```

---

# User Logout Endpoint

## 🌟 **Endpoint**: `/users/logout`

### **Method**: `POST`

### **Description**:
Welcome to the **User Logout Endpoint**! 🚀 This API allows you to log out the authenticated user by invalidating their JWT token. You must be authenticated to access this endpoint.

---

## 🛡️ **Authentication**

This endpoint requires a valid JWT token to be included in the request headers or cookies.

### **Example Request Headers**:
```http
Authorization: Bearer jwt_token_here
```

---

## 📤 **Responses**

### **200 OK** ✅
- **Description**: User successfully logged out.
- **Response Body**:
  ```json
  {
    "message": "User logout successfully"
  }
  ```

---

### **401 Unauthorized** ❌
- **Description**: Missing or invalid authentication token.
- **Response Body**:
  ```json
  {
    "message": "Authentication required"
  }
  ```

---

### **500 Internal Server Error** ⚠️
- **Description**: An unexpected error occurred on the server.
- **Response Body**:
  ```json
  {
    "message": "Internal server error",
    "error": "error_message_here"
  }
  ```

---

# Captain Registration Endpoint

## 🌟 **Endpoint**: `/captains/register`

### **Method**: `POST`

### **Description**:
Welcome to the **Captain Registration Endpoint**! 🚀 This API allows you to register a new captain by submitting their details. Upon successful registration, you'll receive a **JWT token** and the captain's data, making it easy to authenticate and manage captain sessions.

---

## 📥 **Request Body**

The request body should be a **JSON object** with the following fields:

| Field             | Type   | Description                                                                 | Constraints                          |
|-------------------|--------|-----------------------------------------------------------------------------|--------------------------------------|
| `fullName`        | Object | Contains the captain's first and last name.                                 |                                      |
| ↳ `firstName`     | String | The captain's first name.                                                   | Minimum length: 3 characters (required) |
| ↳ `lastName`      | String | The captain's last name.                                                    | Minimum length: 3 characters (optional) |
| `email`           | String | The captain's email address.                                                | Must be a valid email (required)     |
| `password`        | String | The captain's password.                                                     | Minimum length: 6 characters (required) |
| `vehicle`         | Object | Contains the captain's vehicle details.                                     |                                      |
| ↳ `color`         | String | The vehicle's color.                                                        | Minimum length: 3 characters (required) |
| ↳ `plate`         | String | The vehicle's plate number.                                                 | Minimum length: 3 characters (required) |
| ↳ `capacity`      | Number | The vehicle's capacity.                                                     | Minimum: 1 (required)                |
| ↳ `vehicleType`   | String | The type of vehicle (car, moto, auto).                                | Must be one of: car, motorcycle, auto (required) |

### **Example Request**:
```json
{
  "fullName": {
    "firstName": "Jane",
    "lastName": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "red",
    "plate": "XYZ123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

---

## 📤 **Responses**

### **201 Created** ✅
- **Description**: Captain successfully registered.
- **Response Body**:
  ```json
  {
    "message": "Captain created successfully",
    "token": "jwt_token_here",
    "captain": {
      "fullName": {
        "firstName": "Jane",
        "lastName": "Doe"
      },
      "email": "jane.doe@example.com",
      "password": "$2b$10$4QWJsqGBlNPUXezPwLyFxeBUDAqfpMpvPpN2bgFIhFpdHLxNN",
      "status": "active",    // default
      "vehicle": {
        "color": "red",
        "plate": "XYZ123",
        "capacity": 4,
        "vehicleType": "car"
      },
      "_id": "captain_id_here",
      "createdAt": "timestamp_here",
      "updatedAt": "timestamp_here"
    }
  }
  ```

---

### **400 Bad Request** ❌
- **Description**: Validation error. Check your request body for missing or invalid fields.
- **Response Body**:
  ```json
  {
    "errors": [
      {
        "msg": "Error message here",
        "param": "field_name",
        "location": "body"
      }
    ]
  }
  ```
- **Description**: Email already registered as a user.
- **Response Body**:
  ```json
  {
    "message": "email already registred as User"
  }
  ```

---

### **500 Internal Server Error** ⚠️
- **Description**: An unexpected error occurred on the server.
- **Response Body**:
  ```json
  {
    "message": "Internal server error",
    "error": "error_message_here"
  }
  ```

---

# Captain Login Endpoint

## 🌟 **Endpoint**: `/captains/login`

### **Method**: `POST`

### **Description**:
Welcome to the **Captain Login Endpoint**! 🚀 This API allows you to authenticate a captain by submitting their email and password. Upon successful authentication, you'll receive a **JWT token** and the captain's data, making it easy to manage captain sessions.

---

## 📥 **Request Body**

The request body should be a **JSON object** with the following fields:

| Field      | Type   | Description                       | Constraints                          |
|------------|--------|-----------------------------------|--------------------------------------|
| `email`    | String | The captain's email address.      | Must be a valid email (required)     |
| `password` | String | The captain's password.           | Minimum length: 6 characters (required) |

### **Example Request**:
```json
{
  "email": "jane.doe@example.com",
  "password": "password123"
}
```

---

## 📤 **Responses**

### **200 OK** ✅
- **Description**: Captain successfully authenticated.
- **Response Body**:
  ```json
  {
    "token": "jwt_token_here",
    "captain": {
      "fullName": {
        "firstName": "Jane",
        "lastName": "Doe"
      },
      "email": "jane.doe@example.com",
      "_id": "captain_id_here",
      "createdAt": "timestamp_here",
      "updatedAt": "timestamp_here"
    }
  }
  ```

---

### **400 Bad Request** ❌
- **Description**: Validation error. Check your request body for missing or invalid fields.
- **Response Body**:
  ```json
  {
    "errors": [
      {
        "msg": "Error message here",
        "param": "field_name",
        "location": "body"
      }
    ]
  }
  ```
- **Description**: Email registered as a user.
- **Response Body**:
  ```json
  {
    "message": "email registred as User"
  }
  ```

---

### **401 Unauthorized** ❌
- **Description**: Invalid email or password.
- **Response Body**:
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

---

### **500 Internal Server Error** ⚠️
- **Description**: An unexpected error occurred on the server.
- **Response Body**:
  ```json
  {
    "message": "Internal server error",
    "error": "error_message_here"
  }
  ```

---

# Captain Profile Endpoint

## 🌟 **Endpoint**: `/captains/profile`

### **Method**: `GET`

### **Description**:
Welcome to the **Captain Profile Endpoint**! 🚀 This API allows you to retrieve the authenticated captain's profile information. You must be authenticated to access this endpoint.

---

## 🛡️ **Authentication**

This endpoint requires a valid JWT token to be included in the request headers or cookies.

### **Example Request Headers**:
```http
Authorization: Bearer jwt_token_here
```

---

## 📤 **Responses**

### **200 OK** ✅
- **Description**: Captain profile successfully retrieved.
- **Response Body**:
  ```json
  {
    "captain": {
      "_id": "captain_id_here",
      "fullName": {
        "firstName": "Jane",
        "lastName": "Doe"
      },
      "email": "jane.doe@example.com",
      "createdAt": "timestamp_here",
      "updatedAt": "timestamp_here"
    }
  }
  ```

---

### **401 Unauthorized** ❌
- **Description**: Missing or invalid authentication token.
- **Response Body**:
  ```json
  {
    "message": "Authentication required"
  }
  ```

---

### **500 Internal Server Error** ⚠️
- **Description**: An unexpected error occurred on the server.
- **Response Body**:
  ```json
  {
    "message": "Internal server error",
    "error": "error_message_here"
  }
  ```

---

# Captain Logout Endpoint

## 🌟 **Endpoint**: `/captains/logout`

### **Method**: `POST`

### **Description**:
Welcome to the **Captain Logout Endpoint**! 🚀 This API allows you to log out the authenticated captain by invalidating their JWT token. You must be authenticated to access this endpoint.

---

## 🛡️ **Authentication**

This endpoint requires a valid JWT token to be included in the request headers or cookies.

### **Example Request Headers**:
```http
Authorization: Bearer jwt_token_here
```

---

## 📤 **Responses**

### **200 OK** ✅
- **Description**: Captain successfully logged out.
- **Response Body**:
  ```json
  {
    "message": "Captain logout successfully"
  }
  ```

---

### **401 Unauthorized** ❌
- **Description**: Missing or invalid authentication token.
- **Response Body**:
  ```json
  {
    "message": "Authentication required"
  }
  ```

---

### **500 Internal Server Error** ⚠️
- **Description**: An unexpected error occurred on the server.
- **Response Body**:
  ```json
  {
    "message": "Internal server error",
    "error": "error_message_here"
  }
  ```

---

# Maps Endpoints

## 🌟 **Endpoint**: `/maps/get-coordinates`

### **Method**: `GET`

### **Description**:
This endpoint converts an address string into latitude and longitude coordinates using Google Maps Geocoding API.

---

## 🛡️ **Authentication**

This endpoint requires a valid JWT token to be included in the request headers.

### **Example Request Headers**:
```http
Authorization: Bearer jwt_token_here
```

## 📥 **Query Parameters**

| Parameter  | Type   | Description                    | Constraints                          |
|------------|--------|--------------------------------|--------------------------------------|
| `address`  | String | The address to geocode         | Minimum length: 3 characters (required) |

### **Example Request**:
```http
GET /maps/get-coordinates?address=123 Main Street, City
```

## 📤 **Responses**

### **200 OK** ✅
- **Description**: Successfully retrieved coordinates.
- **Response Body**:
  ```json
  {
    "lat": 12.3456,
    "lng": 78.9012
  }
  ```

---

## 🌟 **Endpoint**: `/maps/get-distance-time`

### **Method**: `GET`

### **Description**:
This endpoint calculates the distance and estimated travel time between two locations using Google Maps Distance Matrix API.

---

## 🛡️ **Authentication**

This endpoint requires a valid JWT token to be included in the request headers.

### **Example Request Headers**:
```http
Authorization: Bearer jwt_token_here
```

## 📥 **Query Parameters**

| Parameter     | Type   | Description                    | Constraints                          |
|---------------|--------|--------------------------------|--------------------------------------|
| `origin`      | String | Starting location              | Minimum length: 3 characters (required) |
| `destination` | String | Ending location                | Minimum length: 3 characters (required) |

### **Example Request**:
```http
GET /maps/get-distance-time?origin=123 Main Street&destination=456 Park Avenue
```

## 📤 **Responses**

### **200 OK** ✅
- **Description**: Successfully retrieved distance and time.
- **Response Body**:
  ```json
  {
    "distance": {
      "text": "5.2 km",
      "value": 5200
    },
    "duration": {
      "text": "15 mins",
      "value": 900
    },
    "status": "OK"
  }
  ```

---

## 🌟 **Endpoint**: `/maps/get-suggestions`

### **Method**: `GET`

### **Description**:
This endpoint provides address suggestions as you type using Google Maps Places Autocomplete API.

---

## 🛡️ **Authentication**

This endpoint requires a valid JWT token to be included in the request headers.

### **Example Request Headers**:
```http
Authorization: Bearer jwt_token_here
```

## 📥 **Query Parameters**

| Parameter | Type   | Description                    | Constraints                          |
|-----------|--------|--------------------------------|--------------------------------------|
| `input`   | String | The text to get suggestions for| Minimum length: 3 characters (required) |

### **Example Request**:
```http
GET /maps/get-suggestions?input=123 Main
```

## 📤 **Responses**

### **200 OK** ✅
- **Description**: Successfully retrieved suggestions.
- **Response Body**:
  ```json
  [
    {
      "description": "123 Main Street, City, Country",
      "place_id": "ChIJ..."
    },
    {
      "description": "123 Main Avenue, City, Country",
      "place_id": "ChIJ..."
    }
  ]
  ```

---

# Ride Endpoints

## 🌟 **Endpoint**: `/rides/create`

### **Method**: `POST`

### **Description**:
This endpoint allows users to create a new ride request. The system will calculate the fare based on the distance, duration, and vehicle type.

---

## 🛡️ **Authentication**

This endpoint requires a valid JWT token to be included in the request headers.

### **Example Request Headers**:
```http
Authorization: Bearer jwt_token_here
```

## 📥 **Request Body**

The request body should be a **JSON object** with the following fields:

| Field         | Type   | Description                    | Constraints                          |
|---------------|--------|--------------------------------|--------------------------------------|
| `pickup`      | String | Starting location              | Minimum length: 3 characters (required) |
| `destination` | String | Ending location                | Minimum length: 3 characters (required) |
| `vehicleType` | String | Type of vehicle               | Must be one of: "moto", "car", "auto" (required) |

### **Example Request**:
```json
{
  "pickup": "123 Main Street",
  "destination": "456 Park Avenue",
  "vehicleType": "car"
}
```

## 📤 **Responses**

### **201 Created** ✅
- **Description**: Ride successfully created.
- **Response Body**:
  ```json
  {
    "_id": "ride_id_here",
    "user": "user_id_here",
    "pickup": "123 Main Street",
    "destination": "456 Park Avenue",
    "fare": 150.50,
    "status": "pending",
    "otp": "123456",
    "createdAt": "timestamp_here",
    "updatedAt": "timestamp_here"
  }
  ```

### **400 Bad Request** ❌
- **Description**: Validation error or invalid vehicle type.
- **Response Body**:
  ```json
  {
    "errors": [
      {
        "msg": "Error message here",
        "param": "field_name",
        "location": "body"
      }
    ]
  }
  ```

### **500 Internal Server Error** ⚠️
- **Description**: An unexpected error occurred on the server.
- **Response Body**:
  ```json
  {
    "message": "Internal server error",
    "error": "error_message_here"
  }
  ```

---

### **Fare Calculation Details**

The fare is calculated based on the following components:

1. **Base Fare**:
   - Motorcycle: ₹20
   - Car: ₹50
   - Auto: ₹30

2. **Per Kilometer Rate**:
   - Motorcycle: ₹5/km
   - Car: ₹10/km
   - Auto: ₹7/km

3. **Per Minute Rate**:
   - Motorcycle: ₹2/min
   - Car: ₹4/min
   - Auto: ₹3/min

The total fare is calculated as:
```
Total Fare = Base Fare + (Distance in km × Per km rate) + (Duration in minutes × Per minute rate)
```

---

## 🌟 **Endpoint**: `/rides/get-fare`

### **Method**: `GET`

### **Description**:
This endpoint calculates the estimated fare for a ride based on the pickup and destination locations. It returns fares for all available vehicle types (motorcycle, car, and auto).

---

## 🛡️ **Authentication**

This endpoint requires a valid JWT token to be included in the request headers.

### **Example Request Headers**:
```http
Authorization: Bearer jwt_token_here
```

## 📥 **Query Parameters**

| Parameter     | Type   | Description                    | Constraints                          |
|---------------|--------|--------------------------------|--------------------------------------|
| `pickup`      | String | Starting location              | Minimum length: 3 characters (required) |
| `destination` | String | Ending location                | Minimum length: 3 characters (required) |

### **Example Request**:
```http
GET /rides/get-fare?pickup=123 Main Street&destination=456 Park Avenue
```

## 📤 **Responses**

### **200 OK** ✅
- **Description**: Successfully calculated fares for all vehicle types.
- **Response Body**:
  ```json
  {
    "moto": 85.50,
    "car": 150.75,
    "auto": 105.25
  }
  ```

### **400 Bad Request** ❌
- **Description**: Validation error. Check your query parameters for missing or invalid fields.
- **Response Body**:
  ```json
  {
    "errors": [
      {
        "msg": "Error message here",
        "param": "field_name",
        "location": "query"
      }
    ]
  }
  ```

### **500 Internal Server Error** ⚠️
- **Description**: An unexpected error occurred on the server.
- **Response Body**:
  ```json
  {
    "message": "Internal server error",
    "error": "error_message_here"
  }
  ```

---





