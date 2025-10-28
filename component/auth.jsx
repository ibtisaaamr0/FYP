import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export const loginUser = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
};





export const signupUser = async (email, password, name) => {
  const userCredential = await auth().createUserWithEmailAndPassword(
    email,
    password
  );

  const user = userCredential.user;
  const userId = user.email;

  await user.updateProfile({ displayName: name });

  await firestore().collection("users").doc(userId).set({
    email,
    name,
    createdAt: new Date(),
  });

  return userCredential;
};


export const logoutUser = () => {
  return auth().signOut();
};
