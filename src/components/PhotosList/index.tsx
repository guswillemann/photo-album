import { memo, ReactNode } from 'react';
import PhotoCard from './PhotoCard';
import styles from './styles.module.scss';

export type PhotoData = {
  id: string;
  url: string;
  width: number;
  height: number;
  photographer: string;
  photographer_url: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
};

type PhotosListProps = {
  photoDataArr: PhotoData[];
};

function PhotosList({ photoDataArr }: PhotosListProps) {
  const listColumns = photoDataArr.reduce((columns, photo, i) => {
    const column = i % 4;
    const photoEl = <PhotoCard key={photo.id} photoData={photo} />;

    if (columns[column]) columns[column] = [...columns[column], photoEl];
    else columns[column] = [photoEl];

    return columns;
  }, [] as ReactNode[][]);

  return (
    <ul className={styles.wrapper}>
      {listColumns.map((column, i) => (
        <div key={`list-column-${i}`} className={styles.listColumn}>
          {column}
        </div>
      ))}
    </ul>
  );
}

export default memo(PhotosList);
