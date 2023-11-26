import React from 'react';
import styles from './Searchbar.module.css';
import Notiflix from 'notiflix';

export class Searchbar extends React.Component {
  state = {
    q: '',
  };
  handelChange = e => {
    this.setState({
      q: e.currentTarget.value.toLowerCase(),
    });
  };

  handelSubmit = e => {
    e.preventDefault();
    const { q } = this.state;
    if (!q.trim()) {
      Notiflix.Notify.warning('Please, enter your request');
      return;
    }
    this.props.onSubmit({ q });
    this.setState({ q: '' });
  };

  render() {
    return (
      <header className={styles.searchbar}>
        <form className={styles.form} onSubmit={this.handelSubmit}>
          <button type="submit" className={styles.form_btn}>
            <span className={styles.form_btn_text}>Search</span>
          </button>

          <input
            className={styles.form_input}
            value={this.state.q}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handelChange}
          />
        </form>
      </header>
    );
  }
}
