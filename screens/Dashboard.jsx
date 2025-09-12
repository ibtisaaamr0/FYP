import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import * as Animatable from "react-native-animatable";
import Logo from "../logo.png";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function Dashboard({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Top Section */}
      <LinearGradient colors={["#012d58", "#3b658f"]} style={styles.top}>
        <Animatable.Image
          source={Logo}
          style={styles.logo}
          animation="fadeInDown"
          delay={800}
          duration={600}
        />
        <Animatable.Text
          style={styles.text}
          animation="fadeInDown"
          delay={800}
          duration={600}
        >
          Silent Voice
        </Animatable.Text>
      </LinearGradient>

      {/* White Rounded Section */}
      <View style={styles.bottomBox}>
        <Text style={styles.heading}>Dashboard</Text>

        {/* Options Row */}
        <Animatable.View
          style={styles.optionsRow}
          animation="fadeInUp"
          delay={800}
          duration={1000}
        >
          {/* Use Sign */}
          <LinearGradient colors={["#0e9bd3f8", "#ffffffff"]} style={styles.options}>
            <Pressable
              style={styles.pressable}
              onPress={() => navigation.navigate("Sign")}
            >
              <FontAwesome5 name="sign-language" size={30} color="#000" />
              <Text style={styles.optionsText}>Use Sign</Text>
            </Pressable>
          </LinearGradient>

          {/* Use Voice/Text */}
          <LinearGradient colors={["#0e9bd3f8", "#ffffffff"]} style={styles.options}>
            <Pressable
              style={styles.pressable}
              onPress={() => navigation.navigate("Voice")}
            >
              <MaterialIcons name="mic" size={40} color="#000" />
              <Text style={styles.optionsText}>Use Text/Voice</Text>
            </Pressable>
          </LinearGradient>

          {/* Quiz */}
          <LinearGradient colors={["#0e9bd3f8", "#ffffffff"]} style={styles.options}>
            <Pressable
              style={styles.pressable}
              onPress={() => navigation.navigate("Quiz")}
            >
              <MaterialIcons name="quiz" size={30} color="#000" />
              <Text style={styles.optionsText}>Quiz</Text>
            </Pressable>
          </LinearGradient>
        </Animatable.View>

        {/* Third Section */}
        <Animatable.View
          animation="fadeInUp"
          delay={1200}
          style={styles.thirdpartWrapper}
        >
          <LinearGradient colors={["#0e9bd3f8", "#ffffffff"]} style={styles.thirdpart}>
            <Text style={{ color: "black", fontSize: 16 }}>3rd portion</Text>
          </LinearGradient>
        </Animatable.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#bbb" },

  top: {
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  logo: { width: 70, height: 80, marginBottom: 5 },

  text: { fontSize: 22, fontWeight: "bold", color: "white" },

  bottomBox: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 25,
    marginTop: -30,
    elevation: 5,
    alignItems: "center",
  },

  heading: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#012d58",
  },

  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginBottom: 30,
  },

  options: {
    width: "28%",
    elevation: 5,
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  optionsText: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
  },

  pressable: {
    justifyContent: "center",
    alignItems: "center",
  },

  thirdpartWrapper: { alignItems: "center" },

  thirdpart: {
    padding: 40,
    borderRadius: 20,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    width: 250,
  },
});
