import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { FormExample,BeforePhoto, AfterPhoto, Camera, Chat, Done, GetStarted, Home, Inbox, Login, NavOne, Photo, Profile, Settings, SignUp, Splash } from '../pages';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigator } from '../components';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
    return (
        <Tab.Navigator initialRouteName="Home" tabBar={props => <BottomNavigator {...props}/>}>
            <Stack.Screen name="Inbox" component={Inbox} options={{headerShown: false, gestureEnabled: false}}/>
            <Tab.Screen name="Home" component={Home} options={{headerShown: false}}/>
            <Tab.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
        </Tab.Navigator>
    )
}

const Router = () => {
    return (
    <Stack.Navigator>
         <Stack.Screen name="MainApp" component={MainApp} options={{headerShown: false}}/>
        <Stack.Screen name="Splash" component={Splash} options={{headerShown: false}} />
        <Stack.Screen name="Camera" component={Camera} options={{headerShown: false}}/>
        <Stack.Screen name="Done" component={Done} options={{headerShown: false}}/>
        <Tab.Screen name="Chat" component={Chat} options={{headerShown: false}}/>
        <Stack.Screen name="GetStarted" component={GetStarted} options={{headerShown: false}}/>
        <Stack.Screen name="NavOne" component={NavOne} options={{headerShown: false}}/>
       
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
        <Stack.Screen name="Photo" component={Photo} options={{headerShown: false}}/>
        <Stack.Screen name="Settings" component={Settings} options={{headerShown: false}}/>
        <Stack.Screen name="BeforePhoto" component={BeforePhoto} options={{headerShown: false}}/>
        <Stack.Screen name="AfterPhoto" component={AfterPhoto} options={{headerShown: false}}/>
        <Stack.Screen name="FormExample" component={FormExample} options={{headerShown: false}}/>
    </Stack.Navigator>
    )
}

export default Router;