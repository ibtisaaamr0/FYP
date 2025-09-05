import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import Logo from '../logo.png'
import * as Animatable from 'react-native-animatable'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useState } from 'react';



export default function Avatar({navigation}) {



  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image source={Logo}
          alt='logo'
          style={styles.logo}
        />
        <Text style={styles.text}>Silent Voice</Text>
      </View>


      <View style={{ display: "flex", justifyContent: "center", alignItems: "center", height: '100%' }}>
        <View style={styles.secondpart}>
          <Animatable.View style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", gap: "25", position: "absolute", top: "15", height: "90%", left: "10" }} animation="fadeIn" delay={700} duration={2000}>
            <Pressable style={[styles.options, { backgroundColor: "darkorange" }]}>
              <FontAwesome5 name="sign-language" size={30} color="#000" />
              <Text style={styles.optionsText}>Use Sign</Text>
            </Pressable>

            <Pressable style={[styles.options, { backgroundColor: "lightblue" }]} onPress={()=>navigation.navigate("TVS")}>
              <MaterialIcons name="mic" size={40} color="#000" />
              <Text style={styles.optionsText}>Use Text/Voice</Text>
            </Pressable>

            <Pressable style={[styles.options, { backgroundColor: "brown" }]}>
              <MaterialIcons name="quiz" size={30} color="#000" />
              <Text style={styles.optionsText}>Quiz</Text>
            </Pressable>
          </Animatable.View>
        </View>
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
    width: "60%",
    zIndex: 2,
    position: "absolute",
    borderRadius: 40,
    borderColor:"black",
    borderWidth:2,

  },

  options: {
    width: "45%",

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
    marginTop:"5"
  }
});
