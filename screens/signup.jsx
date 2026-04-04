import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  Alert,
  Image,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import * as Animatable from "react-native-animatable";
import { signupUser } from "../component/auth";
import Logo from "../logo.png";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignup = async () => {
    try {
      if (!email || !password || !name) {
        Alert.alert("Error", "Please fill in all fields.");
        return;
      }

      await signupUser(email, password, name);
      Alert.alert("Success", "Account created!");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Signup Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={["#b42f2f", "#FF6A3D"]} style={styles.header}>
        <Animatable.Image
          animation="zoomIn"
          duration={800}
          delay={200}
          source={Logo}
          style={styles.logo}
        />
        <Animatable.Text
          animation="fadeInDown"
          delay={400}
          style={styles.title}
        >
          Silent Voice
        </Animatable.Text>
      </LinearGradient>

      {/* Bottom Section */}
      <Animatable.View
        animation="fadeInUp"
        delay={500}
        style={styles.bottomCard}
      >
        <Text style={styles.heading}>Create Account ✨</Text>
        <Text style={styles.subtext}>
          Join the Silent Voice community today
        </Text>

        <Text style={styles.label}>Name</Text>
        <TextInput
          placeholder="Enter your name"
          placeholderTextColor="#888"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Enter your password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        <Pressable style={styles.button} onPress={handleSignup}>
          <LinearGradient
            colors={["#FF6A3D", "#b42f2f"]}
            style={styles.gradientButton}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </LinearGradient>
        </Pressable>

        <Text style={styles.loginText}>Already have an account?</Text>

        <Pressable
          style={styles.loginButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.loginButtonText}>Back to Login</Text>
        </Pressable>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffececff",
  },
  header: {
    height: "40%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 25,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "700",
  },
  bottomCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -40,
    padding: 25,
    elevation: 8,
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#b42f2f",
    textAlign: "center",
  },
  subtext: {
    fontSize: 13,
    color: "#777",
    textAlign: "center",
    marginBottom: 25,
  },
  label: {
    fontWeight: "600",
    color: "#333",
    marginTop: 10,
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 15,
    padding: 12,
    marginTop: 8,
  },
  button: {
    marginTop: 25,
    borderRadius: 20,
    overflow: "hidden",
  },
  gradientButton: {
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  loginText: {
    textAlign: "center",
    marginTop: 20,
    color: "#444",
  },
  loginButton: {
    marginTop: 12,
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#b42f2f",
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#b42f2f",
    fontWeight: "700",
  },
});
