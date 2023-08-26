import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LinearGradient} from 'expo-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Text, StyleSheet, View, Switch,SafeAreaView,BackHandler } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
const colors = ['#F05941']
import * as Location from 'expo-location'
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import Pusher from 'pusher-js';
import { useDispatch, useSelector } from 'react-redux';
import {ApplicationActions} from '@actions';

const Home = ({ navigation, route }) => {
  useEffect(() =>{
    fetchLoginStatus()
}, []);
  const fetchLoginStatus = async() => {
    console.log('splash')
    // await AsyncStorage.setItem('Login','false')
    // const status = await AsyncStorage.getItem('Login')
    setTimeout(() => {
      if (status==='true') {
        navigation.navigate('MainApp',{screen:'profile'})
      } else {
        navigation.navigate('Login')
      }
    }, 500)
  }
  const dispatch = useDispatch();
  const [booking, setBooked] = useState(null);
  const [temp, setTempBook] = useState(null);
  const [tempUrgent, setTempUrgent] = useState(null);
  const [count, setCount] = useState(0);
  const [location, setLocation] = useState(null);
  const [cleanerID,setCleanerID] = useState('')
  const [name,setName] = useState('')
  let userId;
  const [timeoutId, setTimeoutId] = useState(null); // For storing the timeout ID

  const login = useSelector(state => state.auth.login);
  const order = useSelector(state => state.application.booking)

  console.log('redux order',order)
  console.log('booking order',booking)
  console.log('temp order',temp)


  if (login) {
    userId = useSelector(state => state.auth.login.userId._id);
    console.log("TEDD : ",userId);
  
  }
  // const urgent = useSelector(state => state.application.urgent);
  // if (urgent) {
  //   console.log("ADA REDUX URGENT : ",urgent);
  //   setTempBook(urgent);
  // }
  

  console.log("ILHAM : ",userId);
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'You need to grant location permission to use this feature.');
      }
    })();
  }, []);

  const pusher = new Pusher('a6c67c80d1f30f9f4710', {
    cluster: 'ap1',
    // Add other options as needed
  });

    const channel = pusher.subscribe('order-on-going');
    let dataTimeoutId;

    useEffect(() => {
      // setBooked(null)
      if (order) {
        setBooked(order)
      }
      // Subscription setup for Pusher
      const pusher = new Pusher('a6c67c80d1f30f9f4710', {
        cluster: 'ap1',
        // Add other options as needed
      });
  
      const channel = pusher.subscribe('order-on-going');
      let dataTimeoutId;
  
      channel.bind(`${userId}`, (data) => {
        console.log('Received event:', JSON.stringify(data));
        clearTimeout(dataTimeoutId);
        if (data) {
          if (data.booking_type === 'Urgent') {
            // Handle "Urgent" orders with a 20-second timeout
            setTempBook(data);
            console.log('data set temp book',temp)
            dataTimeoutId = setTimeout(() => {
              setTempBook(null);
              console.log('Data cleared due to inactivity.');
            }, 20000); // 20 seconds
            console.log('Order dispatched as Urgent:', data);
            setTempBook(data);
            setBooked(data);
            dispatch(ApplicationActions.onAddUrgent(data));
          } else if(data.booking_type === 'Booking' || data.status === 'Placement'){
            // For other booking types, dispatch to onAddBooking directly
            dispatch(ApplicationActions.onClearUrgent());
            setBooked(null);
            console.log('Order dispatched to onAddBooking:', data);
          } else if (data.booking_type === 'Booking' && data.status !== 'Placement') {
            
          }
        }
      });
  
      // Clean up the channel subscription when unmounting the component
      return () => {
        clearTimeout(dataTimeoutId);
        pusher.unsubscribe('order-on-going');
      };
    }, [userId]);
  
    console.log("DATA BOOKING REVAN : ", booking);
    console.log("DATA URGENT REVAN : ", temp);

    const handleOrder = async (orderId) => {
      try {
        console.log('handle claim',orderId,userId)
        if (booking.status === 'Open'||temp.status === 'Open') {
          console.log('menjalankan claim order', orderId);
  
          const response = await fetch(`https://cleaner.kilapin.com/order/claim-order/${orderId}/${userId}`);
          const data = await response.json();
  
          // Clear the previous timeout when handleOrder is executed
          clearTimeout(dataTimeoutId);
          setTempBook(null);
          setBooked(null);
          // booking = data; // Store the data in the accessible scope
  
          console.log('claim order', data);
          
        } else {
          console.log('Cannot claim order. The status is not Open.');
        }
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'You need to grant location permission to use this feature.');
      }
    })();
  }, []);
    const [isEnabled, setIsEnabled] = useState(false);
    const [status, setStatus] = useState('');
    const toggleSwitch = async () => {
      setIsEnabled(previousState => !previousState);
      setStatus(isEnabled ? "On" : "Off");
    // Mendapatkan waktu saat ini dalam UTC
const currentTimeUTC = new Date();

// Menyesuaikan dengan perbedaan zona waktu GMT+7 (420 menit)
const gmtOffsetInMinutes = 0;
const currentTimeGMTPlus7 = new Date(currentTimeUTC.getTime() + gmtOffsetInMinutes * 60000);

// Mendapatkan jam, menit, dan detik dari waktu GMT+7
const hours = currentTimeGMTPlus7.getHours();
const minutes = currentTimeGMTPlus7.getMinutes();
const seconds = currentTimeGMTPlus7.getSeconds();
// Mendapatkan hari dalam bahasa Inggris (0: Minggu, 1: Senin, dst.)
const dayOfWeek = currentTimeGMTPlus7.getDay();

// Mendapatkan tanggal bulan (1-31)
const dateOfMonth = currentTimeGMTPlus7.getDate();

// Mendapatkan bulan dalam bahasa Inggris (0: Januari, 1: Februari, dst.)
const month = currentTimeGMTPlus7.getMonth();

// Mendapatkan tahun (misal: 2023)
const year = currentTimeGMTPlus7.getFullYear();
const { coords } = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
const { latitude, longitude } = coords;
const apiKey = 'AIzaSyAuyS1LLibOZOGt-eliwsfzzTSYb3fVkmQ'
const response = await axios.get(
  `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
);

// Mendapatkan hasil dari respon API
if (response.data.results.length > 0) {
  const locationData = response.data.results[0];
  var formattedAddress = locationData.formatted_address;
  console.log(formattedAddress);
}
setLocation({ latitude, longitude });
  console.log('waktu yang didapatkan: ',`${dayOfWeek}-${month}-${year}`,`${hours}:${minutes}`,coords)
  console.log("menajalankan status")
      const link = `https://cleaner.kilapin.com/order/update-status-urgent`
      const result = await fetch(link, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          cleaner_id: cleanerID,
          status: status,
          lat_long: `${latitude},${longitude}`,
          address: formattedAddress,
          datetime: `${dateOfMonth}-${month}-${year},${hours}:${minutes}`
        }),
      });
      const data = await result.json();
      console.log('Response data:', name,cleanerID,data);
  }
  // const isBookingAvailable = booking !== null;
  // if (booking) {
    if (booking) {
      console.log("Ada Booking!");
    } else {
      console.log("Ada Temp!");
    }
  
    return (
      <SafeAreaView style={styles.ContainerMain}>
      <LinearGradient colors={['#FFFFFF', '#F5F2FF']} style={styles.BottomGradient} start={{ x: 0, y: 0.0 }} end={{ x: 0, y: 0.81 }}>
      </LinearGradient>
      <LinearGradient
        colors={['#5865F2', '#DD7DE1']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.TopBar}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.Text}>
            Home
          </Text>
          <View style={{ marginHorizontal: '2%' }}></View>
          <View style={[styles.container, { marginTop: '0.5%' }]}>
            <TouchableOpacity
              onPress={toggleSwitch}
              style={[
                styles.button,
                isEnabled ? styles.activeButton : styles.inactiveButton,
              ]}
            >
              <Text style={isEnabled ? styles.activeButtonText : styles.inactiveButtonText}>
                {isEnabled ? 'Aktif' : 'Nonaktif'}
              </Text>
            </TouchableOpacity>
          </View>
          {/* <Text style={styles.TextStyle}>Status: {status}</Text> */}
        </View>
      </LinearGradient>
      <View style={styles.JobBox}>
      </View>
      <View height='70%' flexGrow={1} style={{ paddingBottom: hp("2%"), marginTop: hp('5%') }}>
        {booking ? (
          <ScrollView
            contentContainerStyle={{
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}
          >
            <View style={styles.bookingContainer}>
              <TouchableOpacity
                style={{ height: '100%' }}
                onPress={() => {
                  handleOrder(booking.order_id);
                  navigation.navigate('NavOne', { order_id: booking.order_id });
                }}
              >
                <Text
                  style={{
                    color: '#695869',
                    fontFamily: 'Ubuntu-Bold',
                  }}
                >
                  # {booking.order_id}
                </Text>
                <Text
                  style={{
                    color: '#fcf2fc',
                    fontSize: 25,
                    fontFamily: 'Ubuntu-Bold',
                  }}
                >
                  {booking.address?.length > 30
                    ? `${booking.address.slice(0, 30)}...`
                    : booking.address}
                </Text>
                {booking.service_id && booking.service_id.description && (
                  <Text
                    style={{
                      color: '#fcf2fc',
                      fontSize: 17,
                      fontFamily: 'Ubuntu-Bold',
                    }}
                  >
                    {booking.service_id.description}
                  </Text>
                )}
                <Text
                  style={{
                    color: '#8a4e8c',
                    fontFamily: 'Ubuntu-Bold',
                    fontSize: 18,
                  }}
                >
                  {booking.category}
                </Text>
                {booking.service_id && booking.service_id.option && (
                  <Text
                    style={{
                      color: '#fcf2fc',
                      fontSize: 15,
                      fontFamily: 'Ubuntu-Bold',
                    }}
                  >
                    {booking.service_id.option === 'Nothing'
                      ? 'No Add-on'
                      : booking.service_id.option}
                  </Text>
                )}
                <Text>Status: {booking.status}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : (
          // Render content using 'temp' if 'booking' is empty or falsy
          temp && temp !== null ? (
            <ScrollView
              contentContainerStyle={{
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}
            >
              <View style={styles.bookingContainer}>
                <TouchableOpacity
                  style={{ height: '100%' }}
                  onPress={() => {
                    handleOrder(booking.order_id);
                    navigation.navigate('NavOne', { order_id: temp.order_id });
                  }}
                >
                  <Text
                    style={{
                      color: '#695869',
                      fontFamily: 'Ubuntu-Bold',
                    }}
                  >
                    # {temp.order_id}
                  </Text>
                  <Text
                    style={{
                      color: '#fcf2fc',
                      fontSize: 25,
                      fontFamily: 'Ubuntu-Bold',
                    }}
                  >
                    {temp.address?.length > 30
                      ? `${temp.address.slice(0, 30)}...`
                      : temp.address}
                  </Text>
                  {temp.service_id && temp.service_id.description && (
                    <Text
                      style={{
                        color: '#fcf2fc',
                        fontSize: 17,
                        fontFamily: 'Ubuntu-Bold',
                      }}
                    >
                      {temp.service_id.description}
                    </Text>
                  )}
                  <Text
                    style={{
                      color: '#8a4e8c',
                      fontFamily: 'Ubuntu-Bold',
                      fontSize: 18,
                    }}
                  >
                    {temp.category}
                  </Text>
                  {temp.service_id && temp.service_id.option && (
                    <Text
                      style={{
                        color: '#fcf2fc',
                        fontSize: 15,
                        fontFamily: 'Ubuntu-Bold',
                      }}
                    >
                      {temp.service_id.option === 'Nothing'
                        ? 'No Add-on'
                        : temp.service_id.option}
                    </Text>
                  )}
                  {/* Status for 'temp' not shown here, add as needed */}
                </TouchableOpacity>
              </View>
            </ScrollView>
          ) :
          <View></View>
        )}
      </View>
    </SafeAreaView>
      );
  }

const styles = StyleSheet.create({
  bookingContainer: {
    width: wp('90%'),
    backgroundColor: '#FFB6F2',
    // borderWidth: 3,
    height: hp('25%'),
    borderRadius: 35,
    padding: 20,
    marginBottom: hp('7%'),
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },   
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
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    elevation: 2,
  },
  activeButton: {
    backgroundColor: '#81b0ff',
  },
  inactiveButton: {
    backgroundColor: '#767577',
  },
  activeButtonText: {
    color: '#f5dd4b',
    fontWeight: 'bold',
  },
  inactiveButtonText: {
    color: '#f4f3f4',
    fontWeight: 'bold',
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
    top: '30%',
    marginRight:'5%',
    width: '15%',
    height: '5%',
    borderRadius: 10,
    position: 'absolute',
    right: 0,
    // margin: 14,
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
});

export default Home;