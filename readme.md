# Signup and Login System with OTP Verification

## Project Overview

This project is a web application featuring a complete signup and login flow with email OTP verification. It includes error handling, a mobile-friendly design, and follows best practices for security and authentication. The application also provides options for users to reset their passwords.

## Features

1. **Signup Flow with Email OTP Verification**
   - Users can sign up by providing their email address and other necessary details.
   - An OTP (One-Time Password) is sent to the user’s email for verification.
   - The signup is completed only after successful OTP verification.
   - Users are shown a welcome page with their information post verification.

2. **Error Handling**
   - Clear error messages are displayed in case of:
     - Incorrect OTP
     - Incorrect form details
     - API failures (e.g., no internet connection)

3. **Login Flow**
   - Users can log in using their email and password.
   - Post-login, users are redirected to the same welcome page displaying their information.

4. **Mobile-Friendly Design**
   - The UI is designed based on the provided Figma design and is optimized for mobile devices using responsive design techniques.

5. **Password Management**
   - Passwords are hashed using industry-standard hashing algorithms.
   - JWT (JSON Web Token) is used for secure authentication and session management.
   - Logged-in users have the option to reset their password by providing their current password and a new password.

## Installation

### Prerequisites

- Node.js (version 18.x or higher)
- npm (Node Package Manager)
- MongoDB (for database storage)

### Clone the Repository

```bash
git clone https://github.com/kunal-216/highway-delite.git
cd signup-login-system
```

### Install Dependencies

```bash
npm install
```

### Start the Application

To start the server in development mode with automatic restarts:

```bash
npm run start
```

## Application Flow

### Signup

1. **User Input**: The user fills out the signup form with email and other details.
2. **OTP Generation**: An OTP is sent to the provided email address.
3. **OTP Verification**: The user enters the received OTP to complete the signup.
4. **Welcome Page**: After successful verification, the user is redirected to a welcome page displaying their information.

### Login

1. **User Input**: The user enters their email and password.
2. **Password Verification**: The provided password is verified against the stored hash.
3. **JWT Authentication**: On successful login, a JWT is issued and the user is redirected to the welcome page.

### Password Reset

1. **User Input**: The user provides their current password and a new password.
2. **Verification**: The current password is verified before updating to the new password.
3. **Update**: The new password is hashed and saved.

## Error Handling

- **Incorrect OTP**: Displays an error message informing the user that the OTP is incorrect.
- **Incorrect Form Details**: Shows a message indicating what details are incorrect.
- **API Failure**: Alerts the user if there is a problem with the API or no internet connection.

## UI/UX Design

- The application UI is designed based on the provided Figma design.
- It is made mobile-friendly using responsive design principles, ensuring a good user experience on both desktop and mobile devices.

## Security Practices

- **Password Hashing**: Passwords are hashed using bcrypt.
- **JWT Authentication**: JSON Web Tokens are used for secure authentication and session management.

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.