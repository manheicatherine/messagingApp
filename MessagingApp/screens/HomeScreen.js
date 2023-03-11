import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  SafeAreaView,
  TextInput,
  Button,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  collection,
  getDocs,
  query,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import Footer from "./Footer";
import firebase from "firebase/compat";

const HomeScreen = () => {
  const db = firebase.firestore();
  const navigation = useNavigation();
  const [gymList, setGymList] = useState([]);
  const [filterGymList, setFilterGymList] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [updateVotes, setUpdateVotes] = useState(true);
  
  const getGyms = async () => {
    const q = query(collection(db, "gymInfo"));
    const newGym = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      newGym.push(doc.data());
    });

    setGymList(newGym);
    setUpdateVotes(false);
  };

  useEffect(() => {
    getGyms();
  }, [updateVotes]);

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

  const handleUpdateVotes = (id) => {
    const gymRef = doc(db, "gymInfo", id);
    updateDoc(gymRef, {
      votes: increment(1),
    });
    setUpdateVotes(true);
  };

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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.eachGymContainer}>
            <View style={styles.gymContainer}>
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
              <TouchableOpacity
                onPress={() => {
                  handleUpdateVotes(item.id);
                }}
                style={styles.likeButton}
              >
                <Text>👍🏻</Text>
              </TouchableOpacity>
              <Text style={styles.gymDescription}>{item.description}</Text>
            </View>
          </View>
        )}
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
    backgroundColor: "#22242e",
  },
  gymTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#26354a",
    textShadowColor: "rgba(123, 142, 224, 0.9)",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
    paddingBottom: 10,
    fontFamily: 'GillSans-Bold'
  },
  gymDetails: {
    fontSize: 16,
    fontFamily: "TrebuchetMS-Bold",
  },
  gymContainer: {
    flex: 1,
    paddingTop: 30,
    alignItems: "center",
  },
  signOut: {
    color: "white",
  },
  inputContainer: {
    width: "80%",
    paddingTop: 20,
    flexDirection: "row",
    borderColor: "gray",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    width: "80%",
    borderColor: "#b4b9cf",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#567dfc",
    width: "20%",
    padding: 8,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  eachGymContainer: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "rgba(255, 249, 232, 0.9)",
    padding: 10,
    borderRadius: 40,
  },
  gymDescription: {
    marginTop: 10,
    marginBottom: 20,
    color: "#434759",
    paddingBottom: 10,
    borderRadius: 40,
    paddingHorizontal: 5,
    marginHorizontal: 10,
  },
  likeButton: {
    backgroundColor: "rgba(163, 171, 217,0.2)",
    width: "10%",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
});
