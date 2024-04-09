import styles from './not-found.module.less';

import React, { Component } from 'react';

export default class NotFound extends Component {

  toHome = () => {
    location.href = '/';
  }

  render() {
    return (
      <div className={styles["not-found"]}>
        <div className={styles["not-found-title"]}>404----</div>
        <div className={styles["not-found-info"]}>Page Not Found</div>
        <div className={styles["not-found-content"]}>
          <p>对不起,没有找到您所需要的页面,可能是URL不确定,或者页面已被移除。</p>
          <a type="primary" onClick={this.toHome}>
            Back Home
          </a>
        </div>
      </div>
    );
  }
}
