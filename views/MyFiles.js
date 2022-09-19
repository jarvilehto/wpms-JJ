import React, {useContext} from 'react';
import List from '../components/List';
import {PropTypes} from 'prop-types';
import {View} from 'react-native';

const MyFiles = ({navigation}) => {
    return(
    <List navigation={navigation} myFilesOnly="true"></List>
    );
};

MyFiles.protoTypes = {
    navigation: PropTypes.object,
}

export default MyFiles;
