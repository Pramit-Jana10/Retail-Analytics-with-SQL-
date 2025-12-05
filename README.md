Name-Pramit Jana IoT-54 

# DBMS Backend API

A Node.js Express backend server for database management system with PostgreSQL (Neon) integration.

## Features

- RESTful API endpoints for database reports
- PostgreSQL (Neon) integration with SSL support
- CORS enabled for frontend integration
- Error handling and logging
- Health check endpoint

## Setup Instructions

### 1. Install Dependencies
```cmd
npm install
```

### 2. Database Configuration
1. Copy the environment template:
   ```cmd
   copy .env.example .env
   ```

2. Edit the `.env` file and replace the `DATABASE_URL` with your actual Neon PostgreSQL connection string

### 3. Run the Application
```cmd
npm start
```

The server will start on `http://localhost:3001`

## API Endpoints

### Health Check
- **GET** `/health` - Server health status

### Report Endpoints
All report endpoints are under `/api/reports/`:

- **GET** `/api/reports/top-products-by-store` - Get top 20 selling products at each store
- **GET** `/api/reports/top-products-by-state` - Get top 20 selling products in each state  
- **GET** `/api/reports/top-stores-by-sales` - Get top 5 stores with the most sales this year
- **GET** `/api/reports/coke-vs-pepsi` - Get number of stores where Coke outsells Pepsi
- **GET** `/api/reports/bought-with-milk` - Get top 3 products bought with milk

## Database Configuration

The application connects to PostgreSQL (Neon) with the following configuration:

- **Provider**: Neon PostgreSQL
- **Connection**: Via connection string in DATABASE_URL environment variable
- **SSL**: Enabled (required for Neon)
- **Connection Pooling**: Enabled for better performance

## Environment Variables

- `DATABASE_URL` - Your Neon PostgreSQL connection string
- `PORT` - Server port (default: 3001)

## Error Handling

The application includes:

- Database connection testing on startup
- Route-level error handling
- Global error middleware
- 404 handler for unknown routes

## Dependencies

- `express` - Web framework
- `pg` - PostgreSQL database driver with Promise support
- `cors` - Cross-Origin Resource Sharing middleware
- `dotenv` - Environment variable management