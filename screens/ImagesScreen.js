import React, { useEffect, useState } from "react";
import { Text, StyleSheet, Image, FlatList, Button } from "react-native";
import * as FileSystem from "expo-file-system";
import singleFileUploader from "single-file-uploader";

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
          <>
            <Image
              style={styles.image}
              source={{
                uri:
                  FileSystem.cacheDirectory +
                  "ImageManipulator/" +
                  itemData.item,
              }}
            />
            <Button
              title="upload"
              onPress={async () => {
                try {
                  await singleFileUploader({
                    distantUrl:
                      "https://wildstagram.nausicaa.wilders.dev/upload",

                    filename: itemData.item,
                    filetype: "image/jpeg",
                    formDataName: "fileData",
                    localUri:
                      FileSystem.cacheDirectory +
                      "ImageManipulator/" +
                      itemData.item,
                  });

                  alert("Uploaded");
                } catch (err) {
                  alert("Error");
                }
              }}
            />
          </>
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
