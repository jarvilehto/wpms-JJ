import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Image} from 'react-native';
import PropTypes from 'prop-types';
import {Avatar, Button, ListItem as RNEListItem} from '@rneui/base';

const ListItem = ({singleMedia, navigation}) => {
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
        navigation.navigate('Single', {
          filename: singleMedia.thumbnails.w160,
          title: singleMedia.title,
          description: singleMedia.description,
          filetype: singleMedia.media_type,
          orig_filename: singleMedia.filename,
        });
      }}
      ></Button>
    </RNEListItem>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigate: PropTypes.object,
};

export default ListItem;
