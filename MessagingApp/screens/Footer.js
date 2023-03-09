import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import React from "react";

export default function Footer() {
  const navigation = useNavigation();
  return (
    <View style={styles.content}>
      <Text style={styles.footer} onPress={() => navigation.replace("Home")}>
        Home
      </Text>
      <Text
        style={styles.footer}
        onPress={() => navigation.navigate("Map")}
      >
        Map
      </Text>
      <Text
        style={styles.footer}
        onPress={() => navigation.navigate("Chat Room")}
      >
        Chat
      </Text>
      <Text
        style={styles.footer}
        onPress={() => navigation.replace("User Profile")}
      >
       Profile
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    position: "absolute",
    flex: 1,
    bottom: 0,
    flexDirection: "row",
    height: 80,
    alignItems: "center",
    backgroundColor: "#0a0a1f",
    padding: 10,
    width: "100%",
   
    justifyContent: "center",
    
  },
  footer: {
    color: "white",
    paddingLeft: 30,
    paddingRight: 30,

   
  },
});
