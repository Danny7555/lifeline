// components/Footer.tsx
import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FaWhatsapp } from 'react-icons/fa';
import styles from '../../styles/Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1>LIFELINE</h1>
        </div><br/>
        
        <div className={styles.navLinks}>
          <Link href="/symptoms" className={styles.link}>Symptoms Checker</Link>
          <Link href="/first-aid" className={styles.link}>First Aid Guide</Link>
          <Link href="./contact" className={styles.link}>Contact Us</Link>
        </div>
        
        <div className={styles.socialIcons}>
          <Link href="#" aria-label="Facebook" className={styles.socialLink}>
            <FaFacebookF />
          </Link>
          <Link href="#" aria-label="Twitter" className={styles.socialLink}>
            <FaXTwitter />
          </Link>
          <Link href="#" aria-label="Instagram" className={styles.socialLink}>
            <FaInstagram />
          </Link>
          <Link href="#" aria-label="LinkedIn" className={styles.socialLink}>
            <FaLinkedinIn />
          </Link>
          <Link href="#" aria-label="WhatsApp" className={styles.socialLink}>
            <FaWhatsapp />
          </Link>
        </div>
        
        <div className={styles.description}>
          <p>Lifeline provides instant access to crucial first-aid information<br />
            during emergencies, ensuring you&apos;re prepared to act quickly and<br />
            effectively.</p>
        </div>
      </div><br/>
      <div className={styles.bottomLine}></div>
       <div className="text-center text-gray-800 text-md mt-2 font-inter font-light">
          &copy; {new Date().getFullYear()} Lifeliner. All rights reserved. Daniella Asiedu. Credits to <Link href="https://github.com/Aristocratjnr" className="text-red-600 hover:text-red-700">David O. Ayim</Link> for the assistance.
        </div>
    </footer>
  );
};

export default Footer;