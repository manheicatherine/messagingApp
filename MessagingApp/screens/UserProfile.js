import { StyleSheet, Text, TouchableOpacity, View, Image, Button } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import Footer from "./Footer";

const UserProfile = () => {
  const navigation = useNavigation();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("SignIn");
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
        style={{ width: 200, height: 200, marginBottom: 20, borderRadius: 50 }}
      />
      <Text style={styles.profileTitle}>
        Name: {auth.currentUser?.displayName}
      </Text>
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

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: "center",
    backgroundColor: "#303345",
  },
  profile: {
    fontSize: 16,
    fontFamily: "TrebuchetMS",
    paddingBottom: 5,
    color: "white",
  },
  profileTitle: {
    fontSize: 22,
    fontFamily: "TrebuchetMS-Bold",
    paddingBottom: 8,
    color: "white",
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
