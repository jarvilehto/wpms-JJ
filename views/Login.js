import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../context/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLogin, useUser} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { Card, Text} from '@rneui/base';

const Login = () => {
  const {setUser, isLoggedIn, user, setIsLoggedIn, formToggle, setFormToggle} = useContext(MainContext);
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
    <TouchableOpacity
      style={{flex: 1}}
      activeOpacity={1}
      onPress={() => Keyboard.dismiss()}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        style={styles.container}
      >
        <View style={styles.appTitle}>
          <Text>Random app</Text>
        </View>
        <View style={styles.form}>
          {formToggle ? (
            <Card>
              <RegisterForm />
            </Card>
          ) : (
            <View>
            <Card>
              <LoginForm />
            </Card>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  appTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    flex: 8,
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
