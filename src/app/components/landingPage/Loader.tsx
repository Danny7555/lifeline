import React from "react";
import Image from "next/image";
import styles from "../../styles/Loader.module.css"; 

interface LoaderProps {
  isLoading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
  if (!isLoading) return null;
  
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loaderContent}>
        <Image 
          src="/Images/signup.png" 
          alt="Lifeline Logo" 
          width={100} 
          height={100}
          className={styles.logoImage}
        />
        <div className={styles.spinner}></div>
      </div>
    </div>
  );
};
export default Loader;