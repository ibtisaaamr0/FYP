
import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import Logo from '../logo.png';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Img from '../profile-img.png'
import LinearGradient from 'react-native-linear-gradient';

export default function Dashboard({ navigation }) {
  return (
    <View style={styles.container}>
     <LinearGradient
             colors={["#108dc7", "#ef8e38"]} // gradient colors
             style={styles.top}
           >
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.text}>Silent Voice</Text>
      </LinearGradient>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.secondpart}>
          <View style={styles.card}>
            <Animatable.Image
              animation="fadeInDown"
              delay={300}
              duration={1500}
              source={Img}
              style={styles.profilePic}
            />

            <Animatable.View animation="fadeIn" delay={500}>
              <Text style={styles.name}>Ibtisam Rashid</Text>
            </Animatable.View>

            <Animatable.View
              style={styles.buttonsRow}
              animation="fadeInUp"
              delay={700}
              duration={1500}
            >
              <Pressable
                style={[styles.options, { backgroundColor: 'darkorange' }]}
                onPress={() => navigation.navigate('EditProfile')}
              >
                <MaterialIcons name="edit" size={30} color="#000" />
                <Text style={styles.optionsText}>Edit Profile</Text>
              </Pressable>

              <Pressable
                style={[styles.options, { backgroundColor: 'lightblue' }]}
                onPress={() => navigation.navigate('Settings')}
              >
                <MaterialIcons name="settings" size={30} color="#000" />
                <Text style={styles.optionsText}>Settings</Text>
              </Pressable>

              <Pressable
                style={[styles.options, { backgroundColor: 'brown' }]}
                onPress={() => console.log('Logging out...')}
              >
                <MaterialIcons name="logout" size={30} color="#000" />
                <Text style={styles.optionsText}>Logout</Text>
              </Pressable>
            </Animatable.View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    width: '50%',
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
    width: 70, // numeric
    height: 70,
  },
  secondpart: {
    backgroundColor: 'white',
    height: 800, // fixed height instead of 1200
    padding: '10%', // still percentage but valid string
    width: '90%',
    zIndex: 2,
    position: 'absolute',
    top: 100, // keeps it under the header
    borderRadius: 40,
    borderColor: 'black',
    borderWidth: 2,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    alignItems: 'center',
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: { fontSize: 20, fontWeight: 'bold' },
  email: { fontSize: 14, color: 'gray' },
  buttonsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  options: {
    width: 100,
    height: 90,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  optionsText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
  },
});
