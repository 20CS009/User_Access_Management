# User Access Management Backend

## Setup Instructions

1. Install Node.js and PostgreSQL.
2. Clone the repository.
3. Install dependencies: `npm install`
4. Configure the `.env` file with your PostgreSQL credentials and JWT secret.
5. Start the server: `npm start`

## API Documentation

### Authentication
- `POST /api/auth/signup` - Sign up a new user (default role: Employee)
  - Body: `{ username: string, password: string }`
  - Response: `{ token: string, role: string }`
- `POST /api/auth/login` - Login and receive JWT token
  - Body: `{ username: string, password: string }`
  - Response: `{ token: string, role: string }`

### Software Management
- `POST /api/software` - Create new software (Admin only)
  - Body: `{ name: string, description: string, accessLevels: string[] }`
  - Response: Software object
- `GET /api/software` - List all software (Employee, Manager)
  - Response: Array of Software objects

### Access Requests
- `POST /api/requests` - Submit access request (Employee only)
  - Body: `{ softwareId: number, accessType: string, reason: string }`
  - Response: Request object
- `PATCH /api/requests/:id` - Approve or reject request (Manager only)
  - Body: `{ status: 'Approved' | 'Rejected' }`
  - Response: Updated Request object
- `GET /api/requests` - List pending requests (Manager only)
  - Response: Array of Request objects with user and software relations

