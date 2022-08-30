import React, {useContext} from 'react';
import {Text, View, TextInput, Button, Alert, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useLogin} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../context/MainContext';

const LoginForm = () => {
  const {setUser, isLoggedIn, user, setIsLoggedIn} = useContext(MainContext);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    console.log('logging in', data);
    const logData = await useLogin().postLogin(data);
    console.log('logData', logData.token);
    setUser(logData);
    await AsyncStorage.setItem('userToken', logData.token);
    setIsLoggedIn(true);
  };

  return (
    <View>
      <View style={{marginBottom: 20, marginTop: 20, width: 100}}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
              placeholder='Username'
            />
          )}
          name="username"
        />
      </View>
      {errors.firstName && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          maxLength: 20,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
            placeholder='Password'
            autoCapitalize='none'
          />
        )}
        name="password"
      />

      <Button title="Login" onPress={handleSubmit(onSubmit)} />
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
  input: {
    width: 150,
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
});

export default LoginForm;
