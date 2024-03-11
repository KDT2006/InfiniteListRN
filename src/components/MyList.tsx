import {
  ActivityIndicator,
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from "react-native";
import character from "../data/character.json";
import CharacterListItem from "./CharacterListItem";
import React, { useEffect, useState } from "react";

const MyList = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [nextPage, setNextPage] = useState<string>("");

  const fetchItems = async (url: string) => {
    setLoading(true);
    const response = await fetch(url);
    const responseJson = await response.json();
    setItems((prev) => [...prev, ...responseJson.results]);
    setNextPage(responseJson.info.next);

    setLoading(false);
  };

  useEffect(() => {
    fetchItems("https://rickandmortyapi.com/api/character");
  }, []);

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
        ListFooterComponent={() => (
          <View>
            {loading ? (
              <ActivityIndicator
                style={{ flex: 1, alignSelf: "center" }}
                size={"large"}
                color={"#ccc"}
              />
            ) : null}
            <Text
              onPress={() => fetchItems(nextPage)}
              style={{ alignSelf: "center", fontSize: 20, color: "blue" }}
            >
              Load More
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default MyList;
