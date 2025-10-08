import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Dashboard from '../screens/Dashboard';
import Avatar from '../screens/Avatar';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function DashboardStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DashboardMain" component={Dashboard} />
    </Stack.Navigator>
  );
}

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ focused, size }) => {
          let iconName;
          let IconComponent = FontAwesome5;
          let activeColor = '#FF6B35'; // orange accent like in your reference
          let inactiveColor = '#A9A9A9'; // light gray

          if (route.name === 'Dashboard') {
            iconName = 'home';
          } else if (route.name === 'Avatar') {
            iconName = 'person';
            IconComponent = MaterialIcons;
            activeColor = '#6C63FF'; // purple accent
          } else if (route.name === 'Profile') {
            iconName = 'settings';
            IconComponent = MaterialIcons;
            activeColor = '#FFD54F'; // yellow accent
          }

          return (
            <View style={styles.iconContainer}>
              <IconComponent
                name={iconName}
                size={focused ? size + 4 : size}
                color={focused ? activeColor : inactiveColor}
              />
              {focused && <View style={[styles.indicator, { backgroundColor: activeColor }]} />}
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardStack} />
      <Tab.Screen name="Avatar" component={Avatar} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 65,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    borderTopWidth: 0,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 4,
  },
});
