import React from 'react';
import {StyleSheet, SafeAreaView, Text, View, Image} from 'react-native';

const Single = ({route}) => {
  const {filename, title} = route.params;
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
});

export default Single;
