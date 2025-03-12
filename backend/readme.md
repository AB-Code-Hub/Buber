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



