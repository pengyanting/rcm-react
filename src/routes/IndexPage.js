import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';

function IndexPage() {
  return (
    <div className={styles.normal}>
      aa
    </div>
  );
}

IndexPage.propTypes = {};

export default connect()(IndexPage);
