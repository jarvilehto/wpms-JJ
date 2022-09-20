import {Image} from '@rneui/base';
import React, {useContext} from 'react';
import {FlatList, Text, View} from 'react-native';
import ListItem from './ListItem';
import {useMedia} from '../hooks/ApiHooks';
import {MainContext} from '../context/MainContext';

const List = ({myFilesOnly = false}) => {
  const {mediaArray} = useMedia(myFilesOnly);
  return (
    <>
      <FlatList
        data={mediaArray}
        renderItem={
          ({item}) => <ListItem
            singleMedia={item}
            myFilesOnly={myFilesOnly}
          />
        }
      />
    </>
  );
};

export default List;
