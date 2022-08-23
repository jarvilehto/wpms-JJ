import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import List from './components/List';

const App = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <List />
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

export default App;
