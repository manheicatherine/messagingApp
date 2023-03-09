import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import Footer from "./Footer";

const HomeScreen = () => {
  const navigation = useNavigation();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate("SignIn");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 10 }} onPress={handleSignOut}>
          <Text style={styles.signOut}>Sign Out</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: auth.currentUser.photoURL }}
        style={{ width: 200, height: 200, marginBottom:20, borderRadius:50 }}
      />
      <Text style={styles.profileTitle}>Name: {auth.currentUser?.displayName}</Text>
      <Text style={styles.profile}>Email: {auth.currentUser?.email}</Text>
      <Text style={styles.profile}>User ID: {auth.currentUser?.uid}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Edit Profile");
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    paddingTop: 80,
    alignItems: "center",
    backgroundColor: "white",
  },
  profile: { fontSize: 16, fontFamily: "TrebuchetMS",paddingBottom:5 },
  profileTitle: {
    fontSize: 22,
    fontFamily: "TrebuchetMS-Bold",
    paddingBottom:8
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#567dfc",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    marginTop: 5,
    alignItems: "center",
  },
  signOut: {
    color: "white",
  },
});
