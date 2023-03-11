import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();
  const user = auth.currentUser;
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace("Home");
      }
    });
  }, [user]);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert("Registered");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(
          "Please try another email address, this email is already in use."
        );
        // ..
      });
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Please enter a correct password!");
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {/* <Text style={styles.title}>GYMMER</Text> */}
      <Image
        source={require("/Users/catherinelization/Desktop/CatherineRef/messagingApp/MessagingApp/assets/2.png")}
        style={{ width: 350, height: 250, marginBottom: 30 }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignIn}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignUp} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#141414",
  },
  title: {
    color: "#91b2ff",
    fontSize: 70,
    fontWeight: "bold",
    textShadowColor: "blue",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 10,
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#567dfc",
    width: "70%",
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: "white",
    width: "70%",
    marginTop: 5,
    borderColor: "#668aff",
    borderWidth: 2,
  },
  buttonOutlineText: { color: "#567dfc", fontWeight: "700", fontSize: 16 },
});
