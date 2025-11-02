import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, ScrollView } from "react-native";
import * as Animatable from "react-native-animatable";

export default function Notifications() {
  const [push, setPush] = useState(true);
  const [email, setEmail] = useState(false);

  return (
    <Animatable.View animation="fadeIn" duration={800} style={{ flex: 1, backgroundColor: "#ffffffff" }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        <Animatable.Text animation="fadeInDown" duration={900} style={styles.heading}>
          Notifications
        </Animatable.Text>

        <Animatable.View animation="fadeInUp" delay={200} style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Push Notifications</Text>
            <Switch value={push} onValueChange={setPush} />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Email Alerts</Text>
            <Switch value={email} onValueChange={setEmail} />
          </View>
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
    marginBottom: 20,
    color: "#111",
  },
  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  label: {
    fontSize: 16,
    color: "#333",
  },
});
