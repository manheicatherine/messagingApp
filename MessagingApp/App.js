import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "./screens/SignIn";
import ChatRoom from "./screens/ChatRoom";
import HomeScreen from "./screens/HomeScreen";
import UserProfile from "./screens/UserProfile";
import EditProfile from "./screens/EditProfile";
import Maps from "./screens/Map";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animationEnabled: true,
          headerShown: true,
          headerStyle: { backgroundColor: "#0e214d" },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen
          options={{ headerShown: false }}
          name="SignIn"
          component={SignIn}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Chat Room" component={ChatRoom} />
        <Stack.Screen name="User Profile" component={UserProfile} />
        <Stack.Screen name="Edit Profile" component={EditProfile} />
        <Stack.Screen name="Maps" component={Maps} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
