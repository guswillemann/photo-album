import { Photo } from '../../types';

type ApiResponseData = {
  photos: Photo[];
  page: string;
  per_page: string;
  total_results: string;
  prev_page: string;
  next_page: string;
};

const EXTERNAL_PHOTOS_API_KEY = process.env.EXTERNAL_PHOTOS_API_KEY;

function createPageData(data: ApiResponseData) {
  const nextPage = data.next_page
  ? encodeURIComponent(data.next_page)
  : '';
  
  return {
    nextPage,
    photos: data.photos,
  };
}

const fetchExternalPhotosApi = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${EXTERNAL_PHOTOS_API_KEY}`,
    },
  });
  const data: ApiResponseData = await response.json();
  return createPageData(data);
};

const defaultUrl = 'https://api.pexels.com/v1/curated?per_page=24&page=1';
const themedUrl = 'https://api.pexels.com/v1/search?per_page=24&page=1';

const externalPhotosAPI = {
  async getInitialPage(theme?: string) {
    const url = theme
      ? `${themedUrl}&query=${theme}`
      : defaultUrl;
    
    return await fetchExternalPhotosApi(url);
  },

  async getNextPage(url: string) {
    return await fetchExternalPhotosApi(url);
  },
}

export default externalPhotosAPI;