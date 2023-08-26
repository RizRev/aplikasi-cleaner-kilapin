import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

const Inbox = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => {
        setUsers(json);
        setFilteredUsers(json);
      })
      .catch(error => console.error(error));
  }, []);

  const handlePressUser = user => {
    navigation.navigate('Chat', { user });
  };

  const handleSearch = text => {
    const filtered = users.filter(user => {
      const name = user.name.toLowerCase();
      const searchText = text.toLowerCase();
      return name.includes(searchText);
    });
    setFilteredUsers(filtered);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Chat')}
    >
      <View
        style={styles.avatar}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.lastMessage}>
          See last message from {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
        <LinearGradient colors={['#FFFFFF', '#F5F2FF']} style={styles.BottomGradient} start={{x:0, y:0.0}} end={{x: 0, y: 0.81}}></LinearGradient>
      <View style={styles.topcontainer}>
        <Text style={styles.inboxHeader}      onPress={() => navigation.navigate('Chat')}>Inbox </Text>
        <View style={styles.topchatsearch}>
          <TextInput
            style={styles.searchInput}
            placeholder="Cari berdasarkan nama"
            onChangeText={text => handleSearch(text)}
          />
        </View>
      </View>
      <View style={{height: '80%'}}>
      <FlatList
        data={filteredUsers}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  topcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  inboxHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: '6%',
  },
  topchatsearch: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '5%',
    marginBottom: '2%',
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    padding: 5,
    width: '90%'
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    fontFamily: 'Ubuntu-Bold',
  },
  item: {
    flexDirection: 'row',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 0.8,
    borderBottomColor: '#EBEBEB',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: '#313131'
  },
  info: {
    flex: 1,
    marginLeft: '2%',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Ubuntu-Bold'
  },
  lastMessage: {
    color: '#666',
    fontFamily: 'Ubuntu-Bold'
  },
  BottomGradient:{
    width: '250%',
    height: '20%',
    position:'absolute',
    bottom: 0,

},
BottomMenu: {
    bottom: 0,
    position: 'absolute',
    marginBottom: 15,
    alignSelf: 'center'
},

});

export default Inbox;
