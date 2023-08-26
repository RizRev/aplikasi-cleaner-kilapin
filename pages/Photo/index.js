import { StyleSheet, View, Text, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import LottieView from 'lottie-react-native'

const Photo = ({navigation,route}) => {
  const {nik} = route.params
  console.log(nik)
  return (
    <View style={styles.backgroundgradient}>
        <LottieView 
          source={require('../../assets/animation/selfie.json')}
          autoPlay
          loop
        style={styles.TopBar}/>
        <View style={styles.shape}>
          <Text style={styles.maintext}>Selfie dengan KTP!</Text>
          <Text style={styles.subtext}>Lakukanlah selfie bersama KTP kamu sebagai langkah mendaftar menjadi Kilapeeps!</Text>
          <TouchableOpacity style={styles.press} onPress={() => navigation.navigate('Camera',{nik: nik})}>
            <Text style={styles.buttontext}>AMBIL SELFIE</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  backgroundgradient: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFF',
  },
  TopBar: {
    height: '50%',
    marginLeft: '3.5%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '9%'
  },
  namelogo: {
      color:'#fff',
      fontFamily: 'Montserrat',
      fontSize: 32,
  },
  shape: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'stretch',
    textAlign: 'center',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    marginTop: '-15%'
  },
  maintext: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#3C3B3B',
    fontFamily: 'Ubuntu-Bold',
    fontSize: 36,
    marginTop: -0,
    width: '80%',
  },
  subtext: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#3C3B3B',
    fontFamily: 'Ubuntu-Regular',
    fontSize: 14,
    marginTop: 20,
    width: 280,
  },
  press: {
    justifyContent: 'center',
    marginTop: '50%',
    backgroundColor: '#E7461E',
    height: 51,
    borderRadius:30,
    width: 300,
  },
  buttontext:{
    color: '#fff',    
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Ubuntu-Bold'
  },
})

export default Photo
