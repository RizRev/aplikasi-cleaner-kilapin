// import React, { Component } from 'react'
// import { Pressable, Text, StyleSheet, View } from 'react-native'
// import Back from '../../assets/Back.svg'
// import Line from '../../assets/Line.svg'
// import Notif from '../../assets/Notif.svg'
// import Sound from '../../assets/Sound.svg'
// import Logout from '../../assets/Logout.svg'
// import { useNavigation } from '@react-navigation/native'

// const Settings = () => {
//   const navigation = useNavigation()
//   return (
//     <View>
//       <Pressable onPress={() => {navigation.goBack()}}  style={styles.Return}>
//         <Back/>
//       </Pressable>
//       <Text style={styles.Title}>Settings</Text>
//       <View style={styles.SettingsBox}>
//         <View style={styles.SettingsPage}>
//           <Line style={styles.SetLine}></Line>
//           <Notif style={styles.SettingIcon}/>
//           <Text style={styles.SettingText}>Notifications</Text>
//         </View>
//         <View style={styles.SettingsPage}>
//           <Line style={styles.SetLine}></Line>
//           <Sound style={styles.SettingIcon}/>
//           <Text style={styles.SettingText}>Sound and Touch</Text>
//         </View>
//         <View style={styles.SettingsPage} onPress={() => navigation.navigate('Login')}>
//           <Logout style={styles.SettingIcon} onPress={() => navigation.navigate('Login')}/>
//           <Text style={styles.SettingText} onPress={() => navigation.navigate('Login')}>Sign Out</Text>
//         </View>
//       </View>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   Return:{
//     position: 'absolute',
//     top: 30,
//     left: 20,
//   },
//   Title: {
//     fontFamily: 'Ubuntu-Medium',
//     fontSize: 18,
//     fontWeight: '800',
//     lineHeight: 18,
//     alignSelf: 'center',
//     color: '#1E2022',
//     marginVertical: 30,
//   },
//   SettingsBox: {
//     width: 320,
//     height: 135,
//     borderColor: '#E9E9E9',
//     borderWidth: 1,
//     borderRadius: 11,
//     alignSelf: 'center',
//   },
//   SettingsPage: {
//     width: 318,
//     height: 45,
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   SetLine: {
//     position: 'absolute',
//     bottom: 0,
//   },
//   SettingIcon: {
//     marginLeft: 16,
//   },
//   SettingText: {
//     fontFamily: 'Ubuntu-Medium',
//     margin: 10,
//     color: '#000000',
//   }
// })

// export default Settings

import { View, Text } from 'react-native'
import React from 'react'

const Settings= () => {
  return (
    <View>
      <Text>Settings</Text>
    </View>
  )
}

export default Settings