import { Storage } from "aws-amplify";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Auth } from "aws-amplify";

function Home() {
  const [asset, setAsset] = useState(null);
  const [progressText, setProgressText] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      allowsEditing: true,
    });

    console.log(result);

    if (!result.cancelled) {
      setAsset(result);
      setProgressText("");
    }
  };

  const fetchResourceFromURI = async (uri: string) => {
    const response = await fetch(uri);

    const blob = await response.blob();

    return blob as Blob;
  };

  const uploadResource = async () => {
    if (isLoading) return;
    setisLoading(true);
    const img = await fetchResourceFromURI(asset.uri);
    return Storage.put(asset.uri, img, {
      level: "private",
      contentType: asset.type,
      progressCallback(uploadProgress) {
        setProgressText(
          `Progresso: ${Math.round(
            (uploadProgress.loaded / uploadProgress.total) * 100
          )} %`
        );
        console.log(
          `Progresso: ${uploadProgress.loaded}/${uploadProgress.total}`
        );
      },
    })
      .then((res) => {
        setProgressText("Upload Concluído: 100%");
        setAsset(null);
        setisLoading(false);
        Storage.get(res.key)
          .then((result) => console.log(result))
          .catch((err) => {
            setProgressText("Erro ao enviar arquivo");
            console.log(err);
          });
      })
      .catch((err) => {
        setisLoading(false);
        setProgressText("Erro ao enviar arquivo:");
        console.log(err);
      });
  };

  return (
    <>
      <View style={styles.logOutBtn}>
        <Button
          title="Sair"
          onPress={() => {
            Auth.signOut();
          }}
        />
      </View>
      <View style={styles.container}>
        <TouchableOpacity onPress={pickImage}>
          <Text style={[styles.button, { color: isLoading ? "grey" : "#fff" }]}>
            Selecione {asset ? "outro" : "o"} arquivo
          </Text>
        </TouchableOpacity>
        {asset
          ? asset.type.split("/")[0] === "image" && (
              <Image
                resizeMode="contain"
                style={styles.selectedImage}
                source={{ uri: asset?.uri ?? "" }}
              />
            )
          : null}
        {asset && (
          <>
            <TouchableOpacity onPress={uploadResource}>
              <Text
                style={[styles.button, { color: isLoading ? "grey" : "#fff" }]}
              >
                ENVIAR
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setAsset(null)}>
              <Text
                style={[
                  styles.cancelButton,
                  { color: isLoading ? "grey" : "red" },
                ]}
              >
                Remover mídia selecionada
              </Text>
            </TouchableOpacity>
          </>
        )}
        <Text>{progressText}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    fontSize: 20,
    backgroundColor: "#0095da",
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginHorizontal: 20,
    marginVertical: 10,
    textAlign: "center",
    fontWeight: "bold",
    borderRadius: 10,
  },
  cancelButton: {
    color: "#0095da",
  },
  selectedImage: {
    width: 275,
    height: 200,
  },
  logOutBtn: {
    width: "100%",
    marginVertical: 40,
    alignItems: "flex-end",
  },
});

export default Home;
