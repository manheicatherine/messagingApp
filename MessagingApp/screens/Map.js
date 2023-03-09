import React, { useEffect, useLayoutEffect, useState } from "react";
import MapView, { Marker, Callout, Polyline } from "react-native-maps";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import firebase from "firebase/compat";
import { collection, where, getDocs, query } from "firebase/firestore";
import axios from "axios";

export default function Map() {
  const [gymList, setGymList] = useState([]);
  const [locationList, setLocationList] = useState([]);

  console.log(locationList);

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
      };
    });
    const coordinatesList = filterLocation.map((gym) => {
      return axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${gym.location}&key=AIzaSyAYM2dzH-IsrfoG_SHi5-D4PjkfuwLo-MM`
        )
        .then((response) => {
          setLocationList({
            lat: response.data.results[0].geometry.bounds.northeast.lat,
            lng: response.data.results[0].geometry.bounds.northeast.lng,
            name: gym.name,
            
          });
        });
    }, []);

    setGymList(filterLocation);
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
        <Marker
          coordinate={{
            latitude: 53.5445879,
            longitude: -2.1468288,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          }}
        >
          <Callout>
            <Text>Gym locates here</Text>
          </Callout>
        </Marker>
      </MapView>
    </View>
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
      
// showsUserLocation={true}
//         initialRegion={{
//           latitude: 53.5445879,
//           longitude: -2.1468288,
//           latitudeDelta: 0.5,
//           longitudeDelta: 0.5,
          
//         }}
//       >
//         <FlatList
//           data={locationList}
//           keyExtractor={(item) => item.name}
//           renderItem={({ item }) => (
//             <Marker
//               coordinate={{
//                 latitude: item.lat,
//                 longitude: item.lng,
//                 // latitudeDelta: 0.5,
//                 // longitudeDelta: 0.5,
//               }}
//             >
//               <Callout>
//                 <Text>{item.name}</Text>
//               </Callout>
//             </Marker>
//           )}
//         />
//       </MapView>
//     </View>
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
