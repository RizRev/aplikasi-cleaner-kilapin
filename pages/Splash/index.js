import { StyleSheet, View, Text, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native'

const Splash = ({navigation}) => {
  useEffect(() =>{
    setTimeout(() => {
        navigation.replace('GetStarted')
    }, 500)
}, []);
return (
  <View style={styles.background}>
      <LottieView 
      source={require('../../assets/animation/kilapinwithtagline.json')}
      autoPlay
      loop
      style={{
          height: hp('20%'),
          marginTop: hp('19%')
      }}/>
      <LottieView 
      source={require('../../assets/animation/poweredbyprodigium.json')}
      autoPlay
      loop 
      style={{
          height: hp('5%'),
          marginBottom: hp('4%')
      }}/>
  </View>
)
}

const styles = StyleSheet.create({
  background: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'column',
      backgroundColor: '#fff'
  }
})

export default Splash