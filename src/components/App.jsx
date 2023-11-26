import React from 'react';
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

export class App extends React.Component {
  state = {
    q: '',
    images: [],
    page: 1,
    modal: false,
    selectedImg: '',
    loadMore: false,
    isLoading: false,
  };
  componentDidUpdate(_, prevState) {
    if (this.state.page !== prevState.page || prevState.q !== this.state.q) {
      this.getImage();
    }
  }

  getImage = async () => {
    const { q, page } = this.state;
    try {
      this.setState({
        isLoading: true,
      });
      const customerImages = await fetchImage(q, page);
      if (!customerImages.hits.length) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...customerImages.hits],
        loadMore: page < Math.ceil(customerImages.totalHits / 12),
      }));
    } catch (error) {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    } finally {
      this.setState({ isLoading: false });
    }
  };
  submitForm = newSearch => {
    this.setState(() => ({ images: [], q: newSearch, page: 1, }));
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  imageOnClick = selectedImg => {
    this.setState({
      modal: true,
      selectedImg: selectedImg,
    });
  };

  closeModal = () => {
    this.setState({ modal: false, selectedImg: '' });
  };
  render() {
    const { isLoading, loadMore, modal, selectedImg } = this.state;
    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.submitForm} />
        {isLoading && <Loader />}
        <ImageGallery images={this.state.images} onClick={this.imageOnClick} />
        {loadMore && <Button onClick={this.onLoadMore} />}
        {modal && <Modal image={selectedImg} onClose={this.closeModal} />}
      </div>
    );
  }
}
