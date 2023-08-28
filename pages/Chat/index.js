import React, { useState, useLayoutEffect, useCallback, useEffect } from 'react';
// import { Text, View } from 'react-native';
import { GiftedChat, Avatar } from 'react-native-gifted-chat';
// import { collection, addDoc, orderBy, query, onSnapshot } from 'firebase/firestore';
// import { database } from '../../config/index';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useDispatch, useSelector } from 'react-redux';
// import {ApplicationActions} from '@actions';

const Chat = ({route}) => {
  const {order_id,profile} = route.params
  console.log('profile',profile)
  // const [order_id, setOrder_id] = useState(null);
  const [user_id, setUserId] = useState(null);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  // const [count, setCount] = useState(0);
  const [messages, setMessages] = useState([]);
  // const [newMessage, setNewMessage] = useState('');
  const [userAvatar, setUserAvatar] = useState(null);
  // let userId;
  // let userName;
  // let userPhone;

  // const login = useSelector(state => state.auth.login);
  // useEffect (() => {
  //   const userId = login.userId._id;
  //   const userName = login.userId.name;
  //   const userPhone = login.userId.phone;

  //   // setOrder_id(orderChat);
  //   setName(userId);
  //   setUserId(userName);
  //   setPhone(userPhone);
  // })
  // if (login) {

  // }

  // useLayoutEffect(() => {
  //   const collectionRef = collection(database, `kilapin-${order_id}`);
  //   const q = query(collectionRef, orderBy('createdAt', 'desc'));

  //   const unsubscribe = onSnapshot(q, querySnapshot => {
  //     setMessages(
  //       querySnapshot.docs.map(doc => ({
  //         order_id: doc.data().order_id,
  //         _id: doc.data()._id,
  //         createdAt: doc.data().createdAt.toDate(),
  //         user: doc.data().user,
  //         text: doc.data().text
  //       }))
  //     );
  //   });

  //   return unsubscribe;
  // }, [order_id, count]);

//   const reloadUseLayoutEffect = () => {
//     setTimeout(() => {
//       setCount(count + 1);
//     }, 1000);
//   };

  // useEffect(() => {
  //   reloadUseLayoutEffect();
  //   setUserAvatar('https://i.pravatar.cc/300');
  // }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

    // const { _id, createdAt, text, user } = messages[0];    
    // if (order_id) {
    //   addDoc(collection(database, `kilapin-${order_id}`), {
    //     order_id,
    //     _id,
    //     createdAt,
    //     text,
    //     user
    //   });
    // }
  }, []);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={false}
      showUserAvatar={false}
      onSend={messages => onSend(messages)}
      messagesContainerStyle={{
          backgroundColor: '#fff'
      }}
      textInputStyle={{
          backgroundColor: '#fff',
          borderRadius: 20,
      }}
      renderAvatar={(props) => {
          return <Avatar {...props} source={userAvatar} />;
      }}
      user ={{
          _id: user_id,
          order_id: order_id,
          phone: phone,
          name: name,
      }}
    />
  );
}

export default Chat;