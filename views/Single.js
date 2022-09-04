
import React from 'react';
import {StyleSheet, SafeAreaView, Text, View, Image} from 'react-native';
import {Card} from '@rneui/base';


const Single = ({route}) => {
  const {filename, title, description} = route.params;
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
  /*
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{
          uri: `https://media.mw.metropolia.fi/wbma/uploads/${filename}`,
        }}
        style={{
          width: 200,
          height: 200,
        }}
      />
      <Text>{title}</Text>
    </SafeAreaView>
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
