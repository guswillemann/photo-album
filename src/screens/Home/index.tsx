import { useEffect, useRef, useState } from 'react';
import { photosAPI } from '../../api';
import { Footer, Header, PhotosList } from '../../components';
import { useSettingsContext } from '../../hooks';
import { PhotosPage } from '../../types';
import AutoLoadBoundry from './AutoLoadBoundry';
import LoadMoreBtn from './LoadMoreBtn';
import styles from './styles.module.scss';

type HomeProps = { initialPageData: PhotosPage }

export default function Home({ initialPageData }: HomeProps) {
  const { isAutoLoad } = useSettingsContext();
  const [pageData, setPageData] = useState({...initialPageData });
  const [isFetching, setIsFetching] = useState(false);
  const autoLoadBoundry = useRef(null);

  const handleLoadMore = () => setIsFetching(true);

  useEffect(() => {
    if (!isFetching || !pageData.nextPage) return;
    
    photosAPI.internal.getNextPage(pageData.nextPage)
      .then((newPageData) => {
        setIsFetching(false)
        setPageData((current) => {

          return {
            ...current,
            photos: [...current.photos, ...newPageData.photos],
            nextPage: newPageData.nextPage,
        }})
      })

  }, [isFetching, pageData]);

  useEffect(() => {
    if (!autoLoadBoundry.current || !isAutoLoad) return;
    const node = autoLoadBoundry.current;

    const observerCallback: IntersectionObserverCallback = ([ entry ]) => {
      if (entry.isIntersecting) setIsFetching(true);
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '0px 0px 500px 0px',
    });

    observer.observe(node);
    
    return () => observer.disconnect();
  }, [autoLoadBoundry, isAutoLoad]);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <PhotosList photoDataArr={pageData.photos} />
        {!isAutoLoad 
          ? <LoadMoreBtn lodaMoreCallback={handleLoadMore} />
          : <AutoLoadBoundry
              ref={autoLoadBoundry}
              isFetching={isFetching}
              loadMoreCallback={handleLoadMore}
            />
        }
      </main>
      <Footer />
    </>
  )
}
