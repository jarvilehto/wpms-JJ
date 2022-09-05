import React, {useContext} from 'react';
import {Alert, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useUser} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../context/MainContext';
import {Button, Input, Text} from '@rneui/base';

const RegisterForm = () => {
  const {isLoggedIn, setIsLoggedIn, setFormToggle, formToggle} =
    useContext(MainContext);
  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      confirmPassword:'',
      email: '',
      full_name: '',
    },
    mode: 'onBlur',
  });

  //rewrite this bit!
  const onSubmit = async (data) => {
    console.log(data);
    try {
      delete data.confirmPassword;
      const logData = await useUser().postUser(data);
      if(logData){
        Alert.alert('Success', 'Account has been created');
        setFormToggle(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <View style={{display: 'flex'}}>
        <Text style={{fontSize: 20, alignSelf: 'center', fontWeight: '600'}}>
          Register
        </Text>
        <Controller
          control={control}
          rules={{
            required: {value: true, message: 'Username is required!'},
            validate: async (value) => {
              if (!(await useUser().checkUsername(value))) {
                return 'Username is already taken!';
              }
              return true;
            },
            minLength: {
              value: 3,
              message: 'Username has to be at least 3 characters!',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Username"
              errorMessage={errors.username && errors.username.message}
            />
          )}
          name="username"
        />

        {errors.firstName && <Text>This is required.</Text>}

        <Controller
          control={control}
          rules={{
            required: {value: true, message: 'Password is required!'},
            minLength: {
              value: 5,
              message: 'Password has to be at least 5 characters',
            },
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

        <Controller
          control={control}
          rules={{
            required: {value: true, message: 'This field is required!'},
            validate: (value) => {
              const {password} = getValues();
              if(!value == password){
                return "Passwords dont match";
              }
              return true;
            }
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Confirm Password"
              autoCapitalize="none"
            />
          )}
          name="confirmPassword"
        />

        <Controller
          control={control}
          rules={{
            required: {value: true, message: 'Email is required!'},
            pattern: {
              value:
                /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
              message: 'Not an email address!',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="email"
              keyboardType="email-address"
              textContentType="emailAddress"
            />
          )}
          name="email"
        />

        <Controller
          control={control}
          rules={{
            required: true,
            minLength: {
              value: 3,
              message: 'Name has to be at least 3 characters.',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Full name"
            />
          )}
          name="full_name"
        />
      </View>
      <Button title="Register" onPress={handleSubmit(onSubmit)} />
      <Button
        title="Log In!"
        style={{marginTop: 15}}
        onPress={() => setFormToggle(!formToggle)}
        selectedIndex={formToggle ? 1 : 0}
      />
    </View>
  );
};
/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent:'center',
    alignItems:'center',
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
*/

export default RegisterForm;
