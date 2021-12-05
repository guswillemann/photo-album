import { PhotosPage } from '../../types';

const fetchInternalPhotosApi = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  });
  const data: PhotosPage = await response.json();
  return data;
};

const internalPhotosAPI = {
  async getNextPage(nextPageUrl: string) {
    const url = `/api/photos/next?url=${nextPageUrl}`
    return await fetchInternalPhotosApi(url);
  },
};

export default internalPhotosAPI;