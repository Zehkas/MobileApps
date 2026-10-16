import { Ionicons } from '@expo/vector-icons';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, Image, Pressable, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import {useRouter} from 'expo-router';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';


export default function Camera() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();


const cameraRef = useRef<CameraView>(null);
  const router = useRouter();
  const dimensions = useWindowDimensions();
  const [selectPicture, setSelectPicture] = useState<string>();

  if (!permission || !mediaPermission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  if (!mediaPermission.granted) {


    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to save your photo</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const tomarFoto = async () => {
  if (!cameraRef) return;
  const picture = await cameraRef.current
    ?.takePictureAsync({ quality: 0.7 });

  if (!picture?.uri) return;
  setSelectPicture(picture.uri); // URI local
};


//LANZAR GALERIA de imagenes
//file:camera
const lanzarGaleria = async () => {
  const res = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: 'images',  // solo imágenes
    quality: 0.7,
  });

  if (!res.canceled) {
    const uri = res.assets[0].uri;  // URI local de la elegida
    router.replace({
      pathname: '/(tabs)/tasks',
      params: { picture: uri },       // pasamos el URI por navegación
    });
  }
};

//guardar foto en la galeria del telefono
//file:camera
const guardarImagen = async () => {
  try {
    if (!selectPicture) return;

    // Crea un asset en la galería a partir del URI local
    await MediaLibrary.Asset.create(selectPicture);

    // Navega a favorites pasando el URI
    router.replace({
      pathname: '/(tabs)/tasks',
      params: { picture: selectPicture },
    });
  } catch (error) {
    console.log(error);
  }
};

    if (selectPicture) {
        <View style={styles.container}>
            <Image source={{ uri: selectPicture?.toString() }} style={ styles.camera} />

            <Pressable 
        onPress ={()=>{{router.replace('../tasks')}}}
        style = {styles.back}>
            <Ionicons name = 'chevron-back-outline' size = {36} color = {'#fff'} />
        </Pressable>

        <Pressable onPress ={guardarImagen} style = {[styles.capture, {left: dimensions.width/2 - 32}]}>
            <Ionicons name = 'checkmark-circle-outline' size = {64} color = {'#fff'} />
        </Pressable>


        
            <Button title="Guardar" onPress={guardarImagen} />
        </View>
    }

    


  return (
    
    <View style={styles.container}>
    <CameraView style={styles.camera} facing={facing} ref={cameraRef} />


        <Pressable 
        onPress ={()=>{{router.replace('../tasks')}}}
        style = {styles.back}>
            <Ionicons name = 'chevron-back-outline' size = {36} color = {'#fff'} />
        </Pressable>

        <Pressable onPress ={tomarFoto} style = {[styles.capture, {left: dimensions.width/2 - 32}]}>
            <Ionicons name = 'radio-button-on-outline' size = {64} color = {'#fff'} />
        </Pressable>

        <Pressable onPress={lanzarGaleria} style = {[styles.gallery, {left: 30}]}>
            <Ionicons name = 'image-outline' size = {36} color = {'#fff'} />
        </Pressable>


      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Text style={styles.text}>Flip Camera</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 64,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: '100%',
    paddingHorizontal: 64,
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },

  capture: {
        position: 'absolute',
        bottom: 120,
        backgroundColor: 'transparent',

    },
    gallery: {
        position: 'absolute',

        bottom: 130,
        backgroundColor: 'transparent',
    },
    back: {
        position: 'absolute',
        top: 54,
        left: 24,
        backgroundColor: 'transparent',
    },
});
