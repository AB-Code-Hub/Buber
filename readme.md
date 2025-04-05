

# Buber - Ride Hailing Platform





## 🌐 Project Overview

Buber is a full-stack ride-hailing platform connecting riders with drivers ("captains"). The system consists of:

- **Frontend**: Modern React application with real-time features
- **Backend**: Node.js/Express API with microservices architecture
- **Database**: MongoDB with geospatial indexing
- **Realtime**: Socket.IO for live updates
- **Auth**: JWT-based authentication system




## ✨ Features

### Frontend Features
| Feature | Description | Tech Used |
|---------|-------------|-----------|
| Authentication Flow | Separate login/signup for riders/captains | React Router, JWT |
| Real-time Tracking | Live ride location updates | Socket.IO, Google Maps |
| Ride Management | Create, track, and complete rides | React Context, Axios |
| Responsive UI | Mobile-first interface | Tailwind CSS, GSAP |
| Notifications | Toast and in-app notifications | React Hot Toast |

### Backend Features
| Feature | Description | Tech Used |
|---------|-------------|-----------|
| Auth Service | User/captain authentication | JWT, Bcrypt |
| Ride Service | Ride lifecycle management | Mongoose, GeoJSON |
| Notification Service | Real-time notifications | Socket.IO,  |
| API Gateway | Route handling and rate limiting | Express|

---

## 🛠 Technology Stack

### Frontend Stack
| Component | Technology | Version |
|-----------|------------|---------|
| Framework | React | 19.0.0 |
| State Management | React Context | Native |
| Routing | React Router | 7.3.0 |
| Styling | Tailwind CSS | 3.4.17 |
| Build Tool | Vite | 6.2.0 |
| HTTP Client | Axios | 1.8.3 |
| Realtime | Socket.IO Client | 4.8.1 |

### Backend Stack
| Component | Technology | Version |
|-----------|------------|---------|
| Runtime | Node.js | 20.x |
| Framework | Express | 4.18.2 |
| Database | MongoDB | 7.0 |
| ODM | Mongoose | 8.1.3 |
| Authentication | JWT | 9.0.2 |

---



### Key Functionality
1. **Authentication Flow**
   ```javascript
   // Example auth context
   const AuthProvider = ({children}) => {
     const [user, setUser] = useState(null);
     
     const login = async (credentials) => {
       const {data} = await axios.post('/api/auth/login', credentials);
       localStorage.setItem('token', data.token);
       setUser(data.user);
     };
     
     return (
       <AuthContext.Provider value={{user, login}}>
         {children}
       </AuthContext.Provider>
     );
   };
   ```

2. **Real-time Updates**
   ```javascript
   // Socket.IO implementation
   useEffect(() => {
     const socket = io(API_URL);
     
     socket.on('ride-update', (update) => {
       setRideStatus(update.status);
       toast.success(`Ride status updated to: ${update.status}`);
     });
     
     return () => socket.disconnect();
   }, []);
   ```

---

## ⚙️ Backend Details

### Service Architecture
```bash
src/
├── config/         # Environment config
├── controllers/    # Route controllers
│   ├── auth.controller.js
│   └── ride.controller.js
├── models/         # MongoDB models
│   ├── user.model.js
│   └── ride.model.js
├── routes/         # Express routers
├── middleware/     # Custom middleware
├── services/       # Business logic
├── utils/          # Helper functions
└── app.js          # Main application
```

### Core Services
1. **Ride Management Service**
   ```javascript
   // Ride model
   const rideSchema = new mongoose.Schema({
     rider: { type: Schema.Types.ObjectId, ref: 'User' },
     captain: { type: Schema.Types.ObjectId, ref: 'User' },
     pickupLocation: {
       type: { type: String, default: 'Point' },
       coordinates: [Number]
     },
     status: { 
       type: String, 
       enum: ['pending', 'accepted', 'ongoing', 'completed'],
       default: 'pending'
     },
     fare: Number
   }, { timestamps: true });
   
   rideSchema.index({ pickupLocation: '2dsphere' });
   ```

2. **Authentication Middleware**
   ```javascript
   // JWT verification middleware
   const authenticate = async (req, res, next) => {
     const token = req.headers.authorization?.split(' ')[1];
     
     try {
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       req.user = await User.findById(decoded.id);
       next();
     } catch (error) {
       return res.status(401).json({ message: 'Unauthorized' });
     }
   };
   ```

---

## 🔌 API Documentation

### Authentication Endpoints
| Endpoint | Method | Description | Request Body |
|----------|--------|-------------|--------------|
| `/api/auth/login` | POST | User login | `{ email, password }` |
| `/api/auth/signup` | POST | User registration | `{ name, email, password }` |
| `/api/auth/refresh` | POST | Refresh access token | `{ refreshToken }` |

### Ride Endpoints
| Endpoint | Method | Description | Parameters |
|----------|--------|-------------|------------|
| `/api/rides` | POST | Create new ride | `{ pickup, destination }` |
| `/api/rides/:id/accept` | PATCH | Accept ride | `rideId` |
| `/api/rides/:id/complete` | PATCH | Complete ride | `rideId` |

---

## 🚀 Installation & Setup

### Frontend
```bash
git clone https://github.com/AB-Code-Hub/buber-frontend.git
cd buber-frontend
npm install
cp .env.example .env
# Update environment variables
npm run dev
```

### Backend
```bash
git clone https://github.com/AB-Code-Hub/buber-backend.git
cd buber-backend
npm install
cp .env.example .env
# Configure MongoDB and other services
npm start
```

---

## ⚙️ Configuration

### Frontend Environment
```env
VITE_API_URL=http://localhost:3000/api
VITE_MAP_API_KEY=your_google_maps_key
VITE_SOCKET_URL=http://localhost:3000
```

### Backend Environment
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/buber
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://localhost:6379
GOOGLE_MAPS_KEY=your_maps_api_key
```

---

## 🛡 Important Notes

1. **Security Considerations**
   - Always use HTTPS in production
   - Implement proper CORS configuration
   - Rate limit sensitive endpoints
   - Sanitize user input and use parameterized queries

2. **Performance Optimization**
   - Implement Redis caching for frequent queries
   - Add database indexing for geospatial queries
   - Use compression middleware in Express
   - Optimize React component rendering

3. **Pending Improvements**
   - Frontend: Tablet-responsive layouts
   - Backend: Rate limiting implementation
   - System: End-to-end testing suite
   - DevOps: CI/CD pipeline setup

---






## 🤝 Contributing

1. Create an issue describing your proposed change
2. Fork the repository and create a feature branch
3. Submit a pull request with:
   - Detailed description of changes
   - Updated documentation
   - Relevant test cases
4. Ensure all tests pass and code meets linting standards

---



*Maintained by: Bilal Chaudhary*  
*Contact: mobilal560@gmail.com*