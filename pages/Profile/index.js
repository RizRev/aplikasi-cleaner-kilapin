import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect,useState} from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Gap from '../../components/Gap';
import Logo from '../../assets/vector/jsx/Logo';
import Gear from '../../assets/vector/jsx/Gear';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Clean from '../../assets/vector/jsx/Clean';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import {AuthActions} from '@actions';
const colors = ['#F05941']


const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const login = useSelector(state => state.auth.login);
  console.log('ini login',login)
  const [name, setName] = useState('Achmad Rizky Revanda')
  const [phone, setPhone] = useState('85814735655')
  const [history, setHistory] = useState('')
  const [profile, setProfile] = useState(login.userId.photo_user)
  const data = [{
    order_id: '123123',
    address: 'Jakarta Selatan',
    cleaner_balance:'1000',
    time:'10:00'
  }]


  useEffect(() => {
    console.log(history)
    setHistory(data)
  //   // fetchMemberData()
  //   fetchHistoryData()
  },[])

    // const fetchMemberData = async () => {
    //   try {
    //     // const name1 = await AsyncStorage.getItem('name')
    //     // const phone1 = await AsyncStorage.getItem('phone')
    //     // const profile = await AsyncStorage.getItem('profile')
    //     // console.log('profile',name1,phone1,profile)
    //     // if (profile !== null) {
    //     //   setProfile(profile)
    //     // } 
    //     // setName(name1)
    //     // setPhone(phone1)
    //   } catch (error) {
    //     Alert.alert(error)
    //   }
    // }
    // const fetchHistoryData = async () => {
    //   try {
    //     console.log("menjalankan get order")
    //     const id = await AsyncStorage.getItem('id')
    //     console.log(id)
    //     const link = `https://backend-api.com/order/history-order/${id}`
    //     console.log(link)
    //     const response = await fetch(link)
    //     const data = await response.json()
    //     const orders = data.data
    //     // console.log('histori order',orders)
    //     const orders1 = orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    //     setHistory(orders1)
    //     console.log("ini data history",data)
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }

    const handleLogout = async () => {
      console.log('menjalankan logout')
      // const name = await AsyncStorage.removeItem('name')
      // const profile = await AsyncStorage.removeItem('profile')
      // await AsyncStorage.removeItem('phone')
      // await AsyncStorage.removeItem('id')
      // dispatch(AuthActions.authentication(false));
      // await AsyncStorage.setItem('Login','false')
      navigation.navigate("Login")
    }

  return (
    <View style={styles.allcontainer}>
      <LinearGradient
        colors={['#FFFFFF', '#F5F2FF']}
        style={styles.BottomGradient}
        start={{x: 0, y: 0.0}}
        end={{x: 0, y: 0.81}}
      />
      <LinearGradient
        colors={['#5865F2', '#DD7DE1']}
        style={styles.backgroundgradient}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}>
        <TouchableOpacity    
        style={{width:25,height:25,marginTop:50,marginLeft:280}}                           
        onPress={handleLogout}>
          <Image
            source={require('../../assets/logout-white.png')}
            style={{width:'100%',height:'100%'}}
          />
        </TouchableOpacity>
        <Logo style={styles.logo} />
      </LinearGradient>
      <View style={{backgroundColor:'#FFF',borderRadius:100,width:150,height:150,padding:10,position:'absolute',top:155}}>
        <Image
      source={profile ? { uri: profile } : require('../../assets/user.png')}
      style={{
        width: '100%',
        height: '100%',
        borderRadius:75,
      }}
    />
        </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Gap height={80} />
        <Text style={styles.profilename}>{name}</Text>
        <Gap height={9} />
        <View style={{flexDirection:'row', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
        <Text style={styles.phonenumber}>+62{phone}</Text>
        <Gap width={10}/>
        {/* <Text style={styles.phonenumber} onPress={() => navigation.navigate('NavOne')}>-  {formattedPrice}</Text> */}
        </View>
        <Gap height={40} />
        <Text style={styles.history}>Order History</Text>
      </View>
      <Gap height={20} />
      <View height = '45%' flexGrow = {1} style={{ paddingBottom: "28%",}}>
      <ScrollView
          contentContainerStyle={{
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
        {/* <View style={{marginTop: '-5%'}}> */}
        {history ? (
                    <View>{history.map((urgent) => {
                        return (
                          <View key={urgent.order_id} style={{backgroundColor:'#DA7DE1',width: wp('85%'),height:hp('12%'),padding:15,borderRadius:20,marginBottom:15}}>
                            <View style={{flexDirection:'row',alignItems:'center',height:'100%',justifyContent:'space-between'}}>
                              <View style={{width:'80%'}}>
                                <Text style={{fontWeight:'bold',fontSize:15,color:'#FFF'}}>{urgent.address.slice(0,25)}...</Text>
                                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:'10%'}}>
                                <Text style={{fontStyle:'italic',color:'#FFF'}}>{urgent.time === 'Now'?urgent.createdAt.slice(0,10):urgent.time.slice(0,10)}</Text>
                                <Text style={{color:'#FFF'}}>{urgent.order_id}</Text>
                                </View>
                              </View>
                              <View>
                                <Text style={{color:'#FFF'}}>{urgent.cleaner_balance}</Text>
                              </View>
                            </View>
                          </View>
                        )
                    })}</View>
                ) : (
                    <Text>Tidak Ada History</Text>
                )}
          {/* </View> */}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  allcontainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  Settings: {
    position: 'absolute',
    top: 24,
    marginTop: '12%',
    right: 23,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundgradient: {
    height:'30%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%'
  },
  logo: {
    // marginTop: '5%',
    marginBottom: 60,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  ppshape: {
    backgroundColor: '#000',
    padding: 5,
    marginBottom: -70,
    borderRadius: 100,
    backgroundColor: '#F2F2F2',
  },
  pp: {
    backgroundColor: '#C3C3C3',
    padding: 60,
    borderRadius: 100,
  },
  profilename: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 24,
    fontWeight: '500',
    letterSpacing: 1,
    color: '#1E2022',
  },
  phonenumber: {
    fontFamily: 'Ubuntu-Medium',
    fontSize: 18,
    lineHeight: 18,
    letterSpacing: 1,
    color: '#77838F',
  },
  history: {
    color: '#1E2022',
    fontStyle: 'normal',
    fontFamily: 'Ubuntu-Bold',
    fontWeight: '500',
    letterSpacing: 1,
    lineHeight: 21,
    fontSize: 20,
    alignSelf: 'center',
  },
  data: {
    fontFamily: 'Ubuntu-Medium',
    fontSize: 14,
    color: '#1E2022',
    letterSpacing: 1,
    lineHeight: 21,
  },
  BottomGradient: {
    width: '100%',
    height: '20%',
    position: 'absolute',
    bottom: 0,
  },
  JobBox: {
    margin: 20,
    alignItems: 'center',
  },
  BottomMenu: {
    bottom: 0,
    position: 'absolute',
    marginBottom: 15,
    alignSelf: 'center',
  },ContainerMain: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
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
    marginLeft: '5%',
    marginTop: '27%'

},
TextBox: {
    marginLeft: '50%',
    width: 120,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
},
TaskText: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 11,
    fontWeight: '400',
    letterSpacing: 1,
    flexDirection: 'row',
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center'
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
    fontSize: 14,
    color: '#FFF',
    fontWeight: '700',
    letterSpacing: 1,
}
});

export default Profile;