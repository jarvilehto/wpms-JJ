import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';
import ListItem from './ListItem';
import ApiHooks, {useMedia} from '../hooks/ApiHooks';

const url = 'https://media.mw.metropolia.fi/wbma/';

const List = () => {
  const {mediaArray} = useMedia();
  return (
    <>
      <View style={[styles.container]}>
        <FlatList
          data={mediaArray}
          style={styles.bgColor}
          renderItem={({item}) => <ListItem singleMedia={item} />}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  bgColor: {
    //backgroundColor: '#a2a2fdff',
  },
});

export default List;
