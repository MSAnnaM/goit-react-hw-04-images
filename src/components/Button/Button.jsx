import React from 'react';
import styles from './Button.module.css'

export const Button = ({onClick}) => {
      return (
          <button
              className={styles.Button}
      type="button"
      onClick={onClick}
    >
      Load more
    </button>
  );
}