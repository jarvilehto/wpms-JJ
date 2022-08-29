import React, {useContext} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../context/MainContext';

const Login = ({navigation}) => {
  // props is needed for navigation
  const [isLoggedIn, setIsLoggedIn] = useContext(MainContext);
  console.log('login', isLoggedIn)
  const logIn = () => {
    setIsLoggedIn(true);
  };
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button title="Sign in!" onPress={logIn} />
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
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
