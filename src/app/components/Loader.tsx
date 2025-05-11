import React from 'react';
import Image from 'next/image';
import styles from '../styles/Loader.module.css'; 

interface LoaderProps {
  isLoading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
  if (!isLoading) return null;
  
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loaderContent}>
        <Image
          src="/images/lifeline.jpeg"
          alt="Lifeline Logo"
          width={120}
          height={120}
          style={{ width: "auto", height: "auto" }}
          className={styles.logoImage}
          priority
        />
        <div className={styles.spinner}></div>
      </div>
    </div>
  );
};

export default Loader;