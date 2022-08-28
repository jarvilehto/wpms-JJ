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
        setMediaArray(values);
      });
    };

    loadMedia().catch(console.error);
  }, []);

  return {mediaArray};
};

/* Used for troubleshooting
const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const loadMedia = async () => {
    try {
      const response = await fetch(url + 'media?limit=5');
      const json = await response.json();
      const allMediaData = json.map(async (mediaItem) => {
        const response = await fetch(url + 'media/' + mediaItem.file_id);
        return await response.json();
      });
      setMediaArray(await Promise.all(allMediaData));
    } catch (error) {
      console.log('media fetch failed', error);
      // TODO: notify user?
    }
  };
  useEffect(() => {
    loadMedia();
  }, []);
  return {mediaArray};
};
*/

const useUser = () => {
  // TODO: later
};

export {useMedia, useUser};
