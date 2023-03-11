import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import firebase from "firebase/compat";
import { collection, getDocs, query } from "firebase/firestore";
import axios from "axios";
import Footer from "./Footer";

export default function Maps() {
  const [locationList, setLocationList] = useState([]);
  const db = firebase.firestore();
  const getGyms = async () => {
    const q = query(collection(db, "gymInfo"));
    const newGym = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      newGym.push(doc.data());
    });
    const filterLocation = newGym.map((gym) => {
      return {
        location: gym.location,
        name: gym.gymName,
        image: gym.image,
      };
    });

    const coordinatesList = [];
    for (let i = 0; i < filterLocation.length; i++) {
      const gym = filterLocation[i];
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${gym.location}&key=AIzaSyAYM2dzH-IsrfoG_SHi5-D4PjkfuwLo-MM`
        );
        const coordinates = {
          lat: response.data.results[0].geometry.bounds.northeast.lat,
          lng: response.data.results[0].geometry.bounds.northeast.lng,
          name: gym.name,
          image: gym.image,
        };
        coordinatesList.push(coordinates);
      } catch (error) {
        console.error(error);
      }
    }
    setLocationList(coordinatesList);
  };

  useEffect(() => {
    getGyms();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 53.5445879,
          longitude: -2.1468288,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
        showsUserLocation={true}
      >
        {locationList.length > 0 ? (
          locationList.map((gym) => (
            <Marker
              key={gym.name}
              coordinate={{
                latitude: gym.lat,
                longitude: gym.lng,
              }}
              title={gym.name}
              icon={gym.image}
            />
          ))
        ) : (
          <></>
        )}
      </MapView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
