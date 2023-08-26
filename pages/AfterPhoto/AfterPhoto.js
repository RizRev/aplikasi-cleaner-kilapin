
import React, {useState} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import {firebase} from '../../config/index'
import AsyncStorage from '@react-native-async-storage/async-storage';
const Test = () => {  
    const [order_id , setOrder_id] = useState('');
    const [image, setImage] = useState(null)
    const [uploading, setUploading] = useState(false)
    AsyncStorage.getItem('orderChat').then((value) => {
    return setOrder_id(value)});
    const pickImage = async () => {
        console.log(order_id)
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing:true,
            aspect: [4,3],
            quality:1
        })

        const source = {uri: result.uri}
        console.log(source)
        setImage(source)
    }

    const uploadImage = async () => {
        setUploading(true)
        const response = await fetch(image.uri)
        const blob = await response.blob()
        console.log(blob)
        const now = new Date();
        const date = now.toLocaleDateString().replace(/\//g, '-'); // Mengganti tanda / dengan -
        const time = now.toLocaleTimeString().replace(/:/g, '-'); // Mengganti tanda : dengan -
        const filename = `${order_id}`+ '_' + 'after'+ '_'  + date + '_' + time + '.jpeg';
        var ref = firebase.storage().ref().child(filename)
        if(ref) {
            console.log("ini ref",ref)
            ref.put(blob).then(() => {
                ref.getDownloadURL().then(url => {
                    const link = `http://153.92.4.143:4567/photo/after`
                    const response = fetch(link, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        order_id: order_id,
                        photo: url,
                      }),
                    });
                })
            })
        }
        
        try {
            await ref
        } catch (e) {
            console.log(e)            
        }

        setUploading(false)
        Alert.alert(
            'Photo uploaded..!!'
        )
        setImage(null)
    }
  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.selectButton} onPress={pickImage}
        >
            <Text style={styles.buttonText}>Pick an Image</Text>
        </TouchableOpacity>
        <View style={styles.imageContainer}>
            {image && <Image source={{uri: image.uri}} style={{ width:300, height:300}}/>}
            <TouchableOpacity style={styles.selectButton} onPress={uploadImage}
        >
            <Text style={styles.buttonText}>Upload an Image</Text>
        </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default Test

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        backgroundColor:'#fff',
        justifyContent:'center'
    },
    selectButton:{
        borderRadius:5,
        width:150,
        height:50,
        backgroundColor:'blue',
        alignItems:'center',
        justifyContent:'center'
    },
    uploadButton:{
        borderRadius:5,
        width:150,
        height:50,
        backgroundColor:'red',
        alignItems:'center',
        justifyContent:'center'
    },
    buttonText:{
        color:'white',
        fontSize:18,
        fontWeight:'bold',
    },
    imageContainer:{
        marginTop:30,
        marginBottom:50,
        alignItems:'center'
    }
})