import React, {useContext} from 'react';
import {StyleSheet, ActivityIndicator, Image, View} from 'react-native';
import {MainContext} from '../context/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userTags} from '../hooks/ApiHooks';
import {Card, Text, Button, ListItem, Avatar} from '@rneui/base';

// not using props for navigation. Hooks are better. Period.
const Profile = () => {
  userTags();
  const {avatar, setAvatar, setUser, isLoggedIn, user, setIsLoggedIn} =
    useContext(MainContext);
  console.log('Profile', isLoggedIn);
  console.log('user', user);
  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.clear();
  };

  return (
    <Card>
      <Card.Title>
        <Text h1> {user.username} </Text>
      </Card.Title>
      <Card.Image
        style={styles.image}
        PlaceholderContent={<ActivityIndicator />}
        source={{
          uri: `https://media.mw.metropolia.fi/wbma/uploads/${avatar}`,
        }}
      />
      <ListItem>
        <Avatar icon={{name: 'email', color: 'black'}} />
        <Text>{user.email}</Text>
      </ListItem>
      <ListItem>
        <Avatar icon={{name: 'user', type: 'font-awesome', color: 'black'}} />
        <Text>{user.full_name}</Text>
      </ListItem>
      <Button title={'Logout'} onPress={logout} />
    </Card>
  );
};

const styles = StyleSheet.create({
  image: {width: '100%', height: undefined, aspectRatio: 1},
});

export default Profile;
