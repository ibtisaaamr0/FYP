import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { signupUser } from "../component/auth";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await signupUser(email, password);
      Alert.alert("Success", "Account created!");
      navigation.navigate("Login"); // back to login
    } catch (error) {
      Alert.alert("Signup Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign Up</Text>

      <TextInput
        placeholder="Enter email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Enter password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <Pressable style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Create Account</Text>
      </Pressable>

      <Pressable
        style={[styles.button, { backgroundColor: "#012d58" }]}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Back to Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fdfdfd",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#012d58",
  },
  input: {
    backgroundColor: "#eee",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  button: {
    backgroundColor: "#3b658f",
    borderRadius: 20,
    padding: 12,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold" },
});
