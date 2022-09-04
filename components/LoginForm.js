import React, {useContext} from 'react';
import {View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useLogin, userTags} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../context/MainContext';
import {
  Button,
  Input,
  Text,
} from '@rneui/base';

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
    await AsyncStorage.setItem('userToken', logData.token);
    setUser(logData.user);
    setIsLoggedIn(true);
  };

  return (
    <View>
      <View style={{display: 'flex'}}>
        <Text style={{fontSize: 20, alignSelf: 'center', fontWeight:'600'}}>Login</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Username"
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
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Password"
            autoCapitalize="none"
          />
        )}
        name="password"
      />

      <Button title="Sign in!" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default LoginForm;
