import React, {useContext, useEffect, useState} from 'react';
import {MainContext} from '../context/MainContext';

// TODO: add necessary imports
const url = 'https://media.mw.metropolia.fi/wbma/';
// Get posts from backend.
const useMedia = () => {
  const [mediaArray, setMediaArray] = useState({});

  useEffect(() => {
    const loadMedia = async () => {
      const response = await fetch(url + 'media');
      const json = await response.json();
      Promise.all(
        json.map(async (res) => {
          const response = await fetch(url + `media/${res.file_id}`);
          const qJson = await response.json();
          return qJson;
        })
      ).then((values) => {
        setMediaArray(values);
      });
    };

    loadMedia().catch(console.error);
  }, []);

  return {mediaArray};
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
    try {
      const response = await fetch(url + 'login', options);
      const json = await response.json();
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  return {postLogin};
};

//Get user by token.
const useUser = () => {
  //User if they have logged in and just minimized app etc.
  const getUserByToken = async (token) => {
    try {
      const options = {
        method: 'GET',
        headers: {'x-access-token': token},
      };
      const response = await fetch(url + 'users/user', options);
      const userData = response.json();
      if (response.ok) {
        return userData;
      } else {
        throw new Error(userData.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
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
    try {
      const response = await fetch(url + 'users', options);
      const json = await response.json();
      if(response.ok){
        return json;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  //Check username
  const checkUsername = async (value) => {
    try {
      const response = await fetch(url + 'users/username/'+value);
      const json = await response.json();
      if(response.ok){
        return json.available;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }


  return {getUserByToken, postUser, checkUsername};
};

//Get profile picture
const userTags = async () => {
  const {avatar, setAvatar, user} = useContext(MainContext);
  const response = await fetch (url+'tags/avatar_'+user.user_id);
  const json = await response.json();
  setAvatar(json[0].filename)
};



export {useMedia, useUser, useLogin, userTags};
