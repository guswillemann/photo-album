import { Button, Loading } from '../../../components';
import styles from './styles.module.scss';

type LoadMoreBtnProps = {
  isFetching: boolean;
  lodaMoreCallback: () => void;
  text?: string;
};

export default function LoadMoreBtn({ lodaMoreCallback, isFetching, text }: LoadMoreBtnProps) {
  if (isFetching) return (
    <div className={styles.loadingWrapper}>
      <Loading />
    </div>
  );
  
  return (
    <Button
      type="button"  
      onClick={lodaMoreCallback}
      variant="default"
    >
      {text || 'Load more'}
    </Button>
  );
}
