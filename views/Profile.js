import React, {useContext} from 'react';
import {StyleSheet, SafeAreaView, Text, Button, Image} from 'react-native';
import {MainContext} from '../context/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userTags} from '../hooks/ApiHooks';

// not using props for navigation. Hooks are better. Period.
const Profile = () => {
  userTags();
  const {avatar, setAvatar, setUser, isLoggedIn, user, setIsLoggedIn} = useContext(MainContext);
  console.log('Profile', isLoggedIn);
  console.log('user',user);
  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.clear();
  };
  return (
    <SafeAreaView style={styles.container}>
      <Image
          style={{ width:200, height:200}}
          source={{
            uri: `https://media.mw.metropolia.fi/wbma/uploads/${avatar}`,
          }}
        />

      <Text>Username: {user.username}</Text>
      <Text>Email: {user.email}</Text>
      <Text>userID: {user.user_id}</Text>
      <Button title={'Logout'} onPress={logout} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
});

export default Profile;
