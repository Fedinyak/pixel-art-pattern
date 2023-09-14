/* eslint-disable max-len */
/* eslint-disable functional/no-let */
/* eslint-disable functional/no-loop-statements */
import { cellsType } from '../slices/canvasSlice';

/* eslint-disable functional/no-expression-statements */
const createCanvas = (canvasSize: number, backgroundColor: string): cellsType[] => {
  const resultCells = [];
  let counter = 0;
  for (let i = 0; i < canvasSize; i += 1) {
    for (let j = 0; j < canvasSize; j += 1) {
      counter += 1;
      resultCells.push({
        id: `row${i + 1}-col${j + 1}-index${counter}`,
        color: backgroundColor,
        backgroundType: true,
        // [`row${i + 1}col${j + 1}`]: { id: `row${i + 1}-col${j + 1}`, color: color, backgroundType: true, },
      });
    }
  }
  return resultCells;
};

export default createCanvas;
