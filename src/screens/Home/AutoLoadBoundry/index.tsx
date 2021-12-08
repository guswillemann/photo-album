import { forwardRef } from 'react';
import styles from './styles.module.scss';

type AutoLoadBoundryProps = {
  isFetching: boolean;
  loadMoreCallback: () => void;
};

export default forwardRef<HTMLSpanElement, AutoLoadBoundryProps>(
  function AutoLoadBoundry ({ isFetching }, ref) {
    return (
      <span
        ref={ref}
        className={styles.loading}
      >
        {isFetching && 'Loading...'}
      </span>
    );
  }
);
