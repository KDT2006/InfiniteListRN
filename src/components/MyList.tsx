import {
  ActivityIndicator,
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
} from "react-native";
import character from "../data/character.json";
import CharacterListItem from "./CharacterListItem";
import React, { useState } from "react";

const MyList = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  useState(() => {
    const fetchItems = async () => {
      setLoading(true);
      const response = await fetch("https://rickandmortyapi.com/api/character");
      const responseJson = await response.json();
      setItems(responseJson.results);
      setLoading(false);
    };

    fetchItems();
  }, []);

  if (loading) {
    return (
      <ActivityIndicator
        style={{ flex: 1, alignSelf: "center" }}
        size={"large"}
        color={"#ccc"}
      />
    );
  }

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <FlatList
        data={items}
        renderItem={({ item, index }) => (
          <CharacterListItem key={index} character={item} />
        )}
        contentContainerStyle={{ gap: 50 }}
      />
    </SafeAreaView>
  );
};

export default MyList;
