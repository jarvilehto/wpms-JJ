import React, {useContext} from 'react';
import { TurboModuleRegistry, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useUser} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../context/MainContext';
import {
  Button,
  Input,
  Text,
} from '@rneui/base';

const RegisterForm = () => {
  const {isLoggedIn, setIsLoggedIn, setFormToggle, formToggle} = useContext(MainContext);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      email: '',
      full_name: '',
    },
    mode: 'onBlur',
  });

  const onSubmit =  async (data) => {
    console.log(data)
    const logData = await useUser().postUser(data);
    console.log('logData', logData);
  };

  return (
    <View>
      <View style={{display: 'flex'}}>
      <Text style={{fontSize: 20, alignSelf: 'center', fontWeight:'600'}}>Register</Text>
        <Controller
          control={control}
          rules={{
            required: true,
            validate: async (value) => {
              if(!await useUser().checkUsername(value)){
                return('Username is already taken!')
              }
              return true;
            }
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder='Username'
              errorMessage={errors.username && errors.username.message}
            />
          )}
          name="username"
        />
      
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
            
            placeholder='Password'
            autoCapitalize='none'
          />
        )}
        name="password"
        
      />
      

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
              placeholder='email'
              keyboardType='email-address'
              textContentType='emailAddress'
            />
          )}
          name="email"
        />

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
              placeholder='Full name'
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
