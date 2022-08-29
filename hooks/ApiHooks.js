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
      console.log(options.body);
      const response = await fetch(url + 'login', options);
      const json = await response.json();
      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  return {postLogin};
};

const useUser = () => {
  // TODO: later
};

export {useMedia, useUser, useLogin};
