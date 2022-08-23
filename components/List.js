import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Image} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import ListItem from './ListItem';
import {check} from 'prettier';

const url = 'https://media.mw.metropolia.fi/wbma/';

const List = () => {
  const [mediaArray, setMediaArray] = useState({});

  /*

  A couple of different tests before I found a working solution!

  useEffect(async () => {
    const response = await fetch(url);
    const json = await response.json();
    setMediaArray(json);
    console.log(json);
  }, 
  []);
  

  
  const loadMedia = async () => {
      const response = await fetch(url);
      const json = await response.json();
      setMediaArray(json);
      console.log(json);
  };
  useEffect(()=>{
    loadMedia();
  });
  */

  useEffect(() => {
    const loadMedia = async () => {
      const response = await fetch(url + 'media');
      const json = await response.json();
      Promise.all(
        json.map(async (res) => {
          const response = await fetch(url + `media/${res.file_id}`);
          const qJson = await response.json();
          return qJson;
        })
      ).then((values) => {
        console.log(values);
        setMediaArray(values);
      });
    };

    loadMedia().catch(console.error);
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={mediaArray}
          renderItem={({item}) => <ListItem singleMedia={item} />}
        />
      </SafeAreaView>
      <StatusBar style="auto" />
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
