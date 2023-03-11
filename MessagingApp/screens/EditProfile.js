import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { updateProfile, getAuth } from "firebase/auth";
import * as ImagePicker from "expo-image-picker";

import uuid from "react-native-uuid";
import { firebase } from "../firebase";
import "firebase/firestore";
import "firebase/compat/firestore";
import "@firebase/firestore";
import "@firebase/storage";
import "@firebase/storage-compat";

export default function EditProfile() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
  const auth = getAuth();

  const handleUploadPhoto = () => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        const blob = xhr.response;
        const photoFileId = uuid.v4();
        const ref = firebase.storage().ref().child(`Pictures/${photoFileId}`);
        const snapshot = ref.put(blob);

        snapshot.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          () => {},
          (error) => {
            console.log(error);
            blob.close();
            reject(new TypeError("Network request failed"));
          },
          () => {
            snapshot.snapshot.ref.getDownloadURL().then((url) => {
              setImage(url);
              blob.close();
              resolve(url);
              alert("Image successfully uploaded!");
            });
          }
        );
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed!"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const updateUserInfo = () => {
    if (name && image) {
      updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: image,
      })
        .then(() => {
          // Profile updated!
          alert("User profile updated!");
          navigation.replace("User Profile");
        })
        .catch((error) => {
          alert("Upload user picture unsuccessfully");
        });
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="User Name"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
        />

        <Button title="Pick an image from camera roll" onPress={pickImage} />

        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
        <TouchableOpacity
          onPress={handleUploadPhoto}
          style={styles.uploadButton}
        >
          <Text style={styles.uploadButtonText}>Upload Picture</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={updateUserInfo} style={styles.button}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#272a36",
    alignItems: "center",
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
    marginTop: 30,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
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
    width: "100%",
    padding: 15,
    borderRadius: 10,
    marginTop: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  uploadButton: {
    backgroundColor: "grey",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    marginTop: 5,
    alignItems: "center",
  },
  uploadButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
