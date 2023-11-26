import React from 'react';
import styles from './Modal.module.css';
export class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyClose);
  }

  handleKeyClose = event => {
    if (event.key === 'Escape') {
      this.props.onClose();
    }
  };
  handleOverlayClose = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { image } = this.props;
    return (
      <div className={styles.Overlay} onClick={this.handleOverlayClose}>
        <div className={styles.Modal}>
          <img src={image} alt=""/>
        </div>
      </div>
    );
  }
}
