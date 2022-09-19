import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, Text, View, Image} from 'react-native';
import {Card} from '@rneui/base';
import {Video, AVPlaybackStatus} from 'expo-av';
import {useUser} from '../hooks/ApiHooks'
import AsyncStorage from '@react-native-async-storage/async-storage';



const Single = ({route}) => {
  const {filename, title, description, filetype, orig_filename, user_id} = route.params;
  const video = React.useRef(null);
  const [status, setStatus] = useState({});
  const [poster, setPoster] = useState({username: 'Loading...'})

  const getPostInfo = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const posterData = await useUser().getUserByID(token, user_id);
      setPoster(posterData);
      
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=>{
    getPostInfo();
  }, [])

  if (filetype == 'image') {
    return (
      <View>
        <Card>
          <View>
            <Image
              style={{width: '100%', height: 350}}
              resizeMode="contain"
              source={{
                uri: `https://media.mw.metropolia.fi/wbma/uploads/${filename}`,
              }}
            />
          </View>
          <View
            style={{display: 'flex', alignItems: 'flex-start', marginTop: 40}}
          >
            <Card.Title>{title}</Card.Title>
            <Text>{description}</Text>
            <Text>Post created by: {poster.username}</Text>
          </View>
        </Card>
      </View>
    );
  }

  if (filetype == 'video') {
    console.log(orig_filename);
    return (
      <View>
        <Card>
          <View>
            <Video
              ref={video}
              style={{width:'100%', height:350}}
              source={{
                uri: `https://media.mw.metropolia.fi/wbma/uploads/${orig_filename}`,
              }}
              useNativeControls
              resizeMode="contain"
              isLooping
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            />
          </View>
          <View
            style={{display: 'flex', alignItems: 'flex-start', marginTop: 40}}
          >
            <Card.Title>{title}</Card.Title>
            <Text>{description}</Text>
            <Text>Post created by: {poster.username}</Text>
          </View>
        </Card>
      </View>
    );
  }
  /*
  return(
    <View>
      <Card>
        <View >
          <Image
            style={{width:'100%', height:350}}
            resizeMode="contain"
            source={{uri:`https://media.mw.metropolia.fi/wbma/uploads/${filename}` }}
          />
        </View>
        <View style={{display:'flex', alignItems:'flex-start', marginTop:40}}>
        <Card.Title>{title}</Card.Title>
        <Text>{description}</Text>
        </View>
      </Card>
    </View>
  );
  */
};

/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
});
*/

export default Single;
