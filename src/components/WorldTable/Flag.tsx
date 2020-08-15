import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default ({ alt, src }: { alt: string; src: string }) => {
  return <LazyLoadImage alt={alt} height={25} src={src} width={40} />;
};
