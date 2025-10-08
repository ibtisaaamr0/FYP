import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

// 🔹 Login
export const loginUser = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
};



export const signupUser = async (email, password, name) => {
  // Create user in Firebase Auth
  const userCredential = await auth().createUserWithEmailAndPassword(
    email,
    password
  );

  const user = userCredential.user;
  const userId = user.email;

  // Update Firebase Auth profile (so you can use user.displayName)
  await user.updateProfile({ displayName: name });

  // Store extra details in Firestore
  await firestore().collection("users").doc(userId).set({
    email,
    name,
    createdAt: new Date(),
  });

  return userCredential;
};


// 🔹 Logout
export const logoutUser = () => {
  return auth().signOut();
};
