import { GetServerSideProps } from 'next';
import { useEffect, useRef, useState } from 'react';
import { photosAPI } from '../src/api';
import { Footer, Header, PhotosList } from '../src/components';
import Button from '../src/components/Button';
import { useSettingsContext } from '../src/hooks';
import { PhotosPage } from '../src/types';

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
  }, [isAutoLoad]);

  return (
    <div className="app-container">
      <Header />
      <main>
        <PhotosList photoDataArr={pageData.photos} />
          {!isAutoLoad ? (
            <Button
              type="button"  
              onClick={handleLoadMore}
              variant="default"
            >
              Load more
            </Button>
          ) : (
            <span
              ref={autoLoadBoundry}
            >
              {Boolean(pageData.nextPage) && 'Loading...'}
            </span>
          )}
      </main>
      <Footer />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { theme } = ctx.query;

  if (Array.isArray(theme)) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const initialPageData = await photosAPI.external.getInitialPage(theme);
  
  if (!initialPageData.photos) return { notFound: true };

  return {
    props: {
      initialPageData,
    },
  };
};