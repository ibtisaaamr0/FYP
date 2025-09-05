import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import Logo from '../logo.png'
import * as Animatable from 'react-native-animatable'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';



export default function Dashboard({ navigation }) {



  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#108dc7", "#ef8e38"]} // gradient colors
        style={styles.top}
      >
        <Animatable.Image source={Logo}
          alt='logo'
          style={styles.logo}
          animation="fadeInDown"
          delay={800}
          duration={600}
        />
        <Animatable.Text style={styles.text} animation="fadeInDown"
          delay={800}
          duration={600}>Silent Voice</Animatable.Text>
      </LinearGradient>


      <View style={{ display: "flex", justifyContent: "center", alignItems: "center", height: '100%' }}>

        <LinearGradient
          colors={["#c1ebff5d", "#ff9f4a7a"]} // gradient colors
          style={styles.secondpart}      >
          <Animatable.View style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", gap: "25", position: "absolute", top: "15", height: "90%", left: "10" }} animation="fadeInUp" delay={800} duration={1000}>
            <LinearGradient
              colors={["#0e9bd3f8", "#ffffffff"]} // gradient colors
              style={styles.options}
            >
              <Pressable style={[styles.pressable, { flex: 1, backgroundColor: "transparent" }]}>
                <FontAwesome5 name="sign-language" size={30} color="#000" />
                <Text style={styles.optionsText}>Use Sign</Text>
              </Pressable>
            </LinearGradient>

            <LinearGradient
              colors={["#0e9bd3f8", "#ffffffff"]} // gradient colors
              style={styles.options}
            >
              <Pressable style={[styles.pressable, { flex: 1, backgroundColor: "transparent" }]}>
                <MaterialIcons name="mic" size={40} color="#000" />
                <Text style={styles.optionsText}>Use Text/Voice</Text>
              </Pressable>
            </LinearGradient>

            <LinearGradient
              colors={["#0e9bd3f8", "#ffffffff"]} // gradient colors
              style={styles.options}
            >
              <Pressable style={[styles.pressable, { flex: 1, backgroundColor: "transparent" }]}>
                <MaterialIcons name="quiz" size={30} color="#000" />
                <Text style={styles.optionsText}>Quiz</Text>
              </Pressable>
            </LinearGradient>
          </Animatable.View>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "white",
    width: "50%"
  },
  top: {
    backgroundColor: "#5C0D0D",
    display: "flex",
    flexDirection: "row",
    position: "fixed",
    padding: "90",
    justifyContent: "center",
    zIndex: 1
  },
  logo: {
    width: "70",
    height: "70"
  },
  secondpart: {
    backgroundColor: "white",
    height: 1200,
    padding: "46%",
    width: "50%",
    zIndex: 2,
    position: "absolute",
    borderRadius: 40,
    elevation: 10,
  },

  options: {
    width: "45%",
    elevation: 5,
    height: "13%",
    borderRadius: 15,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },

  optionsText: {
    fontSize: 12,
    fontWeight: "bold",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5"
  },

  pressable: {
    flex: 1,                  // fills the LinearGradient
    justifyContent: "center", // vertical centering
    alignItems: "center",     // horizontal centering
  }
});
