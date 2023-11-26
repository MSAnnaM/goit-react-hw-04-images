import React from 'react';
import styles from './ImageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, onClick }) => {
  return (
    <ul className={styles.gallary}>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          image={webformatURL}
          alt={tags}
          onClick={onClick}
          forModal={largeImageURL}
        />
      ))}
    </ul>
  );
};
