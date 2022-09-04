import {Image} from '@rneui/base';
import React from 'react';
import {FlatList, Text, View} from 'react-native';
import ListItem from './ListItem';
import {useMedia} from '../hooks/ApiHooks';

const List = ({navigation}) => {
  const {mediaArray} = useMedia();
  return (
    <>
      <FlatList
        data={mediaArray}
        renderItem={
          ({item}) => <ListItem
            navigation={navigation.navigation}
            singleMedia={item}
          />
        }
      />
    </>
  );
};

export default List;
