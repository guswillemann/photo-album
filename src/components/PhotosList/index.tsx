import { memo, useCallback } from 'react';
import { Photo } from '../../types';
import createColumns from './helpers/createColumns';
import styles from './styles.module.scss';

type PhotosListProps = {
  photoDataArr: Photo[];
};

function PhotosList({ photoDataArr }: PhotosListProps) {
  const columnsData = createColumns(4, photoDataArr);

  return (
    <div className={styles.wrapper}>
      {columnsData.map((column, i) => (
        <ul key={`list-column-${i}`} className={styles.listColumn}>
          {column}
        </ul>
      ))}
    </div>
  );
}

export default memo(PhotosList);
