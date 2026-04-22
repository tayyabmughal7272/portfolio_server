# CORS Configuration Guide

## Overview
This guide explains the CORS (Cross-Origin Resource Sharing) configuration for production deployment.

## Files
- `config/cors.js` - Main CORS configuration logic
- `.env` - Development environment variables
- `.env.production` - Production environment template

## How It Works

### Development Mode
- Automatically allows: `http://localhost:5173`, `http://localhost:3000`, `http://127.0.0.1:5173`
- Credentials enabled
- Allows all methods and headers

### Production Mode
- Only allows origins specified in `ALLOWED_ORIGINS` environment variable
- Credentials supported
- Restricted to necessary HTTP methods and headers
- Pre-flight requests cached for 24 hours

## Configuration Options

### ALLOWED_ORIGINS
Format: Comma-separated list of full URLs

**Development Example:**
```
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

**Production Examples:**

Single domain:
```
ALLOWED_ORIGINS=https://yourdomain.com
```

Multiple domains:
```
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com,https://admin.yourdomain.com
```

Subdomain:
```
ALLOWED_ORIGINS=https://app.yourdomain.com,https://admin.yourdomain.com
```

### NODE_ENV
- `development` - Relaxed CORS restrictions, development defaults
- `production` - Strict CORS enforcement, requires specific origins

## Deployment Steps

1. **Set Environment Variable**
   ```bash
   export NODE_ENV=production
   export ALLOWED_ORIGINS=https://yourdomain.com
   ```

2. **For PM2 Deployment**
   Create ecosystem.config.js:
   ```javascript
   module.exports = {
     apps: [{
       name: 'portfolio-api',
       script: './server.js',
       env: {
         NODE_ENV: 'production',
         ALLOWED_ORIGINS: 'https://yourdomain.com',
         PORT: 5000
       }
     }]
   };
   ```

3. **Update Frontend URL**
   - Update `frontend/.env`:
     ```
     VITE_API_URL=https://your-backend-domain.com/api
     ```

## Security Features

✅ **Origin Validation** - Only specified origins can access API
✅ **Credentials Support** - Authenticated requests work properly
✅ **Method Restriction** - Limited HTTP methods (GET, POST, PUT, DELETE, etc.)
✅ **Header Filtering** - Only necessary headers allowed
✅ **Preflight Caching** - Reduced preflight requests (24-hour cache)
✅ **No Wildcard Origins** - Explicit origin whitelisting

## Troubleshooting

### CORS Error in Production
```
Access to XMLHttpRequest from origin 'https://yourdomain.com' has been blocked by CORS policy
```

**Solution:**
1. Check `ALLOWED_ORIGINS` includes your frontend domain
2. Ensure `NODE_ENV=production`
3. Use exact protocol (http:// vs https://)
4. No trailing slashes in origins

### Testing CORS
```bash
curl -H "Origin: https://yourdomain.com" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS https://your-api.com/api/projects \
     -v
```

## Best Practices

1. **Always use HTTPS in production** - Set `ALLOWED_ORIGINS` with https://
2. **Be specific** - List exact domains, avoid wildcards
3. **Change JWT_SECRET** - Use strong, unique secret in production
4. **Rotate credentials** - Regularly update API keys and secrets
5. **Monitor requests** - Log suspicious CORS rejections
6. **Use environment variables** - Never hardcode sensitive data
