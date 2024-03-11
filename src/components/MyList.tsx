import { FlatList, Platform, SafeAreaView, StatusBar } from "react-native";
import character from "../data/character.json";
import CharacterListItem from "./CharacterListItem";
import React from "react";

const MyList = () => {
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <FlatList
        data={character.results}
        renderItem={({ item, index }) => (
          <CharacterListItem key={index} character={item} />
        )}
        contentContainerStyle={{ gap: 50 }}
      />
    </SafeAreaView>
  );
};

export default MyList;
