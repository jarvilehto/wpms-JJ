import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import List from './components/List';
import {Edit} from 'react-native-feather';
import {Aperture} from 'react-native-feather';
import {Menu} from 'react-native-feather';

const App = () => {
  return (
    <>
      <SafeAreaView style={[styles.container, styles.bgColor]}>
        <View style={[styles.container, styles.bgColor]}>
          <View style={[navigation.panel, styles.shadows]}>
            <Menu
              stroke="#ffff"
              width={28}
              height={28}
              strokeWidth={2.5}
              style={styles.shadows}
            />

            <Aperture
              stroke="#ffff"
              width={28}
              height={28}
              strokeWidth={2.5}
              style={styles.shadows}
            />

            <Edit
              stroke="#ffff"
              width={28}
              height={28}
              strokeWidth={2.5}
              style={styles.shadows}
            />
          </View>
          <View style={[styles.bgColor, header.panel, styles.shadows]}>
            <ImageBackground
              source={require('./assets/dive.png')}
              resizeMode="cover"
              imageStyle={header.bgProperties}
              style={[header.bgImage, styles.shadows]}
            >
              <View style={header.txtContainer}>
                <Text style={[header.txtProperties, styles.shadows]}>
                  Currents
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={[styles.bgColor, styles.userPosts]}>
            <List />
          </View>
        </View>
      </SafeAreaView>
      <StatusBar style="auto" />
    </>
  );
};

const navigation = StyleSheet.create({
  panel: {
    height: 65,
    backgroundColor: '#000814',
    marginBottom: 5,
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const header = StyleSheet.create({
  panel: {
    position: 'relative',
    margin: 15,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    minHeight: 180,
    backgroundColor: '#001D3D',
    borderRadius: 20,
  },
  bgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  bgProperties: {
    borderRadius: 20,
    borderBottomLeftRadius: 400,
  },
  txtContainer: {
    backgroundColor: '#FFC300',
    position: 'absolute',
    width: '40%',
    bottom: 15,
  },
  txtProperties: {
    fontSize: 32,
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
  },
  bgColor: {
    backgroundColor: '#e8ecff',
  },
  userPosts: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  shadows: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
});

export default App;
