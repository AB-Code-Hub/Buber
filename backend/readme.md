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
| ↳ `vehicleType`   | String | The type of vehicle (car, motorcycle, auto).                                | Must be one of: car, motorcycle, auto (required) |

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
      "status": "inactive",    // default
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





