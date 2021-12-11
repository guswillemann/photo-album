import { useCallback, useEffect, useRef, useState } from 'react';
import { photosAPI } from '../../api';
import { PhotosList } from '../../components';
import { useSettingsContext } from '../../hooks';
import { PhotosPage } from '../../types';
import AutoLoadBoundry from './AutoLoadBoundry';
import HomeWrapper from './HomeWrapper';
import LoadMoreBtn from './LoadMoreBtn';
import NoPhotoData from './NoPhotoData';

type HomeProps = { initialPageData: PhotosPage }

export default function Home({ initialPageData }: HomeProps) {
  const { isAutoLoad } = useSettingsContext();
  const [pageData, setPageData] = useState({...initialPageData });
  const [isFetching, setIsFetching] = useState(false);
  const autoLoadBoundry = useRef(null);

  const hasMorePages = Boolean(pageData.nextPage);
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

  if (pageData.photos.length === 0) return (
    <HomeWrapper>
      <NoPhotoData />
    </HomeWrapper>
  );
  
  return (
    <HomeWrapper>
      <PhotosList photoDataArr={pageData.photos} />
      {hasMorePages && !isAutoLoad 
        ? <LoadMoreBtn
            lodaMoreCallback={handleLoadMore}
            isFetching={isFetching}
          />
          
        : <AutoLoadBoundry
            ref={autoLoadBoundry}
            isFetching={isFetching}
            loadMoreCallback={handleLoadMore}
          />
      }
    </HomeWrapper>
  );
}
