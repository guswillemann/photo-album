import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import { Button, Loading } from '../../../components';
import styles from './styles.module.scss'

export default function NoPhotoData() {
  const router = useRouter();
  const { theme } = router.query;
  const hasThemeQuery = Boolean(theme);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const callback = () => router.reload();
    router.events.on('routeChangeComplete', callback);
    () => router.events.off('routeChangeComplete', callback);
  }, [router]);

  const handleClick = () => {
    router.push('/');
    setIsFetching(true);
  }

  if (hasThemeQuery) return (
    <div className={styles.wrapper}>
      <p>{"Opss, We didn't found any photos with the theme:"}</p>
      <p>{theme}</p>
      <Button
        type="button"
        variant="outline"
        onClick={handleClick}
      >
        Return to default theme
      </Button>
    </div>
  );

  return (
    <div className={styles.wrapper}>
      {isFetching
        ? <Loading />
        : (
          <>
            <span className={styles.emoji}>😢</span>
            <p>{"Sorry, we can't find the photos"}</p>
          </>
        )
      }
    </div>
  );
}
