import React from 'react';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {Button, Card, Input, Text} from '@rneui/base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMedia} from '../hooks/ApiHooks';
import {useNavigation} from '@react-navigation/native';

const Modify = ({route}) => {
  const {file} = route.params;
  const navigation = useNavigation();
  const {putMedia} = useMedia();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      title: file.title,
      description: file.description,
    },
  });

  const onSubmit = async (data) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await putMedia(data, token, file.file_id);
      console.log(response);
      Alert.alert('File', 'Modified', [
        {
          text: 'Ok',
          onPress: () => {
            navigation.navigate('My Files');
          },
        },
      ]);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <ScrollView>
      <Card>
        <Controller
          control={control}
          rules={{
            required: true,
            minLength: 4,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              placeholder="Title"
              errorMessage={errors.title && 'Field is required'}
            />
          )}
          name="title"
        />
        <Controller
          control={control}
          rules={{
            required: true,
            minLength: 1,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              placeholder="Description"
              errorMessage={errors.description && 'Field is required'}
            />
          )}
          name="description"
        />

        <Button title="Save Changes" onPress={handleSubmit(onSubmit)} />
      </Card>
    </ScrollView>
  );
};

export default Modify;
