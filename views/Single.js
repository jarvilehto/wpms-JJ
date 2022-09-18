import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, Text, View, Image} from 'react-native';
import {Card} from '@rneui/base';
import {Video, AVPlaybackStatus} from 'expo-av';

const Single = ({route}) => {
  const {filename, title, description, filetype, orig_filename} = route.params;
  console.log(filetype);
  console.log(filename);
  const video = React.useRef(null);
  const [status, setStatus] = useState({});

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
