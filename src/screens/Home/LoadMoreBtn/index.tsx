import { Button } from '../../../components';

type LoadMoreBtnProps = { lodaMoreCallback: () => void }

export default function LoadMoreBtn({ lodaMoreCallback }: LoadMoreBtnProps) {
  return (
    <Button
      type="button"  
      onClick={lodaMoreCallback}
      variant="default"
    >
      Load more
    </Button>
  );
}
