import { ReactNode } from 'react';
import { Photo } from '../../../types';
import PhotoCard from '../PhotoCard';

function createReduceObj(numberOfColumns: number) {
  let columnsData: ReactNode[][] = [];
  let columnsHeights: number[] = [];

  for (let i = 0 ; i < numberOfColumns ; i++) {
    columnsData[i] = [];
    columnsHeights[i] = 0;
  }
  
  return {
    columnsData,
    columnsHeights,
  };
}

const selectColumn = (columnsHeights: number[]) => {
  const minHeight = Math.min(...columnsHeights);
  return columnsHeights.indexOf(minHeight);
};

export default function createColumns(quantity: number, data: Photo[]) {
  const reduceHelperObj = createReduceObj(quantity);

  const { columnsData } = data.reduce((columns, photo, i) => {
    const { columnsData, columnsHeights } = columns;
    const column = selectColumn(columnsHeights);

    const photoHeightRatio = photo.height / photo.width;

    const photoEl = <PhotoCard key={photo.id} photoData={photo} />;

    columnsData[column] = [...columnsData[column], photoEl];
    columnsHeights[column] += photoHeightRatio;

    return columns;
  }, reduceHelperObj);

  return columnsData;
}