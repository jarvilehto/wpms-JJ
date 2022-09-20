import React, {useCallback, useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {Button, Card, Input, Text} from '@rneui/base';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {postTag, useMedia} from '../hooks/ApiHooks';
import {MainContext} from '../context/MainContext';
import {useNavigation} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import {tag} from '../vars/variables';

const Upload = () => {
  const [image, setImage] = useState(
    'https://place-hold.it/300x200&text=Choose'
  );
  const [type, setType] = useState('');
  const [imageSelected, setImageSelected] = useState(false);
  const {postMedia, loading} = useMedia();
  const {update, setUpdate} = useContext(MainContext);
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
  });
  //: Insane tech
  useFocusEffect(
    useCallback(() => {
      return () => reset();
    }, [])
  );

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.5,
    });
    if (!result.cancelled) {
      setImage(result.uri);
      setImageSelected(true);
      setType(result.type);
    }
  };

  const reset = () => {
    setImage('https://place-hold.it/300x200&text=Choose');
    setImageSelected(false);
    setValue('title', '');
    setValue('description', '');
  };

  const onSubmit = async (data) => {
    console.log('onSubmit');
    if (!imageSelected) {
      Alert.alert('You have to choose a file!');
    }
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    const filename = image.split('/').pop();
    let fileExtension = filename.split('.').pop();
    fileExtension = fileExtension === 'jpg' ? 'jpeg' : fileExtension;
    formData.append('file', {
      uri: image,
      name: filename,
      type: type + '/' + fileExtension,
    });
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await postMedia(formData, token);
      console.log(response);
      console.log(tag);
      await postTag(
        {
          file_id: response.file_id,
          tag: tag,
        },
        token
      );

      Alert.alert('File', 'uploaded', [
        {
          text: 'Ok',
          onPress: () => {
            setUpdate(update + 1);
            navigation.navigate('Home');
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
        <Card.Image
          source={{uri: image}}
          style={styles.image}
          onPress={pickImage}
        ></Card.Image>
        <Button title="Choose image" onPress={pickImage} />
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
        <Button title="Reset" onPress={reset} />
        <Button
          disabled={!imageSelected}
          title="Upload"
          onPress={handleSubmit(onSubmit)}
        />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    marginBottom: 15,
  },
});

Upload.propTypes = {
  navigation: PropTypes.object,
};

export default Upload;
