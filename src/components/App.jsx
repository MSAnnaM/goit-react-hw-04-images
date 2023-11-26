import React, { useEffect, useState } from 'react';
import Notiflix from 'notiflix';
import styles from './App.module.css';
import { fetchImage } from 'services/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
Notiflix.Notify.init({
  timeout: 5000,
  clickToClose: true,
  cssAnimationStyle: 'from-bottom',
  width: '400px',
  fontSize: '18px',
  fontAwesomeIconStyle: 'shadow',
});

export const App = () => {
  const [q, setQ] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState('');
  const [loadMore, setLoadMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getImage = async () => {
      try {
        setIsLoading(true);
        const customerImages = await fetchImage(q, page);
        if (!customerImages.hits.length) {
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        setImages(prevImages => [...prevImages, ...customerImages.hits]);
        setLoadMore(page < Math.ceil(customerImages.totalHits / 12));
      } catch (error) {
        Notiflix.Notify.failure(
          'Oops! Something went wrong! Try reloading the page!'
        );
      } finally {
        setIsLoading(false);
      }
    };
    if (q !== '') {
      getImage();
    }
  }, [q, page]);

  const submitForm = newSearch => {
    setImages([]);
    setQ(newSearch);
    setPage(1);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };
  const imageOnClick = selectedImg => {
    setSelectedImg(selectedImg);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setSelectedImg('');
  };
  return (
    <div className={styles.App}>
      <Searchbar onSubmit={submitForm} />
      {isLoading && <Loader />}
      <ImageGallery images={images} onClick={imageOnClick} />
      {loadMore && <Button onClick={onLoadMore} />}
      {modal && <Modal image={selectedImg} onClose={closeModal} />}
    </div>
  );
};
