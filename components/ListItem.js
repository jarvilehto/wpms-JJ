import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Image} from 'react-native';
import PropTypes from 'prop-types';
import {Avatar, Button, ListItem as RNEListItem} from '@rneui/base';
import {useNavigation} from '@react-navigation/native';
import {useMedia} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListItem = ({singleMedia, myFilesOnly}) => {
  const {deleteMedia} = useMedia();

  const delMedia = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const response = await deleteMedia(singleMedia.file_id, token)
    console.log(response);
  }

  const nav = useNavigation();
  return (
    <RNEListItem
      bottomDivider
    >
      <Avatar
        size="large"
        source={{
          uri: `https://media.mw.metropolia.fi/wbma/uploads/${singleMedia.thumbnails.w160}`,
        }}
      ></Avatar>
      <RNEListItem.Content>
        <RNEListItem.Title numberOfLines={1} h4>
          {singleMedia.title}
        </RNEListItem.Title>
        <RNEListItem.Subtitle numberOfLines={1}>
          {singleMedia.description}
        </RNEListItem.Subtitle>
      </RNEListItem.Content>
      <View>
      </View>
      <Button title={'View'}
      onPress={() => {
        nav.navigate('Single', {
          filename: singleMedia.thumbnails.w160,
          title: singleMedia.title,
          description: singleMedia.description,
          filetype: singleMedia.media_type,
          orig_filename: singleMedia.filename,
          user_id: singleMedia.user_id,
        });
      }}
      />
       {myFilesOnly && (
        <View
          style={{
            flex: 1,
            margin: 5,
          }}
        >
          <Button
            onPress={() => nav.navigate('Modify', {file: singleMedia})}
          >
            Modify
          </Button>
          <Button onPress={() => delMedia(singleMedia.file_id)}>
            Delete
          </Button>
        </View>
      )}
    </RNEListItem>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigate: PropTypes.object,
};

export default ListItem;
