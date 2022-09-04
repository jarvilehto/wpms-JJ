import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Image} from 'react-native';
import PropTypes from 'prop-types';
import {Avatar, Divider, Button} from '@rneui/base';

const ListItem = ({singleMedia, navigation}) => {
  return (
    <View style={{overflow: 'hidden', maxHeight: 150, overflow: 'hidden'}}>
      <View style={{margin: 10, display: 'flex', flexDirection: 'row'}}>
        <View style={{marginRight: 5}}>
          <Avatar
            size={100}
            source={{
              uri: `https://media.mw.metropolia.fi/wbma/uploads/${singleMedia.thumbnails.w160}`,
            }}
          />
        </View>
        <View style={{flex: 2, overflow: 'hidden', maxHeight: 100}}>
          <Text style={{fontSize: 20, fontWeight: '500'}}>
            {singleMedia.title}
          </Text>
          <Text>{singleMedia.description}</Text>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Button
            title={'View'}
            buttonStyle={{
              borderRadius: 8,
              width: 80,
            }}
            onPress={() => {
              navigation.navigate('Single', {
                filename: singleMedia.thumbnails.w160,
                title: singleMedia.title,
                description: singleMedia.description,
              });
            }}
          />
        </View>
      </View>
      <Divider />
    </View>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigate: PropTypes.object,
};

export default ListItem;
