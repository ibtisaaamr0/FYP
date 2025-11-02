import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

// ✅ Login
export const loginUser = async (email, password) => {
  const firebaseAuth = auth();
  return firebaseAuth.signInWithEmailAndPassword(email, password);
};

// ✅ Signup
export const signupUser = async (email, password, name) => {
  const firebaseAuth = auth();

  const userCredential = await firebaseAuth.createUserWithEmailAndPassword(
    email,
    password
  );

  const user = userCredential.user;
  const uid = user.uid; // ✅ Always use UID

  // Set display name
  await user.updateProfile({ displayName: name });

  // Save user info in Firestore
  await firestore().collection("users").doc(uid).set({
    uid,
    email,
    name,
    createdAt: firestore.FieldValue.serverTimestamp(), // ✅ server timestamp
  });

  return userCredential;
};

// ✅ Logout
export const logoutUser = async () => {
  const firebaseAuth = auth();
  return firebaseAuth.signOut();
};
