import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import * as Animatable from "react-native-animatable";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Logo from "../logo.png";

export default function Dashboard({ navigation }) {
  return (
    <Animatable.View
      animation="fadeIn"
      duration={1000}
      style={{ flex: 1, backgroundColor: "#969191ff" }}
    >
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animatable.View
          animation="fadeInDown"
          duration={900}
          delay={100}
          style={styles.header}
        >
          <View>
            <Text style={styles.helloText}>Hello, Ibtisam 👋</Text>
            <Text style={styles.subtitle}>
              Find the perfect way to communicate today
            </Text>
          </View>
          <Animatable.Image
            animation="zoomIn"
            delay={400}
            source={Logo}
            style={styles.avatar}
          />
        </Animatable.View>

        {/* Category Icons */}
        <Animatable.View
          animation="fadeInUp"
          delay={300}
          style={styles.iconRow}
        >
          <Animatable.View animation="bounceIn" delay={300}>
            <Pressable
              onPress={() => navigation.navigate("Sign")}
              style={[styles.iconBox, { backgroundColor: "#b42f2fff" }]}
            >
              <FontAwesome5 name="sign-language" size={25} color="#ffffffff" />
              <Text style={styles.iconText}>Use Sign</Text>
            </Pressable>
          </Animatable.View>

          <Animatable.View animation="bounceIn" delay={500}>
            <Pressable
              onPress={() => navigation.navigate("Voice")}
              style={[styles.iconBox, { backgroundColor: "#b42f2fff" }]}
            >
              <MaterialIcons name="mic" size={28} color="#fbfbfbff" />
              <Text style={styles.iconText}>Use Voice/Text</Text>
            </Pressable>
          </Animatable.View>

          <Animatable.View animation="bounceIn" delay={700}>
            <Pressable
              onPress={() => navigation.navigate("Quiz")}
              style={[styles.iconBox, { backgroundColor: "#b42f2fff" }]}
            >
              <MaterialIcons name="quiz" size={28} color="#ffffffff" />
              <Text style={styles.iconText}>Quiz</Text>
            </Pressable>
          </Animatable.View>
        </Animatable.View>

        {/* Popular Tools Section */}
        <Animatable.View
          animation="fadeInUp"
          delay={800}
          style={styles.sectionHeader}
        >
          <Text style={styles.sectionTitle}>Popular Tools</Text>
          <Pressable onPress={() => navigation.navigate("SeeAll")}>
          <Text style={styles.viewAll}>See all</Text>
         </Pressable>
        </Animatable.View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 10 }}
        >
          <Animatable.View animation="fadeInLeft" delay={900}>
            <LinearGradient
              colors={["#FF6A3D", "#FF6B6B"]}
              style={[styles.toolCard, { marginLeft: 5 }]}
            >
              <Animatable.View animation="pulse" iterationCount="infinite" duration={3000}>
                <FontAwesome5 name="hand-paper" size={40} color="#fff" />
              </Animatable.View>
              <Text style={styles.cardTitle}>Sign to Text</Text>
              <Text style={styles.cardSubtitle}>Instantly convert signs</Text>
            </LinearGradient>
          </Animatable.View>

          <Animatable.View animation="fadeInLeft" delay={1100}>
            <LinearGradient colors={["#FF6A3D", "#FF6B6B"]} style={styles.toolCard}>
              <Animatable.View animation="pulse" iterationCount="infinite" duration={3200}>
                <MaterialIcons name="textsms" size={40} color="#fff" />
              </Animatable.View>
              <Text style={styles.cardTitle}>Text to Sign</Text>
              <Text style={styles.cardSubtitle}>Type and visualize</Text>
            </LinearGradient>
          </Animatable.View>

          <Animatable.View animation="fadeInLeft" delay={1300}>
            <LinearGradient colors={["#af2020ff", "#A6C1EE"]} style={styles.toolCard}>
              <Animatable.View animation="pulse" iterationCount="infinite" duration={3400}>
                <MaterialIcons name="quiz" size={40} color="#fff" />
              </Animatable.View>
              <Text style={styles.cardTitle}>Knowledge Quiz</Text>
              <Text style={styles.cardSubtitle}>Practice & learn</Text>
            </LinearGradient>
          </Animatable.View>
        </ScrollView>

        {/* Bottom Info Section */}
        <Animatable.View
          animation="fadeInUp"
          delay={1500}
          style={styles.bottomCard}
        >
          <Text style={styles.bottomText}>
            "Silent Voice helps bridge communication between speech and sign —
            making conversation easier and inclusive."
          </Text>
        </Animatable.View>
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
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },
  iconBox: {
    width: 100,
    height: 100,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  iconText: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "600",
    color: "#ffffffff",
  },
  sectionHeader: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },
  viewAll: {
    color: "#888",
    fontSize: 13,
  },
  toolCard: {
    width: 170,
    height: 200,
    borderRadius: 25,
    padding: 20,
    justifyContent: "flex-end",
    marginRight: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 4,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    marginTop: 10,
  },
  cardSubtitle: {
    color: "#fff",
    fontSize: 12,
    opacity: 0.9,
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
