import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import styles from './App.module.scss';
import Tab from '../components/Tab/Tab';
import tabsData from '../data/tabs.json';

const DummyChart = lazy(() => import('../components/DummyChart/DummyChart'));
const DummyList = lazy(() => import('../components/DummyList/DummyList'));
const DummyTable = lazy(() => import('../components/DummyTable/DummyTable'));
const NotFound = lazy(() => import('../components/NotFound/NotFound'));

export const App = () => {
  const tabs = tabsData.sort((a, b) => a.order - b.order);
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('activeTab') || tabs[0].id;
  });

  const handleTabClick = id => {
    setActiveTab(id);
  };

  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);
  return (
    <>
      <nav>
        <ul className={styles.list}>
          {tabs.map(tab => (
            <Tab
              key={tab.id}
              id={tab.id}
              title={tab.title}
              onClick={() => handleTabClick(tab.id)}
              activeTab={activeTab}
            />
          ))}
        </ul>
      </nav>
      <Suspense fallback={<div>...Loading</div>}>
        <Routes>
          <Route path="/" element={<Navigate to={`/${tabs[0]?.id}`} />} />
          <Route path="/dummyChart" element={<DummyChart />} />
          <Route path="/dummyList" element={<DummyList />} />
          <Route path="/dummyTable" element={<DummyTable />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};
