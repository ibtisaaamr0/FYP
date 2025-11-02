import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function PrivacySecurity() {
  const items = [
    { icon: "lock", text: "Change Password" },
    { icon: "user-shield", text: "Two-Factor Authentication" },
    { icon: "undo", text: "Reset Account Data" },
  ];

  return (
    <Animatable.View animation="fadeIn" duration={800} style={{ flex: 1, backgroundColor: "#ffffffff" }}>
      <ScrollView style={styles.container}>
        
        <Animatable.Text animation="fadeInDown" duration={900} style={styles.heading}>
          Privacy & Security
        </Animatable.Text>

        {items.map((item, index) => (
          <Animatable.View key={index} animation="fadeInUp" delay={200 * index} style={styles.option}>
            <FontAwesome5 name={item.icon} size={20} color="#b42f2fff" />
            <Text style={styles.optionText}>{item.text}</Text>
          </Animatable.View>
        ))}
      </ScrollView>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d3d3d3ff",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  heading: { fontSize: 20, fontWeight: "700", marginBottom: 20 },
  option: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  optionText: { marginLeft: 15, fontSize: 15 },
});
