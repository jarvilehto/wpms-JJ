import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Image} from 'react-native';
import PropTypes from 'prop-types';
import {Heart} from 'react-native-feather';

function ListItem({singleMedia}) {
  return (
    <>
      <TouchableOpacity style={styles.post}>
        <Image
          style={styles.postImage}
          source={{
            uri: `https://media.mw.metropolia.fi/wbma/uploads/${singleMedia.thumbnails.w160}`,
          }}
        />
        <View style={styles.postDivider}>
          <Text style={styles.postTitle}>{singleMedia.title}</Text>
          <Text style={styles.postText}>{singleMedia.description}</Text>
          <Heart
            stroke="#ffff"
            width={28}
            height={28}
            style={styles.heartIcon}
          />
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  post: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#001D3D',
    marginBottom: 5,
    margin: 'auto',
    maxHeight: 170,
    margin: 10,
    borderRadius: 10,
  },
  postImage: {
    flex: 0.8,
    margin: 10,
    borderRadius: 5,
    marginRight: 5,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  postDivider: {
    flex: 1,
    position: 'relative',
    height: 200,
    padding: 10,
  },
  postTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFC300',
    marginBottom: 5,
  },
  postText: {
    color: 'white',
    fontSize: 18,
  },
  heartIcon: {
    bottom: 40,
    right: 15,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ListItem;
