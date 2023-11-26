import React, { useState } from 'react';
import styles from './Searchbar.module.css';
import Notiflix from 'notiflix';

export const Searchbar = ({ onSubmit }) => {
  const [q, setQ] = useState('');

  const handelChange = e => {
    setQ(e.currentTarget.value.toLowerCase());
  };

  const handelSubmit = e => {
    e.preventDefault();
    if (!q.trim()) {
      Notiflix.Notify.warning('Please, enter your request');
      return;
    }

    onSubmit({ q });
    setQ('');
  };

  return (
    <header className={styles.searchbar}>
      <form className={styles.form} onSubmit={handelSubmit}>
        <button type="submit" className={styles.form_btn}>
          <span className={styles.form_btn_text}>Search</span>
        </button>

        <input
          className={styles.form_input}
          value={q}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handelChange}
        />
      </form>
    </header>
  );
};