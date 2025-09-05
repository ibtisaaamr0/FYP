import { StyleSheet, Text, View, Image, Pressable, useColorScheme, ImageBackground } from 'react-native';
import React from 'react';
import Logo from '../silentvoice/logo.png';
import Bg from '../silentvoice/bg.jpeg';
import Bg1 from '../silentvoice/bg1.jpeg';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './component/tabs';


const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  const theme = useColorScheme();
  const isdarkMode = theme === 'dark';

  const backgroundColor = isdarkMode ? "black" : "#d7e0e0ff";
  const TextColor = isdarkMode ? "#040505ff" : "#48577bff";
  const ButtonTextColor = isdarkMode ? "#d7e0e0ff" : "#fdfdfdff";
  const BG = isdarkMode ? Bg1 : Bg;
  const button = isdarkMode ? "#acc065ff" : "#000000ff";

  return (
    <ImageBackground source={BG} style={styles.background} resizeMode="cover">
      <View style={[styles.container, { backgroundColor: backgroundColor + '80' }]}>
        <Image source={Logo} style={styles.Image} />
        <Text style={[styles.text, { color: TextColor }]}>
          "Breaking Barriers, One Sign at a Time."
        </Text>
        <Pressable
          style={[styles.button, { backgroundColor: button }]}
          onPress={() => navigation.navigate('Tabs')}
        >
          <Text style={[styles.buttonText, { color: ButtonTextColor }]}>
            Off to main menu
          </Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Tabs" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    
  },
  Image:{
    width:"65%",
    height:"50%"
  },
  container: {
    display:"flex",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 30,
    fontStyle: "italic",
    fontWeight: "500",
    width: "80%",
    textAlign: 'center',
    Height:"100%"
  },
  button: {
    width: "45%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderWidth: 1,
    marginTop:50
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 17,
    fontFamily:"san-serif",
    fontStyle:"italic"
  },

  
})
