import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, FlatList, Button, Alert } from "react-native";
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
  }, [images]);

  createDeletedAlert = () =>
    Alert.alert("Alert Title", "My Alert Msg", [
      {
        text: "Ask me later",
        onPress: () => console.log("Ask me later pressed"),
      },
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

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
            <View style={styles.fixToText}>
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
              <Button
                title="Delete"
                onPress={async () => {
                  try {
                    console.log("itemdata", itemData);
                    await FileSystem.deleteAsync(
                      FileSystem.cacheDirectory +
                        "ImageManipulator/" +
                        itemData.item
                    );
                    // alert("Deleted");
                    {
                      createDeletedAlert;
                    }
                  } catch (err) {
                    alert("Error");
                  }
                }}
              />
            </View>
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
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

