import React from 'react';
import styles from '../styles/Home.module.less';

interface ScrollableContainerProps {
  children: React.ReactNode;
  className?: string;
}

const ScrollableContainer: React.FC<ScrollableContainerProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div 
      className={`${className} ${styles.scrollableContainer}`}
    >
      {children}
    </div>
  );
};

export default ScrollableContainer;