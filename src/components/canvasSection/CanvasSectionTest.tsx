/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementByAmount } from '../../slices/counterSlice';
// import _ from "lodash";

export interface rowsType {
  backgroundColor: string;
  size: number;
  zoom: number;
  testNum: any;
  canvasWidth: number;
  // rowsTest: any;
  cells: any;
}

const state: rowsType = {
  backgroundColor: '#2c4d8f',
  size: 3,
  zoom: 1,
  testNum: [
    {
      num: 2,
    },
  ],
  // rowsTest: [],
  canvasWidth: 300,
  cells: [

  ],

};

// rows[0][row1][0][col1] =
const CanvasSectionTest = () => {
  // Вытаскиваем данные из хранилища. state — все состояние
  const count = useSelector((state:any) => state.counter.value);
  // Возвращает метод store.dispatch() текущего хранилища
  const dispatch = useDispatch();

  const [store, setStore] = useState(state);
  const [storeCells, setStoreCells] = useState(state.cells);
  // const [cell, setCells] = useState(store.rows);

  const createCells = (size: any) => {
    const cells = [];
    let counter = 0;
    for (let i = 0; i < size; i += 1) {
      // const colls = [];
      for (let j = 0; j < size; j += 1) {
        // colls.push({
        counter += 1;
        cells.push({
          id: `row${i + 1}-col${j + 1}-index${counter}`,
          color: store.backgroundColor,
          backgroundType: true,
          // [`row${i + 1}col${j + 1}`]: { id: `row${i + 1}-col${j + 1}`, color: color },
        });
      }
      // rows.push({ [`row${i + 1}`]: colls });
    }
    return cells;
  };

  const createCanvas = (size: any) => {
    store.cells = createCells(size);
  };

  createCanvas(store.size);

  const handleClick = (e: any) => {
    console.log(e.target.id, 'e.target.id');
    const [getRowCount, getCollCount, indexCell] = e.target.id.split('-');

    const getCellIndex = (str:any) => {
      const [,getIndex] = str.split('index');
      return (parseInt(getIndex, 10) - 1);
    };
    const cellKey = e.target.id.split('-').join('');

    console.log(getRowCount, getCollCount, getCellIndex(indexCell), cellKey, 'getRowCount, getCollCount, indexCell, cellKey');
    console.log(store.cells[getCellIndex(indexCell)], 'store.cells[0]');

    const cells = [...storeCells];
    cells[getCellIndex(indexCell)].color = '#111111';
    cells[getCellIndex(indexCell)].backgroundType = false;
    console.log(cells, 'cells');
    setStoreCells(cells);
  };

  const testClick = () => {
    console.log(store.testNum[0].num, 'store.testNum');
    const testNum = [];
    const resultNum = { num: store.testNum[0].num + 1 };
    testNum.push(resultNum);
    const result = { ...store, testNum };
    setStore(result);
  };

  return (
    <section>
      <span>{count}</span>
      <button onClick={() => dispatch(incrementByAmount(42))}>Прибавить 42</button>
      <p>
        {store.testNum.map((item: any) => (
          <div>
            <p>{item.num}</p>
          </div>
        ))}
      </p>
      <p>{store.cells[0].text}</p>
      <button onClick={testClick}>change zoom</button>
      <div style={{ width: store.canvasWidth }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
          {storeCells.map((item: any) =>
            // console.log(item, "cell");
            (
              <div
                style={{
                  backgroundColor: item.color,
                  width: `${store.canvasWidth / store.size}px`,
                  // height: 'auto',
                  // height: '100%',
                  // width: "40%",
                  height: `${store.canvasWidth / store.size}px`,
                  boxSizing: 'border-box',
                  // border: "medium dashed green",
                }}
                onClick={handleClick}
                id={item.id}
              >
                {/* <div style={
                    {
                      width: 30,
                      height: 30,
                      border: "medium dashed green",
                    }
                  }>
                  </div> */}
                {item.color}
                <br />
                {item.text}
                {/* <p style={{ height: "100%" }}>.</p> */}
              </div>
            ))}
        </div>
      </div>
      {/* {store.rows.map((row: any, i: any) => {
        const rowCount = `row${i + 1}`;
        return (
          <div style={{ display: "flex" }}>
            {row[rowCount].map((col: any, j: any) => {
              const colCount = `col${j + 1}`;
              // console.log(store, 'store')
              // console.log(col[colCount], 'col col col')
              return (
                <div
                  style={{
                    backgroundColor: col[colCount]?.color,
                    width: 100,
                    height: 100,
                  }}
                  onClick={handleClick}
                  id={col[colCount]?.id}
                >
                  {col[colCount]?.color}
                </div>
              );
            })}
          </div>
        );

        //  return (<div>{row}</div>)
        // row.map((item) => {
        //   <div>item</div>
        // })
      })} */}
    </section>
  );
};

export default CanvasSectionTest;

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
