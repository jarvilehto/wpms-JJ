import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {Button, Card, Input, Text} from '@rneui/base';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMedia} from '../hooks/ApiHooks';
import {MainContext} from '../context/MainContext';
import {useNavigation} from '@react-navigation/native';

const Upload = () => {
  const [image, setImage] = useState(
    'https://place-hold.it/300x200&text=Choose'
  );
  const [type, setType] = useState('');
  const [imageSelected, setImageSelected] = useState(false);
  const {postMedia} = useMedia();
  const {update, setUpdate} = useContext(MainContext);
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
  });

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
              autoCapitalize="none"
              placeholder="Title"
            />
          )}
          name="title"
        />
        {errors.title && <Text>This is required.</Text>}
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
              autoCapitalize="none"
              placeholder="Description"
            />
          )}
          name="description"
        />
        {errors.description && <Text>This is required.</Text>}

        <Button title="Choose image" onPress={pickImage} />
        <Button title="Upload" onPress={handleSubmit(onSubmit)} />
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
