import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Image} from 'react-native';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';


const ListItem = ({singleMedia,navigation}) => {
  //const navigation = useNavigation();
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Single',
          {
            filename: singleMedia.thumbnails.w160,
            title: singleMedia.title,
          });
          /* Used with useNavigation Hook
          navigation.navigate('Single', {
            filename: singleMedia.thumbnails.w160,
            title: singleMedia.title,
          });*/
        }}
        style={{
          flex: 1,
          flexDirection: 'row',
          backgroundColor: '#cccccc',
          marginBottom: 10,
          marginTop: 0,
          margin: 'auto',
          height: 250,
        }}
      >
        
        <Image
          style={{flex: 1, margin: 10}}
          source={{
            uri: `https://media.mw.metropolia.fi/wbma/uploads/${singleMedia.thumbnails.w160}`,
          }}
        />

        <View
          style={{
            flex: 1,
            height: 200,
            padding: 10,
          }}
        >
          <Text style={{fontSize: 20, fontWeight: '500'}}>
            {singleMedia.title}
          </Text>
          <Text>{singleMedia.description}</Text>
        </View>
        
      </TouchableOpacity>
    </>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigate: PropTypes.object,
};

export default ListItem;
