import { NextApiHandler } from 'next';
import { photosAPI } from '../../../src/api';

const resJSON = {
  missingUrl: { error: 'Missing next page URL param' },
  multipleUrls: { error: 'Multiple URLs params were provided' },
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'GET') {
    return res
      .setHeader('Allow', ['GET'])
      .status(405)
      .json({ error: `Method ${req.method} Not Allowed` });
  }

  const encodedUrl = req.query.url;
  if (!encodedUrl) return res.status(400).json(resJSON.missingUrl);
  if (Array.isArray(encodedUrl)) return res.status(400).json(resJSON.multipleUrls);
  
  const url = decodeURIComponent(encodedUrl);
  const data = await photosAPI.external.getNextPage(url);

  return res.status(200).json(data);
};

export default handler;