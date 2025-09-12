// auth.js
import auth from '@react-native-firebase/auth';

// 🔹 Login
export const loginUser = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
};

// 🔹 Signup
export const signupUser = (email, password) => {
  return auth().createUserWithEmailAndPassword(email, password);
};

// 🔹 Logout
export const logoutUser = () => {
  return auth().signOut();
};
