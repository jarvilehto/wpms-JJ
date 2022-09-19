import React, {useContext} from 'react';
import {FlatList, Text, View} from 'react-native';
import ListItem from './ListItem';
import {useMedia} from '../hooks/ApiHooks';
import {MainContext} from '../context/MainContext';
import List from '../components/List';
import {checkPropTypes} from 'prop-types';

const MyFiles = ({navigation}) => {
    return <List navigation={navigation}
    myfilesOnly="true" />
};

MyFiles.protoTypes = {
    navigation: checkPropTypes.object,
}

export default MyFiles;
