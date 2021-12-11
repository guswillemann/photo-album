import LoadMoreBtn from '../LoadMoreBtn';
import styles from './styles.module.scss';

type FailedToFetchMessageProps = {
  lodaMoreCallback: () => void;
  isFetching: boolean;  
};

export default function FailedToFetchMessage({
  lodaMoreCallback,
  isFetching,
}: FailedToFetchMessageProps) {
  return (
    <div className={styles.failedMessage}>
      <p>Failed to get new photos<span className={styles.emoji}> 😓 </span></p>
      <LoadMoreBtn
        lodaMoreCallback={lodaMoreCallback}
        isFetching={isFetching}
        text='Try again'
      />
    </div>
  );
}
