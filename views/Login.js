import React, {useContext, useEffect} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../context/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLogin, useUser} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
  // props is needed for navigation
  const [isLoggedIn, setIsLoggedIn] = useContext(MainContext);
  console.log('login', isLoggedIn);

  const checkToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('token', userToken);
    const auth = await useUser().getUserByToken(userToken);
    console.log('auth', auth);
    if (auth) {
      setIsLoggedIn(true);
    }
    /*
    if (userToken === 'abc') {
      setIsLoggedIn(true);
    }*/
  };
  useEffect(() => {
    checkToken();
  }, []);

  /*
  const logIn = async () => {
    console.log('logging in');
    const data = {password: 'Ankkalinna2', username: 'juho'};
    const logData = await useLogin().postLogin(data);
    await AsyncStorage.setItem('userToken', logData);
    setIsLoggedIn(true);
  };
  */

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
    margin:20,
  }
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
