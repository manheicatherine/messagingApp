import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
  Image,
  SafeAreaView,
  TextInput,
  Button,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { collection, where, getDocs, query } from "firebase/firestore";
import { signOut, getAuth } from "firebase/auth";
import { auth } from "../firebase";
import Footer from "./Footer";
import firebase from "firebase/compat";

const HomeScreen = () => {
  const db = firebase.firestore();
  const navigation = useNavigation();
  const [gymList, setGymList] = useState([]);
  const [filterGymList, setFilterGymList] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  const getGyms = async () => {
    const q = query(collection(db, "gymInfo"));
    const newGym = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      newGym.push(doc.data());
    });

    setGymList(newGym);
  };

  useEffect(() => {
    getGyms();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate("SignIn");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const search = () => {
    const searchGym = gymList.filter((gym) => {
      return gym.gymName.includes(searchItem);
    });
    setFilterGymList(searchGym);
  };

  const reset = () => {
    setFilterGymList([]);
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
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Please enter gym name"
          value={searchItem}
          onChangeText={(text) => setSearchItem(text)}
          style={styles.input}
        />
        <Button onPress={search} title="search"></Button>
      </View>

      <TouchableOpacity onPress={reset} style={styles.button}>
        <Text style={styles.buttonText}>reset</Text>
      </TouchableOpacity>
      <FlatList
        data={filterGymList.length === 0 ? gymList : filterGymList}
        renderItem={({ item }) => (
          <View key={item.gymName} style={styles.gymContainer}>
            <Text style={styles.gymTitle}>{item.gymName.toUpperCase()}</Text>
            <Image
              source={{ uri: item.image }}
              style={{
                width: 380,
                height: 250,
                borderRadius: 10,
                marginBottom: 20,
                marginTop: 20,
              }}
            />
            <Text style={styles.gymDetails}>Location: {item.location}</Text>
            <Text style={styles.gymDetails}>{item.votes} people like it</Text>
            {/* <Location location={item.location} /> */}
          </View>
        )}
        keyExtractor={(item) => item.id}
      />

      <Footer />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // backgroundColor: "white",
  },
  gymTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#181821",
    textShadowColor: "rgba(82, 82, 209, 0.65)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  gymDetails: {
    fontSize: 16,
    fontFamily: "TrebuchetMS-Bold",
  },
  gymContainer: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
  },

  signOut: {
    color: "white",
  },
  inputContainer: {
    width: "80%",
    paddingTop: 40,
    flexDirection: "row",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    width: "80%",
  },
  button: {
    backgroundColor: "#567dfc",
    width: "30%",
    padding: 10,
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
