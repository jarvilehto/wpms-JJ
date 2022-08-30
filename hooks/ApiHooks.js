import React, {useEffect, useState} from 'react';

// TODO: add necessary imports
const url = 'https://media.mw.metropolia.fi/wbma/';
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
      return json.token;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  return {postLogin};
};

const useUser = () => {
  const getUserByToken = async (token) => {
    try {
      const options = {
        method: 'GET',
        headers: {'x-access-token': token},
      };
      const response = await fetch(url + 'users/user', options);
      const userData = response.json();
      if (response.ok) {
        return response.ok;
      } else {
        throw new Error(userData.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

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

  return {getUserByToken, postUser};
};

export {useMedia, useUser, useLogin};
