import { View, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Home, Chat, ChatOn, Profile, ProfileOn } from '../../assets'
import { LinearGradient } from 'expo-linear-gradient';

const Icon = ({label, focus}) => {
  switch(label){
    case 'Profile':
      return focus ? <View style={{backgroundColor: '#fff', paddingTop: '20%', paddingBottom: '20%', paddingLeft: '30%', paddingRight: '5%', justifyContent: 'center', alignItems: 'center'}}><ProfileOn /></View> : <View style={{backgroundColor: '#fff', paddingTop: '20%', paddingBottom: '20%', paddingLeft: '30%', paddingRight: '5%', justifyContent: 'center', alignItems: 'center'}}><Profile/></View>
    case 'Inbox':
      return focus ? <View style={{backgroundColor: '#fff', paddingTop: '20%', paddingBottom: '20%', paddingLeft: '5%', paddingRight: '30%', justifyContent: 'center', alignItems: 'center',}}><ChatOn /></View> : <View style={{backgroundColor: '#fff', paddingTop: '20%', paddingBottom: '20%', paddingLeft: '5%', paddingRight: '30%', justifyContent: 'center', alignItems: 'center'}}><Chat /></View>
    default:
      return <LinearGradient colors={['#DA7DE1', '#DD7DE1' ]} style={styles.homebackground} > 
      <Home/> 
      </LinearGradient>
  }
}

const BottomNavigator = ({ state, descriptors, navigation }) => {
  return (
    <View>
      <View style={{backgroundColor: '#F4F2FF'}}>
      <View style={{ flexDirection: 'row', backgroundColor: '#fff', paddingBottom: '0.2%', paddingTop: '0.2%', paddingRight: '1.5%', paddingLeft: '1.5%', marginRight:'20%', marginLeft:'20%', marginBottom: '5%', borderRadius: 200,  justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
    <View style={{ flexDirection: 'row', backgroundColor: '#fff', paddingLeft:30, paddingRight:30, paddingBottom: 13, paddingTop: 13, marginRight:'5%', marginLeft:'5%', borderRadius: 200,  justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <Icon label={label} focus={isFocused}/>
          </TouchableOpacity>
        );
      })}
    </View>
    </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homebackground: {
    backgroundColor: '#5865F2',
    padding: 10,
    borderRadius: 200,
  },
  viewpad: {
    padding: 20, backgroundColor: '#FFF'
  },
})

export default BottomNavigator