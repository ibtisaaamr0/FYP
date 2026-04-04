import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ImageBackground,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Logo from "./logo.png";
import Bg from "./bg.jpeg";
import Bg1 from "./bg1.jpeg";
import Tabs from "./component/tabs";
import Login from "./screens/login";
import Signup from "./screens/signup";
import SeeAll from "./screens/SeeAll";
import AccountInfo from "./screens/AccountInfo";
import Notifications from "./screens/Notifications";
import PrivacySecurity from "./screens/Privacy_Security";
import HelpSupport from "./screens/Help_and_SUpport";
import ForgotPassword from "./screens/ForgotPass";

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 🎨 Theme colors
  const backgroundColor = isDarkMode ? "#000" : "#f3f7f9";
  const TextColor = isDarkMode ? "#f2f2f2" : "#2c3e50";
  const ButtonTextColor = isDarkMode ? "#000" : "#fff";
  const BG = isDarkMode ? Bg1 : Bg;
  const button = isDarkMode ? "#c8e265" : "#000";

  return (
    <ImageBackground source={BG} style={styles.background} resizeMode="cover">
      <View
        style={[styles.overlay, { backgroundColor: backgroundColor + "B0" }]}
      >
        {/* 🌙 Theme Toggle Icon */}
        <Pressable
          onPress={() => setIsDarkMode(!isDarkMode)}
          style={styles.themeIcon}
        >
          <FontAwesome5
            name={isDarkMode ? "sun" : "moon"}
            size={22}
            color={isDarkMode ? "#fff" : "#222"}
          />
        </Pressable>

        {/* 🖼️ Logo */}
        <Image source={Logo} style={styles.Image} />

        {/* 💬 Quote */}
        <Text style={[styles.text, { color: TextColor }]}>
          "Breaking Barriers, One Sign at a Time."
        </Text>

        {/* 🚀 Button */}
        <Pressable
          style={[styles.button, { backgroundColor: button }]}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={[styles.buttonText, { color: ButtonTextColor }]}>
            Off to main menu
          </Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="SeeAll" component={SeeAll} />
        <Stack.Screen name="AccountInfo" component={AccountInfo} />
        <Stack.Screen name="Notification" component={Notifications} />
        <Stack.Screen name="ForgotPass" component={ForgotPassword} />
        <Stack.Screen
          name="Privacy_and_Security"
          component={PrivacySecurity}
        />
        <Stack.Screen name="Help_and_Support" component={HelpSupport} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  themeIcon: {
    position: "absolute",
    top: 45,
    right: 25,
    padding: 8,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  Image: {
    width: "65%",
    height: "50%",
    marginBottom: 10,
  },
  text: {
    fontSize: 28,
    fontStyle: "italic",
    fontWeight: "500",
    width: "80%",
    textAlign: "center",
  },
  button: {
    width: "50%",
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderWidth: 1,
    marginTop: 50,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 17,
    fontStyle: "italic",
  },
});
