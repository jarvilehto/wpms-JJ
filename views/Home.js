import  React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import List from '../components/List'

const Home = ({navigation}) => {
  return (
    <>
      <SafeAreaView style={styles.container}>
      <List navigation={navigation}></List>
      </SafeAreaView>
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


export default Home;
