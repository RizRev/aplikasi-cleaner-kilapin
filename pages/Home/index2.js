import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import React, {Component,useState,useEffect} from 'react'
import {Pressable, Text, StyleSheet, View,Switch} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from "react-native";
import Clean from '../../assets/vector/jsx/Clean.jsx';
const colors = ['#F05941']
const textColor = ['#000000']


const Home = ({navigation, route}) => {
    // AsyncStorage.getAllKeys((err, keys) => {
    //     AsyncStorage.multiGet(keys, (error, stores) => {
    //       stores.map((result, i, store) => {
    //         console.log({ [store[i][0]]: store[i][1] });
    //         // console.log()
    //         return true;
    //       });
    //     });
    //       });
const [count, setCount] = useState(0);
var [cleaner_id,setId] = useState('')
const [booked, setBooked] = useState('')
const [urgent, setUrgent] = useState('')
const [refreshCount, setRefreshCount] = useState(0);

// useEffect(() => {
//     const fetchOrderUrgent = async () => {
//       try {
//         const link = `https://cleaner.kilapin.com/order/get-order/${cleaner_id}`
//         const response = await fetch(link)
//         const data = await response.json()
//         console.log('data urgent',data.data)
//         setUrgent(data.data)
//         if (urgent.length===0) {
//         } 
//       } catch (error) {
//       }
//     }
//     fetchOrderUrgent()
//     const intervalId = setInterval(() => {
//         setCount(count => count + 1);
//       }, 3000);
//     return () => clearInterval(intervalId);
//   },[count])

  useEffect(() => {
    AsyncStorage.getItem("id").then((value) => {
    return setId(value)
    })
    const fetchOrderBooked = async () => {
      try {
        const link1 = `https://cleaner.kilapin.com/order/get-order/${cleaner_id}`
        const response1 = await fetch(link1)
        const data1 = await response1.json()
        setBooked(data1.data)
      } catch (error) {
      }
    }
    fetchOrderBooked()
    const intervalId = setInterval(() => {
        setCount(count => count + 1);
      }, 3000);
    return () => clearInterval(intervalId);
  },[count])

  var home1 = 'dari home'
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return(   
        // <View>
        //     <Text>ini home</Text>
        //     <View>
        //         {
        //             booked.map((booking) => {
        //                 <Text key={booking._id}>{booking._id}</Text>
        //             })
        //         }
        //     </View>
        // </View>
        <View style={styles.ContainerMain}>
            <LinearGradient colors={['#FFFFFF', '#F5F2FF']} style={styles.BottomGradient} start={{x:0, y:0.0}} end={{x: 0, y: 0.81}}>
            </LinearGradient>
            <LinearGradient
            colors={['#5865F2', '#DD7DE1']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.TopBar}>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.Text}>
                    Home
                </Text>
                <View style={{marginHorizontal: '2%'}}></View>
                <View style={[styles.container, {marginTop: '0.5%'}]}>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
        </View>
    </View>
            </LinearGradient>
            <View style={styles.JobBox}>
            </View>
            <View height = '70%' flexGrow = {1} style={{ paddingBottom: hp("2%"),}}>
        <ScrollView
          contentContainerStyle={{
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
            {/* {isEnabled ? (<View>
                <View>
                
                {urgent.length!==0 ? (
                    <View>{urgent.map((urgent) => {
                        return (
                            <View style={styles.container()}
                            key = {urgent.order_id}>
                            <View style={styles.CleanBox}
                            key = {urgent.order_id}>
                            <Clean/>
                            </View>
                            <View style={styles.TextBox}                        >
                            <Text style={[styles.TaskText]}>{urgent.item_name}</Text>
                            <Text style={{fontSize: 10,}}>{urgent.order_id}</Text>
                            <Text style={{fontSize: 10,}}>{urgent.address}</Text>
        </View>
        <Pressable onPress={
            () => navigation.navigate("NavOne",{order_id: urgent.order_id,home : home1})
        } 
        style={styles.Action}>
            <Text style={styles.TextStyle}>{urgent.order_status ? ("Take it!") : ("tidak ada")}</Text>
        </Pressable>
        </View>
                        )
                    })}</View>
                ) : (
                    <View>
                        <Text>Tidak Ada Orderan Urgent</Text>
                    </View>
                )}
            </View>
            </View>):(<View><Text style={{fontFamily: 'Ubuntu-Medium', marginRight: '10%', marginLeft: '10%', textAlign: 'center'}}>Waktunya Istirahat, Aktifkan Kembali Jika Ingin Memulai Kembali</Text></View>)} */}

            <View>
            {booked ? (
                    <View>{booked.map((booking) => {
                        return (
                            <View>
                                <Text>{booking.address}</Text>
                            </View>
        //                     <View style={styles.container()}
        //                     key = {booking.order_id}>
        //                     <View style={styles.CleanBox}
        //                     key = {booking.order_id}>
        //                     <Clean/>
        //                     </View>
        //                     <View style={styles.TextBox}                        >
        //                     <Text style={[styles.TaskText]}>{booking.item_name}</Text>
        //                     <Text style={{fontSize: 10,}}>{booking.order_id}</Text>
        //                     <Text style={{fontSize: 10,}}>{booking.address}</Text>
        // </View>
        // {/* <Text>ini job</Text> */}
        // <Pressable onPress={() => {navigation.navigate("NavOne",{order_id: booking.order_id,home : home1})}
        // } 
        // style={[styles.Action,{
        //     backgroundColor: '#F05941'}]}>
        //     <Text style={styles.TextStyle}>{booking.order_status ? ("Confirm!") : ("tidak ada")}</Text>
        // </Pressable>
        // </View>
                        )
                    })}</View>
                ) : (
                    <Text>Tidak Ada Orderan Booked</Text>
                )}
            </View>
            </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
      },
      label: {
        marginRight: 10,
        fontSize: 16,
      },
    ContainerMain: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    TopBar: {
        height: 90,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    JobBox: {
        marginTop: 15,
    },
    Text: {
        color: '#FFFFFF',
        fontFamily: 'Ubuntu-Medium',
        fontSize: 24,
        fontWeight: 700,
    },
    BottomGradient:{
        width: '100%',
        height: '20%',
        position:'absolute',
        bottom: 0,
    },
    BottomMenu: {
        bottom: 0,
        position: 'absolute',
        marginBottom: 15,
    },
    NavOne: {
        position: 'relative',
        alignSelf: 'center'
    },
    Searcher: {
        
    },
    Prof: {
        position: 'absolute',
        top: 22,
        right: 27,
    },
    Msg: {
        position: 'absolute',
        top: 25,
        left: 29,
    },
    container: (bg) => {
        const bgcolor = colors[bg]
        return {
        width: 300,
        height: 116,
        borderRadius: 10,
        marginTop: 15,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#DA7DE1',
        borderWidth: 3
    }},
    CleanBox: {
        width: 56,
        height: 56,
        borderRadius: 10,
        backgroundColor: '#DA7DE1',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 14,

    },
    TextBox: {
        marginLeft: -6,
        width: 130,
        height: 56,
        justifyContent: 'center',

    },
    TaskText: {
        fontFamily: 'Ubuntu-Bold',
        fontSize: 11,
        fontWeight: '400',
        letterSpacing: 1,
    },
    Action: {
        width: 63,
        height: 63,
        borderRadius: 10,
        position: 'absolute',
        right: 0,
        margin: 14,
        backgroundColor: '#4FC76D',
        alignItems: 'center',
        justifyContent: 'center'

    },
    TextStyle: {
        fontFamily: 'Ubuntu-Medium',
        fontSize: 10,
        color: '#FFF',
        fontWeight: '700',
        letterSpacing: 1,
    }
})

export default Home