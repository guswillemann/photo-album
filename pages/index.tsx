import { GetServerSideProps } from 'next';
import { photosAPI } from '../src/api';
import { Home } from '../src/screens';

export default Home;

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