import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useEffect, useState} from 'react';
import {MainContext} from '../context/MainContext';
import {url, tag} from '../vars/variables';

const doFetch = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    if (response.ok) {
      return json;
    } else {
      const message = json.error
        ? `${json.message}: ${json.error}`
        : json.message;
      throw new Error(message || response.statusText);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

// TODO: add necessary imports
// Get posts from backend.
const useMedia = (start = 0, limit = 20) => {
  const [mediaArray, setMediaArray] = useState({});
  const [loading, setLoading] = useState(false);
  const {update} = useContext(MainContext);
  useEffect(() => {
    const loadMedia = async (start = 0, limit = 15) => {
      setLoading(true);
      /*
      const response = await fetch(url + `media?start=${start}&limit=${limit}`);
      const json = await response.json();
      Promise.all(
        json.map(async (res) => {
          const response = await fetch(url + `media/${res.file_id}`);
          const qJson = await response.json();
          return qJson;
        })
      ).then((values) => {
        setMediaArray(values);
        setLoading(false);
      });
      */
      const resTagFiles = await taggedFiles(tag);
      const files = await Promise.all(resTagFiles.map  (async (item)=>{
        const response = await fetch(url + `media/${item.file_id}`);
          const qJson = await response.json();
          return qJson;
      })).then((values) => {
        setMediaArray(values);
        setLoading(false);
      });
    };
    loadMedia(0, 10).catch(console.error);
  }, [update]);

  const postMedia = async (value, token) => {
    console.log(value, token);
    setLoading(true);
    console.log('in postMedia', value);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-access-token': token,
      },
      body: value,
    };
    try {
      const response = await fetch(url + 'media', options);
      const json = await response.json();
      if (response.ok) {
        return json;
      } else {
        const message = json.error;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {mediaArray, postMedia, loading};
};

//Login fuctionality
const useLogin = () => {
  const postLogin = async (userCredentials) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCredentials),
    };
    const response = await doFetch(url + 'login', options);
    return response;
  };
  return {postLogin};
};

//Get user by token.
const useUser = () => {
  //User if they have logged in and just minimized app etc.
  const getUserByToken = async (token) => {
    const options = {
      method: 'GET',
      headers: {'x-access-token': token},
    };
    const response = await doFetch(url + 'users/user', options);
    return response;
  };

  //Create a new user.
  const postUser = async (data) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const response = await doFetch(url + 'users', options);
    return response;
  };

  //get user by ID 
  const getUserByID = async (token, id) => {
    const options = {
      method: 'GET',
      headers: {'x-access-token': token},
    };
    const response = await doFetch(url + `users/${id}`, options);
    return response;
  };

  //Check username
  const checkUsername = async (value) => {
    const response = doFetch(url + 'users/username/' + value);
    return response.available;
  };

  return {getUserByToken, postUser, checkUsername, getUserByID};
};

//Get profile picture
const userTags = async () => {
  const {avatar, setAvatar, user} = useContext(MainContext);
  const response = await doFetch(url + 'tags/avatar_' + user.user_id);
  setAvatar(response[0].filename);
};

//Add  tag to a post
const postTag = async (data, token) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(data),
  };
  return await doFetch(url + 'tags/', options);
};

//Fetch files with my tag
const taggedFiles = async (tag) => {
  return await doFetch(url + 'tags/' + tag);
};

export {useMedia, useUser, useLogin, userTags, postTag, taggedFiles};
