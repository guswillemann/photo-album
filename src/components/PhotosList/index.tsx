import { memo, ReactNode } from 'react';
import { Photo } from '../../types';
import PhotoCard from './PhotoCard';
import styles from './styles.module.scss';

type PhotosListProps = {
  photoDataArr: Photo[];
};

type TReduceHelperObj = {
  columnsHeights: number[];
  columnsData: ReactNode[][];
};

const selectColumn = (columnsHeights: number[]) => {
  const minHeight = Math.min(...columnsHeights);
  return columnsHeights.indexOf(minHeight);
};

function PhotosList({ photoDataArr }: PhotosListProps) {
  const reduceHelperObj: TReduceHelperObj = { columnsHeights: [0, 0, 0, 0], columnsData: []};

  const { columnsData } = photoDataArr.reduce((columns, photo, i) => {
    const { columnsData, columnsHeights } = columns;
    const column = selectColumn(columnsHeights);

    const photoHeightRatio = photo.height / photo.width;

    const photoEl = <PhotoCard key={photo.id} photoData={photo} />;

    if (columnsData[column]) {
      columnsData[column] = [...columnsData[column], photoEl];
      columnsHeights[column] += photoHeightRatio
    } else {
      columnsData[column] = [photoEl];
      columnsHeights[column] += photoHeightRatio;
    }

    return columns;
  }, reduceHelperObj);

  return (
    <ul className={styles.wrapper}>
      {columnsData.map((column, i) => (
        <div key={`list-column-${i}`} className={styles.listColumn}>
          {column}
        </div>
      ))}
    </ul>
  );
}

export default memo(PhotosList);
