import { StyleSheet, View, Text, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native'

const GetStarted = ({navigation}) => {
  return (
    <View style={styles.backgroundgradient}>
        <LottieView 
          source={require('../../assets/animation/kilapin.json')}
          autoPlay
          loop
        style={styles.TopBar}/>
        <View style={styles.shape}>
          <Text style={styles.maintext}>Jadilah bagian dari Kilapartner!</Text>
          <Text style={styles.subtext}>Bergabunglah dengan Kilapin dan jadilah seorang ahli profesional dalam bidang kebersihan!</Text>
          <TouchableOpacity style={styles.press} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttontext}>MULAI</Text>
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
    height: 450,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '8%',
    marginBottom: '10%'
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
    backgroundColor: '#fff',
    alignSelf: 'stretch',
    textAlign: 'center',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  maintext: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#3C3B3B',
    fontFamily: 'Ubuntu-Bold',
    fontSize: 36,
    marginTop: -0,
    width: wp('80%'),
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
    marginTop: 30,
    backgroundColor: '#DA7DE1',
    height: 51,
    borderRadius:30,
    width: 300,
    marginBottom: '25%'
  },
  buttontext:{
    color: '#fff',    
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Ubuntu-Bold'
  },
})

export default GetStarted
