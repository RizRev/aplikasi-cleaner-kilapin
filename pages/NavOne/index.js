import { View, Text, TouchableOpacity,Image,Linking,Alert,ActionSheetIOS } from 'react-native'
import React, {useEffect,useState} from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {ApplicationActions} from '@actions';

const NavOne = ({route,navigation}) => {
  const login = useSelector(state => state.auth.login);
  const dispatch = useDispatch();
  const {order_id} = route.params
  const [loading, setLoading] = useState(false);
  const handlePhotoUpload = async (uri,statusPhoto) => {
    console.log('status photo upload',statusPhoto)
    try {
      const formData = new FormData();
      formData.append('file', {
        uri,
        name: 'image',
        type: 'image/jpeg',
      });
      formData.append('upload_preset', CLOUDINARY_PRESET);
  
      // setLoading(true);
      const headers = {
        accept: 'application/json',
        'content-type': 'multipart/form-data',
      };
  
      const response = await axios.post(CLOUDINARY_URL, formData, { headers });
      console.log('Image upload response:', response.data.secure_url);
      let image = response.data.secure_url
      
  
      if (response && response.data.secure_url) {
        console.log('data dikirim',image,order_id,statusPhoto)
        const link = `https://cleaner.kilapin.com/order/photo-order`
        const response = await fetch(link, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            order_id:order_id,
            name:`${statusPhoto}-Cleaning`,
            url:image
          }),
        });
        if (response) {
          const data = await response.json()
          console.log('upload photo',data)
        }
      }
      
      // setLoading(false);
      // setApprove(true)
    } catch (error) {
      console.log('Image upload error:', error);
      // setLoading(false);
    }
  };
  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dtyji62ve/image/upload?folder=PhotoOrder';
  const CLOUDINARY_PRESET = 'yjjew3l8';
  const [image, setImage] = useState(null);

  const showActionSheet = () => {
    return new Promise((resolve) => {
      if (Platform.OS === 'ios') {
        ActionSheetIOS.showActionSheetWithOptions(
          {
            options: ['Cancel', 'Take Photo', 'Choose from Library'],
            cancelButtonIndex: 0,
          },
          (buttonIndex) => {
            if (buttonIndex === 1) {
              resolve('camera');
            } else if (buttonIndex === 2) {
              resolve('library');
            } else {
              resolve('cancel');
            }
          }
        );
      } else {
        // For Android or other platforms, you can use a custom action sheet library or UI component
        // to provide a similar selection interface.
        // Here, we'll use a basic Alert with buttons to simulate an action sheet on Android.
        Alert.alert(
          'Choose Image Source',
          '',
          [
            {
              text: 'Cancel',
              style: 'cancel',
              onPress: () => resolve('cancel'),
            },
            {
              text: 'Take Photo',
              onPress: () => resolve('camera'),
            },
            {
              text: 'Choose from Library',
              onPress: () => resolve('library'),
            },
          ],
          { cancelable: true }
        );
      }
    });
  };
  
  // Panggil fungsi handlePermission di useEffect untuk meminta izin saat komponen di-mount.
  useEffect(() => {
    handlePermission();
  }, []);
  useEffect(() => {
    const handleOrder = async () => {
      try {
        // console.log(order_id)
        const link = `https://cleaner.kilapin.com/order/detail/${order_id}`;
        const response = await fetch(link);
        const data = await response.json();
        console.log("Order Detail:", data.data);
        setOrderDetail(data.data);
      } catch (error) {
        console.log('Error while fetching order detail:', error);
      }
    };
    handleOrder();
  
    const intervalId = setInterval(() => {
      setCount(count => count + 1);
    }, 3000);
  return () => clearInterval(intervalId);
  }, [
    count
  ]);

  const pickImage = async (statusPhoto) => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission denied');
        return;
      }
        console.log("library permision",status)
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      if (cameraPermission.status !== 'granted') {
        console.log('Camera permission denied');
      }
      console.log('camera',cameraPermission)
      const selectedSource = await showActionSheet();
      let result;
      if (selectedSource === 'camera') {
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          aspect: [4, 3],
          quality: 1,
        });
      } else if (selectedSource === 'library') {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          aspect: [4, 3],
          quality: 1,
        });
      }
  
      if (!result.canceled && result.assets.length > 0) {
        const assetUri = result.assets[0].uri;
        setImage(assetUri);
        handlePhotoUpload(assetUri,statusPhoto);
      }
    } catch (error) {
      console.log('ImagePicker Error:', error);
    }
  }
  const [count, setCount] = useState(0);
  const [orderDetail,setOrderDetail] = useState('')
  const [destination, setDestination] = useState('');
  const [destinationCoords, setDestinationCoords] = useState(null);
  const handlePermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      // Jika pengguna tidak memberikan izin, tangani kasus ini di sini.
      // Misalnya, tampilkan pesan bahwa akses lokasi diperlukan untuk menggunakan fitur ini.
      // Anda dapat menampilkan pesan atau melakukan sesuatu sesuai dengan kebutuhan aplikasi Anda.
      Alert.alert('Akses Lokasi Diperlukan', 'Aplikasi memerlukan akses lokasi untuk menggunakan fitur ini.');
    }
  };
  
  // Panggil fungsi handlePermission di useEffect untuk meminta izin saat komponen di-mount.
  useEffect(() => {
    handlePermission();
  }, []);
  useEffect(() => {
    const handleOrder = async () => {
      try {
        // console.log(order_id)
        const link = `https://cleaner.kilapin.com/order/detail/${order_id}`;
        const response = await fetch(link);
        const data = await response.json();
        // console.log("Order Detail:", data.data);
        if (data) {
          setOrderDetail(data.data);
        } else {
          navigation.navigate("Home");
        }
        
      } catch (error) {
        console.log('Error while fetching order detail:', error);
      }
    };
    handleOrder();
  
    const intervalId = setInterval(() => {
      setCount(count => count + 1);
    }, 5000);
  return () => clearInterval(intervalId);
  }, [
    count
  ]);

  const handleSearch = async (item) => {
    try {
      console.log(item)
      const result = await Location.geocodeAsync(item);
      console.log("ini result",result)
      if (result && result.length > 0) {
        const coords = {
          latitude: result[0].latitude,
          longitude: result[0].longitude,
        };
        console.log(coords)
        setDestinationCoords(coords);
        handleOpenInMaps()
      } else {
        Alert.alert('Lokasi Tidak Ditemukan', 'Silahkan Buka Aplikasi Google Maps')
      }
    } catch (error) {
      console.log('Error while searching for location:', error);
    }
  };

  const handleOpenInMaps = () => {
    console.log(destinationCoords)
    if (destinationCoords) {
      const { latitude, longitude } = destinationCoords;
      const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      Linking.openURL(url);
    }}

    const handleOrderStatusUpdate = async (newStatus) => {
      console.log(newStatus)
      try {
        const link = `https://customer.kilapin.com/order/status/${newStatus}/${order_id}`;
        const response = await fetch(link, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        console.log('Status Update Response:', data);
        // Assuming the API response returns updated order details, update the orderDetail state.
        // handleOrder()
      } catch (error) {
        console.log('Error while updating order status:', error);
      }
    };

  if (orderDetail) {
    return (
      <SafeAreaView style={{backgroundColor:'#fff',height:'100%'}}>
        <View style={{height:'10%',backgroundColor:'#DD7DE1',}}>
          <Text style={{     
            fontFamily: 'Ubuntu-Bold',
            fontSize: 30,
            fontWeight: 'bold',
            color:'#fff',
            textAlign:'center',
            textAlignVertical:'center',
            marginTop:'5%'
            }}>Order {orderDetail.booking_type}</Text>
        <Text
          style={{
            textAlign:'center',
            fontFamily: 'Ubuntu-Bold',
            color:'#8a4e8c'
          }}
        >{orderDetail.status}</Text>
        </View>
        <View style={{paddingHorizontal: wp('5%'),height: hp('90%')}}>
        <View style={{
  backgroundColor: '#fff',
  height: '30%',
  borderRadius: 25,
  marginBottom: '10%',
  marginTop: '8%',
  elevation: 5,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 3,
  padding: '5%',
  flexDirection: 'row',
  alignItems: 'center',
}}>
  <View style={{
    width: '30%',
    height: '50%',
  }}>
    <Image
      source={require('../../assets/user.png')}
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  </View>
  <View style={{
    width: '50%',
    marginLeft: '5%', // Tambahkan jarak antara ikon dan keterangan nama & nomor telepon
  }}>
    <Text style={{
      color: '#361f37',
      fontFamily: 'Ubuntu-Bold',
      fontSize: 30,
      fontWeight: 'bold',
      // numberOfLines: 3, // Batasi nama menjadi satu baris
      // ellipsizeMode: 'tail', // Tambahkan tanda elipsis jika nama terlalu panjang
    }}>
      {orderDetail.user_id.name?.length > 30 ? (`${orderDetail.user_id.name.slice(0,30)}...`):orderDetail.user_id.name}
    </Text>
    {/* <Text>
      Phone: +62{orderDetail.user_id.phone}
    </Text> */}
  </View>
</View>

        <TouchableOpacity 
        onPress={() => handleSearch(orderDetail.address)}
        style={{backgroundColor: '#FFB6F2',height: '20%', borderRadius:25,
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            padding:'5%',
            flexDirection: 'row',
            alignItems: 'center',
      }}>
        <View style={{
            width: '30%',
            height: '50%',
            marginLeft: '7%'
  }}>
        <Image
          source={require('../../assets/map.png')}
          style={{
            width: '57%',
            height: '100%',
          }}
        />
  </View>
  <View style={{
    width: '50%',
    marginLeft: '5%', // Tambahkan jarak antara ikon dan keterangan nama & nomor telepon
  }}>
        <Text style={{
          color:'#fcf2fc',
          fontSize: 25,
          fontFamily: 'Ubuntu-Bold'
        }}>
          {orderDetail.address?.length > 30 ? orderDetail.address.slice(0,30) : orderDetail.address}
        </Text>
        <Text
          style={{
            fontFamily: 'Ubuntu-Bold',
            color:'#8a4e8c'
          }}
        >{orderDetail.service_id.name}</Text>
        <Text 
          style={{
            color:'#8a4e8c'
          }}
        >
          {(orderDetail.notes)?orderDetail.notes:('tidak ada notes')}
        </Text>
        </View>
      </TouchableOpacity>
        <View style={{flexDirection: 'row',flexWrap:'wrap',alignContent:'center',justifyContent:'center',height: '27%',padding:'3%'}}>
          <View
          style={{width:'40%',height:'40%',justifyContent:'center',alignItems:'center',borderBottomWidth: 2,borderRightWidth: 2}}
          >
          <Image
        source={require('../../assets/building.png')}
        style={{width:'30%',height:'60%',marginBottom: '5%'}}
        />
        <Text
          style={{
            fontFamily: 'Ubuntu-Bold',
            color:'#8a4e8c'
          }}
        >{orderDetail.service_id.description}</Text>
          </View>
        <View
        style={{width:'40%',height:'40%',justifyContent:'center',alignItems:'center',borderBottomWidth: 2,}}
        >
        <Image
        source={require('../../assets/jam.png')}
        style={{width:'30%',height:'60%',marginBottom: '5%'}}
        />
        <Text
          style={{
            fontFamily: 'Ubuntu-Bold',
            color:'#8a4e8c'
          }}
        >{orderDetail.time?orderDetail.time : 'Secepatnya!'}</Text>
        </View>
        <View
        style={{width:'40%',height:'40%',justifyContent:'center',alignItems:'center',borderRightWidth: 2}}
        >
        <Image
        source={require('../../assets/clipboard.png')}
        style={{width:'30%',height:'60%',marginBottom: '5%'}}
        />
        <Text
          style={{
            fontFamily: 'Ubuntu-Bold',
            color:'#8a4e8c'
          }}
        >{orderDetail.insurance==true ? 'Use Insurance':'No Insurance'}</Text>
        </View>
        <View
        style={{width:'40%',height:'40%',justifyContent:'center',alignItems:'center',}}
        >
        <Image
        source={require('../../assets/addon.png')}
        style={{width:'30%',height:'60%',marginBottom: '5%'}}
        />
        <Text
          style={{
            fontFamily: 'Ubuntu-Bold',
            color:'#8a4e8c'
          }}
        >{orderDetail.service_id.option==='Nothing' ? 'No Add-on':orderDetail.service_id.option}</Text>
        </View>
        </View>
        <View style={{height:'10%',flexDirection: 'row',justifyContent:'space-between'}}>
          <View style={{width: '40%',borderColor:'#dd7de1',height:'80%',borderWidth:2,borderRadius:20}}>
          <TouchableOpacity 
          onPress={() => navigation.navigate("Chat",{order_id: orderDetail.order_id,profile: login})}
          style={{justifyContent:'center',alignItems:'center',height:'100%'}
        }>
          <Text 
          style={{
            color:'#dd7de1',
            fontSize: 20,
            fontFamily: 'Ubuntu-Bold'
          }}
          >Chat</Text>
          </TouchableOpacity>
          </View>
          <View style={{borderWidth:2,borderColor:'#dd7de1',width: '40%',backgroundColor:'#f8e5f9',height:'80%',borderRadius:20}}>
          <TouchableOpacity 
            onPress={() => {
              if (orderDetail.status === "Placement") {
                handleOrderStatusUpdate("Arrival-Cleaner");
              } else if (orderDetail.status === "Approved-Cleaner") {
                handleOrderStatusUpdate("Approved-Area");
              } else if (orderDetail.status === "Approved-Area") {
                pickImage('Before')
                handleOrderStatusUpdate("Order-Ongoing");
              } else if (orderDetail.status === "Done") {
                pickImage('After')
                dispatch(ApplicationActions.onClearUrgent());
                dispatch(ApplicationActions.onClearBooking());
                navigation.navigate('Home')
              }
            }}
          style={{justifyContent:'center',alignItems:'center',height:'100%'}}>
          <Text
          style={{
            color:'#dd7de1',
            fontSize: 20,
            fontFamily: 'Ubuntu-Bold'
          }}
          >            
          {orderDetail.status === "Placement" ? "Arrive" :
            orderDetail.status === "Approved-Cleaner" ? "Area" :
              orderDetail.status === "Approved-Area" ? "Start" :
                orderDetail.status === "Done" ? "Done" : "Wait!"}</Text>
          </TouchableOpacity>
          </View>
  
        </View>
        </View>
      </SafeAreaView>
    )
  } 
  return (
    <View></View>
  )
}

export default NavOne