import { bearerToken } from '@/lib/helper';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

export default function ImageFetch({ imgpath, tag, ...rest }) {
  const [imgSrc, setImgSrc] = useState(undefined);

  const getImageUrl = (url) => {
    const imageFetcher = axios.create({
      baseURL: axios.defaults.baseURL,
    });
    imageFetcher
      .get(url, {
        headers: {
          ...bearerToken(),
        },
        responseType: 'arraybuffer',
      })
      .then((response) => {
        let base64string = btoa(
          String.fromCharCode(...new Uint8Array(response.data)),
        );
        let contentType = response.headers['content-type'];
        return {
          base64string,
          contentType,
        };
      })
      .then((res) => {
        let imgsrc = 'data:' + res.contentType + ';base64,' + res.base64string;
        setImgSrc(imgsrc);
      });
  };

  useEffect(() => {
    const imgUrl = `/stream_image?path=${imgpath}`;
    getImageUrl(imgUrl);
  }, []);

  return <img src={imgSrc} alt={tag} {...rest} />;
}
