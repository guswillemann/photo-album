import Head from 'next/head';
import { useSettingsContext } from '../../hooks';

export default function SEO() {
  const { isThemeLight } = useSettingsContext();

  const title = 'Photo Album';
  const description = "Photo Album - A display of photos from Pexels. This project was created as the Front-End Activity for Leadster's Hiring process";
  const themeColor = isThemeLight ? '#FFFFFF' : '#222222';

  const baseUrl = 'https://photo-album.guswillemann.vercel.app/';
  const cardUrl = `${baseUrl}images/card-image.png`;
  const cardAlt = "Photo Albums card's image";

  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="theme-color" content={themeColor} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={baseUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={cardUrl} />
      <meta property="og:image:alt" content={cardAlt} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={baseUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={cardUrl} />
      <meta property="twitter:image:alt" content={cardAlt} />
      <meta property="twitter:image:width" content="1200" />
      <meta property="twitter:image:height" content="630" />
    </Head>
  );
}