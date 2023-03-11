import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React, {
  useState,
  useLayoutEffect,
  useCallback,
} from "react";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
  
} from "firebase/firestore";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { useNavigation } from "@react-navigation/core";
import { signOut } from "firebase/auth";
import { auth, database } from "../firebase";
import Icon from "react-native-vector-icons/FontAwesome";

const ChatRoom = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const myIcon = <Icon name="rocket" size={30} color="#900" />;
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

  useLayoutEffect(() => {
    const collectionRef = collection(database, "chats");
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      );
    });

    return unsubscribe;
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(database, "chats"), { _id, createdAt, text, user });
  }, []);

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "#fafeff",
          },
          right: {
            backgroundColor: "#5e7af7",
          },
        }}
      />
    );
  };
  return (
    <GiftedChat
      renderBubble={renderBubble}
      wrapInSafeArea={false}
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
        avatar: auth.currentUser?.photoURL,
      }}
      messagesContainerStyle={{ backgroundColor: "beige", paddingBottom: 30 }}
      containerStyle={{
        paddingTop: 10,
        paddingBottom: 10,
      }}
    />
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  signOut: {
    color: "white",
  },
});
