import React from 'react';
import styles from './ImageGalleryItem.module.css';

export const ImageGalleryItem =({ image, alt, onClick, forModal })=> {
    return (
      <li className={styles.ImageGalleryItem} onClick={() => onClick(forModal)}>
        <img src={image} alt={alt} className={styles.ImageGalleryItem_image} />
      </li>
    );
  }

