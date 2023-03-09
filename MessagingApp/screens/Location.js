import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import Footer from "./Footer";
import { useNavigation } from "@react-navigation/core";

export default function Location({ location }) {
  const navigation = useNavigation();
  const [coordinates, setCoordinates] = useState(null);
 
  useEffect(() => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=manchester&key=AIzaSyAYM2dzH-IsrfoG_SHi5-D4PjkfuwLo-MM`
      )
      .then((response) => {
        setCoordinates(response.data.results[0].geometry.bounds.northeast);
      });
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 10 }} onPress={handleSignOut}>
          <Text style={styles.signOut}>Sign Out</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  if (!coordinates) {
    return <View />;
  } else {
    return (
      <View style={styles.container}>
        <MapView
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {/* <Marker
            coordinate={{
              latitude: coordinates.lat,
              longitude: coordinates.lng,
            }}
          /> */}
        </MapView>
      </View>
    );
  }
}

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
