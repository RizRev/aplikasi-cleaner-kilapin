import { StyleSheet, View, Text, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import LottieView from 'lottie-react-native'

const Done = ({navigation}) => {
  return (
    <View style={styles.backgroundgradient}>
        <LottieView 
          source={require('../../assets/animation/successful.json')}
          autoPlay
          loop
        style={styles.TopBar}/>
        <View style={styles.shape}>
          <Text style={styles.maintext}>Pendaftaran Anda dalam Review!</Text>
          <Text style={styles.subtext}>Pendaftaran anda sedang dalam review dari team Kilapin, silahkan cek WhatsApp dan Email secara berkala!</Text>
          <TouchableOpacity style={styles.press} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttontext}>MENU LOGIN</Text>
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
    height: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '1%'
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
    marginTop: '-30%'
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
    marginTop: '41%',
    backgroundColor: '#2CD994',
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

export default Done
