import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function ToolsScreen({ navigation }) {
  return (
    <Animatable.View animation="fadeIn" style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>All Tools</Text>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>Back</Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Tools Grid */}
        <View style={styles.grid}>
          
          <Pressable
            style={[styles.card, { backgroundColor: "#FF6B6B" }]}
            onPress={() => navigation.navigate("Sign")}
          >
            <FontAwesome5 name="hand-holding-heart" size={32} color="#fff" />
            <Text style={styles.cardTitle}>Sign to Text</Text>
          </Pressable>

          <Pressable
            style={[styles.card, { backgroundColor: "#FF6A3D" }]}
            onPress={() => navigation.navigate("Voice")}
          >
            <MaterialIcons name="textsms" size={32} color="#fff" />
            <Text style={styles.cardTitle}>Text to Sign</Text>
          </Pressable>

          <Pressable
            style={[styles.card, { backgroundColor: "#FF6A3D" }]}
            onPress={() => navigation.navigate("Quiz")}
          >
            <MaterialIcons name="quiz" size={32} color="#fff" />
            <Text style={styles.cardTitle}>Knowledge Quiz</Text>
          </Pressable>

        </View>

      </ScrollView>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
  },
  backBtn: {
    fontSize: 14,
    color: "#555",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    height: 130,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
    elevation: 4,
  },
  cardTitle: {
    marginTop: 10,
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
