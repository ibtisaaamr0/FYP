import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import * as Animatable from "react-native-animatable";
import LinearGradient from "react-native-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AvatarImg from "../avatar.jpeg"; // replace with your avatar image

export default function Avatar({ navigation }) {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.helloText}>Your Avatar 🧍</Text>
          <Text style={styles.subtitle}>
            Interact, customize, and bring your sign to life
          </Text>
        </View>
        <Image source={AvatarImg} style={styles.avatar} />
      </View>

      {/* Avatar Card */}
      <Animatable.View
        animation="fadeInUp"
        delay={200}
        style={styles.avatarCard}
      >
        <LinearGradient colors={["#A1C4FD", "#C2E9FB"]} style={styles.gradientBox}>
          <Image source={AvatarImg} style={styles.avatarImage} />
        </LinearGradient>
        <Text style={styles.cardTitle}>3D Animated Avatar</Text>
        <Text style={styles.cardSubtitle}>Your digital communication partner</Text>
      </Animatable.View>

      {/* Action Buttons */}
      <View style={styles.iconRow}>
        <Animatable.View animation="fadeInUp" delay={400}>
          <Pressable
            onPress={() => alert("Starting Animation...")}
            style={[styles.iconBox, { backgroundColor: "#FFE6E6" }]}
          >
            <MaterialIcons name="play-circle-fill" size={32} color="#E53935" />
            <Text style={styles.iconText}>Start</Text>
          </Pressable>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={600}>
          <Pressable
            onPress={() => navigation.navigate("Customize")}
            style={[styles.iconBox, { backgroundColor: "#E3F2FD" }]}
          >
            <FontAwesome5 name="user-edit" size={26} color="#1E88E5" />
            <Text style={styles.iconText}>Customize</Text>
          </Pressable>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={800}>
          <Pressable
            onPress={() => alert("Avatar Settings")}
            style={[styles.iconBox, { backgroundColor: "#FFF8E1" }]}
          >
            <MaterialIcons name="settings" size={28} color="#F9A825" />
            <Text style={styles.iconText}>Settings</Text>
          </Pressable>
        </Animatable.View>
      </View>

      {/* Info Section */}
      <Animatable.View animation="fadeInUp" delay={1000} style={styles.bottomCard}>
        <Text style={styles.bottomText}>
          “Your avatar adapts to your expressions and gestures, helping you
          communicate naturally through sign language.”
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  helloText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
  },
  subtitle: {
    fontSize: 13,
    color: "#777",
    marginTop: 4,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  avatarCard: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    elevation: 5,
    paddingVertical: 25,
    marginTop: 30,
  },
  gradientBox: {
    width: 180,
    height: 180,
    borderRadius: 90,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  avatarImage: {
    width: 120,
    height: 130,
    resizeMode: "contain",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 15,
    color: "#012d58",
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#777",
    marginTop: 4,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  iconBox: {
    width: 100,
    height: 100,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    marginTop: 8,
    fontSize: 12,
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
