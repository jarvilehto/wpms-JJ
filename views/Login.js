import React, {useContext, useEffect} from 'react';
import {StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../context/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLogin, useUser} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
  const {setUser, isLoggedIn, user, setIsLoggedIn} = useContext(MainContext);

  const checkToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    const auth = await useUser().getUserByToken(userToken);
    console.log('auth', auth);
    setUser(auth);
    setIsLoggedIn(true);
  };
  useEffect(() => {
    checkToken();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text>Login</Text>
        <LoginForm />
      </View>
      <View style={styles.box}>
        <Text>Register</Text>
        <RegisterForm />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    margin: 20,
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
