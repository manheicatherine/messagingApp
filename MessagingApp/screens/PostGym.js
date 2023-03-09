import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
// import { collection, addDoc, getFirestore } from "firebase/firestore";
import { signOut, getAuth } from "firebase/auth";
import { auth } from "../firebase";
import Footer from "./Footer";


const PostGym = () => {
  const navigation = useNavigation();
  const [description, setDescription] = useState("");
  const [gymName, setGymName] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate("SignIn");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = async () => {


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
      <View style={styles.inputContainer}>
        <Text style={styles.formTitle}>SHARE GYM HERE</Text>
        <TextInput
          placeholder="Gym Name"
          value={gymName}
          onChangeText={(text) => setGymName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Image"
          value={image}
          onChangeText={(text) => setImage(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Location"
          value={location}
          onChangeText={(text) => setLocation(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
          style={styles.input}
        />
        <TouchableOpacity 
        onPress={handleSubmit} 
        style={styles.button}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  );
};

export default PostGym;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  formTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
  },
  signOut: {
    color: "white",
  },
  inputContainer: {
    width: "100%",
    marginTop: 30,
    alignItems: "center",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 8,
    marginBottom: 8,
    width: "100%",
  },
  button: {
    backgroundColor: "#567dfc",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
