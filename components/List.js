import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import ListItem from './ListItem';
import ApiHooks, {useMedia} from '../hooks/ApiHooks';

const url = 'https://media.mw.metropolia.fi/wbma/';

const List = () => {
  const {mediaArray} = useMedia();
  return (
    <>
      <FlatList
        data={mediaArray}
        renderItem={({item}) => <ListItem singleMedia={item} />}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
});

export default List;
