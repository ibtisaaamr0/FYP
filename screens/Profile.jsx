import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { logoutUser } from "../component/auth"; // ✅ ensure this path is correct

export default function Profile() {
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              await logoutUser(); 
              console.log("User logged out successfully");

            
              navigation.reset({
                index: 0,
                routes: [{ name: "Home" }], 
              });
            } catch (error) {
              console.error("Logout error:", error);
              Alert.alert("Logout Failed", "Something went wrong during logout.");
            }
          },
        },
      ]
    );
  };

  const settings = [
    {
      icon: "person",
      label: "Account Information",
      bgColor: "#E3F2FD",
      iconColor: "#1E88E5",
      action: () => Alert.alert("Account Information", "Coming soon..."),
    },
    {
      icon: "notifications",
      label: "Notifications",
      bgColor: "#FFF8E1",
      iconColor: "#F9A825",
      action: () => Alert.alert("Notifications", "Coming soon..."),
    },
    {
      icon: "security",
      label: "Privacy & Security",
      bgColor: "#E8F5E9",
      iconColor: "#43A047",
      action: () => Alert.alert("Privacy & Security", "Coming soon..."),
    },
    {
      icon: "help-outline",
      label: "Help & Support",
      bgColor: "#FCE4EC",
      iconColor: "#E91E63",
      action: () => Alert.alert("Help & Support", "Coming soon..."),
    },
    {
      icon: "logout",
      label: "Logout",
      bgColor: "#FBE9E7",
      iconColor: "#E53935",
      action: handleLogout,
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.heading}>Profile & Settings</Text>

      {settings.map((item, index) => (
        <Animatable.View
          key={index}
          animation="fadeInUp"
          delay={index * 150}
          style={styles.optionCard}
        >
          <Pressable style={styles.optionContent} onPress={item.action}>
            <View style={[styles.iconBox, { backgroundColor: item.bgColor }]}>
              <MaterialIcons name={item.icon} size={26} color={item.iconColor} />
            </View>
            <Text style={styles.optionText}>{item.label}</Text>
            <FontAwesome5 name="chevron-right" size={14} color="#888" />
          </Pressable>
        </Animatable.View>
      ))}

      <Animatable.View
        animation="fadeInUp"
        delay={1000}
        style={styles.bottomCard}
      >
        <Text style={styles.bottomText}>
          “Adjust your account preferences, privacy settings, and stay updated
          with Silent Voice.”
        </Text>
      </Animatable.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FBFF",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  heading: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
    marginBottom: 20,
  },
  optionCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 15,
    elevation: 3,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  optionText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  bottomCard: {
    backgroundColor: "#F5F7FA",
    borderRadius: 20,
    padding: 20,
    marginVertical: 30,
  },
  bottomText: {
    fontSize: 13,
    color: "#444",
    textAlign: "center",
    lineHeight: 18,
  },
});
