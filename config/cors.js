// server/config/cors.js
const NODE_ENV = process.env.NODE_ENV || 'development';

// Get allowed origins from environment variable
const getAllowedOrigins = () => {
  const origin = process.env.ALLOWED_ORIGINS;
  
  if (!origin) {
    // Default fallback
    if (NODE_ENV === 'production') {
      return ['https://yourdomain.com']; // Change to your actual domain
    }
    return ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173', 'https://www.tayyabmughal.tech/','https://tayyab-client-kubjm3f3g-tayyabmughal7272-7334s-projects.vercel.app/'];
  }
  
  // Split comma-separated origins
  return origin.split(',').map(o => o.trim());
};

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = getAllowedOrigins();
    
    // Allow requests with no origin (like mobile apps, curl requests, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS policy: ' + origin));
    }
  },
  
  credentials: true,
  
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'x-auth-token',
    'X-Requested-With',
    'Accept',
    'Origin'
  ],
  
  exposedHeaders: ['X-Total-Count', 'X-Page-Count'],
  
  maxAge: 86400, // 24 hours
  
  optionsSuccessStatus: 200
};

module.exports = corsOptions;
