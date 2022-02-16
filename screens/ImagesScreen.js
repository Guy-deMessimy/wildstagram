import React, { useEffect, useState } from "react";
import { Text, StyleSheet, Image, FlatList, SafeAreaView } from "react-native";
import * as FileSystem from "expo-file-system";

export default function ImagesScreen() {
  const [images, setImage] = useState([]);

  useEffect(() => {
    (async () => {
      const images = await FileSystem.readDirectoryAsync(
        FileSystem.cacheDirectory + "ImageManipulator"
      );
      console.log("images", images);
      setImage(images);
    })();
  }, []);

  return images.length > 0 ? (
    <FlatList
      data={images}
      keyExtractor={(image) => image}
      renderItem={(itemData) => {
        console.log("item", itemData);
        return (
          <Image
            style={styles.image}
            source={{
              uri:
                FileSystem.cacheDirectory + "ImageManipulator/" + itemData.item,
            }}
          />
        );
      }}
    />
  ) : null;
}

const styles = StyleSheet.create({
  image: {
    resizeMode: "cover",

    height: 500,
  },
});
