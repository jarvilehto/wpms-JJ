import React, {useEffect, useState} from 'react';

// TODO: add necessary imports
const url = 'http://media.mw.metropolia.fi/wbma/';
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
        console.log(values);
        setMediaArray(values);
      });
    };

    loadMedia().catch(console.error);
  }, []);

  return {mediaArray};
};

export {useMedia};
