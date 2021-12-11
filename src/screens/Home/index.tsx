import { useCallback, useEffect, useRef, useState } from 'react';
import { photosAPI } from '../../api';
import { Button, PhotosList } from '../../components';
import { useSettingsContext } from '../../hooks';
import { PhotosPage } from '../../types';
import AutoLoadBoundry from './AutoLoadBoundry';
import FailedToFetchMessage from './FailedToFetch';
import HomeWrapper from './HomeWrapper';
import LoadMoreBtn from './LoadMoreBtn';
import NoPhotoData from './NoPhotoData';

type HomeProps = { initialPageData: PhotosPage }

export default function Home({ initialPageData }: HomeProps) {
  const { isAutoLoad } = useSettingsContext();
  const [pageData, setPageData] = useState({...initialPageData });
  const [isFetching, setIsFetching] = useState(false);
  const [hasError, setHasError] = useState(false);
  const autoLoadBoundry = useRef(null);

  const hasMorePages = Boolean(pageData.nextPage);
  const handleLoadMore = () => setIsFetching(true);

  useEffect(() => {
    if (!isFetching || !pageData.nextPage) return;
    
    photosAPI.internal.getNextPage(pageData.nextPage)
      .then((newPageData) => {
        setHasError(false);
        setIsFetching(false)
        setPageData((current) => {

          return {
            ...current,
            photos: [...current.photos, ...newPageData.photos],
            nextPage: newPageData.nextPage,
        }})
      })
      .catch(() => {
        setHasError(true);
        setIsFetching(false);
      })

  }, [isFetching, pageData]);

  useEffect(() => {
    if (!autoLoadBoundry.current || !isAutoLoad || hasError) return;
    const node = autoLoadBoundry.current;

    const observerCallback: IntersectionObserverCallback = ([ entry ]) => {
      if (entry.isIntersecting) setIsFetching(true);
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '0px 0px 500px 0px',
    });

    observer.observe(node);
    
    return () => observer.disconnect();
  }, [autoLoadBoundry, isAutoLoad, hasError]);

  if (pageData.photos.length === 0) return (
    <HomeWrapper>
      <NoPhotoData />
    </HomeWrapper>
  );
  
  return (
    <HomeWrapper>
      <PhotosList photoDataArr={pageData.photos} />
      
      {hasError && (
        <FailedToFetchMessage
          lodaMoreCallback={handleLoadMore}
          isFetching={isFetching}
        />
      )}

      {hasMorePages && !hasError && (!isAutoLoad 
        ? <LoadMoreBtn
            lodaMoreCallback={handleLoadMore}
            isFetching={isFetching}
          />
          
        : <AutoLoadBoundry
            ref={autoLoadBoundry}
            isFetching={isFetching}
            loadMoreCallback={handleLoadMore}
          />
        )
      }
    </HomeWrapper>
  );
}
