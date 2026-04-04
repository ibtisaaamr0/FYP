import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable, 
  ScrollView, 
  TouchableOpacity, 
  Platform, 
  Alert 
} from "react-native";
import * as Animatable from "react-native-animatable";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

// --- FIREBASE & REDUX IMPORTS ---
import auth from "@react-native-firebase/auth";
import { useSelector } from "react-redux";

export default function PrivacySecurity({ navigation }) {
  // 1. Get Theme and User Data from Redux
  const isDarkMode = useSelector((state) => state.theme?.isDarkMode);
  const user = useSelector((state) => state.auth.user);

  // 2. Dynamic Theme Palette
  const colors = {
    bg: isDarkMode ? "#0F172A" : "#F8FAFC",
    card: isDarkMode ? "#1E293B" : "#FFFFFF",
    text: isDarkMode ? "#F1F5F9" : "#1E293B",
    subtext: isDarkMode ? "#94A3B8" : "#64748B",
    primary: "#6366F1", // Indigo
    border: isDarkMode ? "#334155" : "#F1F5F9",
    danger: "#EF4444",
  };

  // 3. Security Actions Logic
  const handlePasswordReset = async () => {
    if (!user?.email) {
      Alert.alert("Error", "User email not found. Please log in again.");
      return;
    }

    Alert.alert(
      "Reset Password",
      `We will send a password reset link to:\n${user.email}`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Send Link", 
          onPress: async () => {
            try {
              await auth().sendPasswordResetEmail(user.email);
              Alert.alert("Email Sent", "Please check your inbox (and spam folder) for instructions.");
            } catch (error) {
              console.log("Reset Error:", error);
              Alert.alert("Error", "Failed to send reset email. Please try again later.");
            }
          } 
        }
      ]
    );
  };

  const securityItems = [
    { 
      icon: "lock-outline", 
      label: "Change Password", 
      desc: "Receive a reset link via email", 
      action: handlePasswordReset 
    },
    { 
      icon: "verified-user", 
      label: "2FA Authentication", 
      desc: "Currently: Disabled", 
      status: "Off",
      action: () => Alert.alert("Coming Soon", "Two-Factor Authentication will be available in a future update.") 
    },
    { 
      icon: "delete-sweep", 
      label: "Reset Account Data", 
      desc: "Clear your app history & gestures", 
      isDanger: true,
      action: () => Alert.alert(
        "Reset Data", 
        "Are you sure? This will wipe your local settings. Your account will remain active.",
        [{ text: "Cancel" }, { text: "Reset", style: "destructive", onPress: () => console.log("Data Reset") }]
      ) 
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      {/* --- CUSTOM TOP BAR --- */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <MaterialIcons name="arrow-back-ios" size={20} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.topBarTitle, { color: colors.text }]}>Privacy & Security</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* --- HEADER ICON --- */}
        <Animatable.View animation="fadeIn" style={styles.headerIconContainer}>
          <View style={[styles.shieldCircle, { backgroundColor: colors.primary + "15" }]}>
            <MaterialIcons name="security" size={45} color={colors.primary} />
          </View>
          <Text style={[styles.headerSubtitle, { color: colors.subtext }]}>
            Protect your Silent Voice account and manage how your data is handled.
          </Text>
        </Animatable.View>

        {/* --- SECURITY OPTIONS LIST --- */}
        <View style={[styles.groupContainer, { backgroundColor: colors.card }]}>
          {securityItems.map((item, index) => (
            <Pressable 
              key={index} 
              onPress={item.action}
              style={({ pressed }) => [
                styles.optionRow,
                { backgroundColor: pressed ? colors.border : 'transparent' },
                index !== securityItems.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border }
              ]}
            >
              <View style={[styles.iconBox, { backgroundColor: item.isDanger ? colors.danger + "10" : colors.primary + "10" }]}>
                <MaterialIcons 
                  name={item.icon} 
                  size={24} 
                  color={item.isDanger ? colors.danger : colors.primary} 
                />
              </View>

              <View style={styles.textContainer}>
                <Text style={[styles.label, { color: item.isDanger ? colors.danger : colors.text }]}>
                  {item.label}
                </Text>
                <Text style={[styles.description, { color: colors.subtext }]}>{item.desc}</Text>
              </View>

              <MaterialIcons name="chevron-right" size={20} color={colors.subtext} />
            </Pressable>
          ))}
        </View>

        <Text style={[styles.footerText, { color: colors.subtext }]}>
          Your account is secured with Firebase Authentication.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  backBtn: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  topBarTitle: { fontSize: 18, fontWeight: "800" },
  
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  
  headerIconContainer: { alignItems: 'center', marginVertical: 30 },
  shieldCircle: { width: 90, height: 90, borderRadius: 45, justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  headerSubtitle: { textAlign: 'center', fontSize: 14, lineHeight: 20, paddingHorizontal: 30 },

  groupContainer: { borderRadius: 32, overflow: 'hidden', elevation: 4, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 15 },
  optionRow: { flexDirection: "row", alignItems: "center", padding: 20 },
  iconBox: { width: 48, height: 48, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  textContainer: { flex: 1 },
  label: { fontSize: 16, fontWeight: "700" },
  description: { fontSize: 12, marginTop: 2, fontWeight: "500" },

  footerText: { textAlign: 'center', marginTop: 40, fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 }
});