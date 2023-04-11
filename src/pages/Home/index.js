import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import PropTypes from 'prop-types';
import styles from "./styles.module.scss";
import './styles.scss'

HomePage.prototype = {
    name: PropTypes.string.isRequired,
}

HomePage.defaultProps = {
    name: 'Name'
}

function HomePage (props) {
  return (
    <MainLayout>
      <div>Home Page</div>
        <div>
            { props.name }
        </div>
    </MainLayout>
  );
}

export default HomePage
