import { memo, useCallback } from 'react';
import { useBreakpoints } from '../../hooks';
import { Photo } from '../../types';
import createColumns from './helpers/createColumns';
import styles from './styles.module.scss';

type PhotosListProps = {
  photoDataArr: Photo[];
};

const breakpointColumnsMap = {
  xs: 2,
  sm: 3,
  md: 3,
  lg: 4,
  xl: 4,
  xxl: 4,
};

function PhotosList({ photoDataArr }: PhotosListProps) {
  const { currentBreakpoint } = useBreakpoints();
  
  const numberOfColumns = breakpointColumnsMap[currentBreakpoint];
  const columnsData = createColumns(numberOfColumns, photoDataArr);
  
  const setCssColumns = useCallback((node: HTMLDivElement) => {
    if (!node) return;

    node.style.setProperty('--number-of-columns', numberOfColumns.toString());
  }, [numberOfColumns]);

  return (
    <div
      ref={setCssColumns}
      className={styles.photoListContainer}
      data-testid="photoList"
    >
      {columnsData.map((column, i) => (
        <ul key={`list-column-${i}`} className={styles.listColumn}>
          {column}
        </ul>
      ))}
    </div>
  );
}

export default memo(PhotosList);
