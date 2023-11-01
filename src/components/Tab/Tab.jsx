import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Tab.module.scss';

const Tab = ({ id, title, onClick, activeTab }) => {
  const isActive = activeTab === id;

  return (
    <li className={isActive ? styles.active : ''} onClick={onClick}>
      <Link to={`/${id}`}>{title}</Link>
    </li>
  );
};

export default Tab;
