import { FC } from 'react';
import styles from './styles.module.scss';
import { Footer, Header } from '../../../components';

const HomeWrapper: FC = ({ children }) => (
  <>
    <Header />
    <main className={styles.main}>
      {children}
    </main>
    <Footer />
  </>
);

export default HomeWrapper;