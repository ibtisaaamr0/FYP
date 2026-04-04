import React from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable } from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function AccountInfo({ navigation }) {
  return (
    <Animatable.View animation="fadeIn" duration={800} style={{ flex: 1, backgroundColor: "#ffffffff" }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        <Animatable.Text animation="fadeInDown" duration={900} style={styles.heading}>
          Account Information
        </Animatable.Text>

        <Animatable.View animation="fadeInUp" delay={200} style={styles.card}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput style={styles.input} placeholder="Ibtisam Rashid" />

          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} placeholder="example@email.com" />

          <Text style={styles.label}>Phone</Text>
          <TextInput style={styles.input} placeholder="+92 ••• ••••••" />

          <Pressable style={styles.updateBtn}>
            <Text style={styles.updateText}>Update Info</Text>
          </Pressable>
        </Animatable.View>
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
  heading: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    elevation: 3,
  },
  label: {
    fontSize: 13,
    color: "#666",
    marginTop: 12,
  },
  input: {
    backgroundColor: "#F7F7F7",
    borderRadius: 12,
    padding: 10,
    marginTop: 6,
  },
  updateBtn: {
    marginTop: 20,
    backgroundColor: "#b42f2fff",
    padding: 12,
    borderRadius: 15,
    alignItems: "center",
  },
  updateText: { color: "#fff", fontWeight: "700" },
});
