/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-restricted-imports */
/* eslint-disable functional/no-conditional-statements */
/* eslint-disable functional/no-return-void */
/* eslint-disable max-len */
/* eslint-disable functional/no-expression-statements */
/* eslint-disable functional/no-loop-statements */
/* eslint-disable functional/no-let */
/* eslint-disable array-callback-return */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { incrementByAmount } from "../../slices/counterSlice";
// eslint-disable-next-line import/no-extraneous-dependencies
// import { Button } from 'antd';
// import { ColorPicker } from 'antd';
import {
  addCells,
  cellsType,
  // changeActiveColor,
  // changeBackgroundColor,
  // changeSize,
  // changeZoom,
  // toggleEraser,
} from '../../slices/counterCanvas';
import CanvasRepeatSection from './CanvasRepeatSection';
import Size from './Size';
import Zoom from './Zoom';
// import ColorPicker from './ColorPicker';
import ColorSection from './ColorSection';

const CanvasSection = () => {
  // Вытаскиваем данные из хранилища. state — все состояние
  // const count = useSelector((state: any) => state.counter.value);
  const {
    activeColor, backgroundColor, size, zoom, canvasWidth, eraser, cells,
  } = useSelector((state: any) => state.canvas);
  // Возвращает метод store.dispatch() текущего хранилища
  const dispatch = useDispatch();

  const createCanvas = (canvasSize: number): cellsType[] => {
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

  const repaintingBackgroundColor = () => {
    const repaintingCells: cellsType[] = [];
    // eslint-disable-next-line max-len
    // eslint-disable-next-line functional/no-expression-statements, functional/no-return-void, functional/prefer-immutable-types
    cells.map((item: cellsType) => {
      // eslint-disable-next-line functional/no-conditional-statements
      if (item.backgroundType) {
        // eslint-disable-next-line functional/no-expression-statements
        repaintingCells.push({ ...item, color: backgroundColor });
      // eslint-disable-next-line functional/no-conditional-statements
      } else {
        // eslint-disable-next-line functional/no-expression-statements
        repaintingCells.push(item);
      }
    });
    return repaintingCells;
  };

  // eslint-disable-next-line functional/no-expression-statements, functional/no-return-void
  useEffect(() => {
    // console.log(canvas, "canvas");
    // dispatch(changeBackgroundColor(createCanvas(size)));
    // repaintingBackgroundColor()
    // eslint-disable-next-line functional/no-expression-statements
    dispatch(addCells(repaintingBackgroundColor()));
  }, [backgroundColor]);

  useEffect(() => {
    // console.log(canvas, "canvas");
    dispatch(addCells(createCanvas(size)));
  }, [size]);

  const handleClick = (e: any) => {
    console.log(e.target.id, 'e.target.id');
    const [, , indexCell] = e.target.id.split('-');

    const getCellIndex = (str: any) => {
      const [, getIndex] = str.split('index');
      return parseInt(getIndex, 10) - 1;
    };
    // const cellKey = e.target.id.split("-").join('');

    // console.log(getRowCount, getCollCount, getCellIndex(indexCell), cellKey, "getRowCount, getCollCount, indexCell, cellKey")
    // console.log(canvas.cells[getCellIndex(indexCell)], "store.cells[0]");

    const newCells = [...cells];
    if (eraser) {
      const changedColor = {
        ...cells[getCellIndex(indexCell)],
        color: backgroundColor,
        backgroundType: true,
      };
      newCells[getCellIndex(indexCell)] = changedColor;
    } else {
      const changedColor = {
        ...cells[getCellIndex(indexCell)],
        color: activeColor,
        backgroundType: false,
      };
      newCells[getCellIndex(indexCell)] = changedColor;
    }
    dispatch(addCells(newCells));
    console.log(newCells, 'cells---');
  };

  const count = 1000;

  return (
    <section>
      <br />
      <Size />
      <br />
      <br />
      <ColorSection />
      <br />
      {/* <button type="button" onClick={() => dispatch(changeActiveColor('#ff2222'))}>
        red color
      </button>
      <button type="button" onClick={() => dispatch(changeActiveColor('#4caf50'))}>
        green color
      </button> */}
      {/* <button
        type="button"
        onClick={() => {
          dispatch(toggleEraser(!eraser));
        }}
      >
        eraser
        {' '}
        {`${eraser}`}
      </button>
      <br />
      <button type="button" onClick={() => dispatch(changeBackgroundColor('#ffeb3b'))}>
        yellow bg
      </button>
      <button type="button" onClick={() => dispatch(changeBackgroundColor('#000000'))}>
        black bg
      </button> */}
      <br />
      {/* <p>{canvas.cells[0].text}</p> */}
      <div style={{ width: canvasWidth }}>
        <div style={{
          display: 'flex', flexWrap: 'wrap', width: '100%', border: '1px solid #9E9E9E',
        }}
        >
          {cells.map((item: any) =>
            // console.log(item, "cell");
            // eslint-disable-next-line implicit-arrow-linebreak
            (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
              <div
                style={{
                  backgroundColor: item.color,
                  width: `${canvasWidth / size}px`,
                  height: `${canvasWidth / size}px`,
                  boxSizing: 'border-box',
                  border: '1px solid #9E9E9E',
                }}
                onClick={handleClick}
                id={item.id}
                key={item.id}
              >
                {/* {item.color} */}
                <br />
                {/* {item.text} */}
              </div>
            ))}
        </div>
      </div>
      <br />
      <Zoom />
      <br />
      <br />

      <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
        {
          // eslint-disable-next-line react/jsx-key
          [...Array(count)].map(() => <CanvasRepeatSection cells={cells} size={size} zoom={zoom} />)
        }
      </div>
    </section>
  );
};

export default CanvasSection;

// {
//   row1: [
//     {
//       col1: {
//         id: "row1-col1",
//         color: "#8f2c82",
//       },
//     },
//     {
//       col2: {
//         id: "row1-col2",
//         color: "#833333",
//       },
//     },
//   ],
// },
// {
//   row2: [
//     {
//       col1: {
//         id: "row2-col1",
//         color: "#222222",
//       },
//     },
//     {
//       col2: {
//         id: "row2-col2",
//         color: "#111111",
//       },
//     },
//   ],
// },

// rows: [
//   {
//     'row1col1': {
//       id: "row1col1",
//       color: "#8f2c82",
//     }
//   },
// {
//     'row1col1': {
//       id: "row1col1",
//       color: "#8f2c82",
//     }
//   },
// ]
// rows: [
//   {
//       id: "row1col1",
//       color: "#8f2c82",
//   },
// rows: [
// {
//   row1: [
//     {
//       col1: {
//         id: "row1-col1",
//         color: "#8f2c82",
//       },
//     },
// }
// ]
