import { forwardRef } from 'react';
import { Loading } from '../../../components';

type AutoLoadBoundryProps = {
  isFetching: boolean;
  loadMoreCallback: () => void;
};

export default forwardRef<HTMLSpanElement, AutoLoadBoundryProps>(
  function AutoLoadBoundry ({ isFetching }, ref) {
    return (
      <span
        ref={ref}
      >
        {isFetching && <Loading />}
      </span>
    );
  }
);
