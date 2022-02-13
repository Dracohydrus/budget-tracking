const isDevelopment = process.env.NODE_ENV === 'development'
export const SIGN_IN = isDevelopment ? "http://localhost:3000/login" : "https://kris-banking-app.herokuapp.com/";