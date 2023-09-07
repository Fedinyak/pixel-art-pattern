/* eslint-disable no-param-reassign */
/* eslint-disable functional/no-return-void */
/* eslint-disable functional/prefer-immutable-types */
/* eslint-disable functional/no-expression-statements */
/* eslint-disable @typescript-eslint/naming-convention */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
// import type { RootState } from '../slices/store'

export interface cellsType {
  id: string
  color: string
  backgroundType: boolean
}

interface stateType {
  activeColor: string
  backgroundColor: string;
  size: number;
  zoom: number;
  canvasWidth: number;
  eraser: boolean;
  cells: cellsType[];
  svgCanvas: string;
}

const initialState: stateType = {
  activeColor: '#F44E3B',
  backgroundColor: '#009CE0',
  size: 3,
  zoom: 2,
  canvasWidth: 300,
  eraser: false,
  cells: [],
  svgCanvas: '',
};

export const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    addCells: (state, action: PayloadAction<cellsType[]>) => {
      state.cells = action.payload;
    },
    changeSize: (state, action: PayloadAction<number>) => {
      state.size = action.payload;
    },
    changeActiveColor: (state, action: PayloadAction<string>) => {
      state.activeColor = action.payload;
    },
    changeBackgroundColor: (state, action: PayloadAction<string>) => {
      state.backgroundColor = action.payload;
    },
    changeZoom: (state, action: PayloadAction<number>) => {
      state.zoom = action.payload;
    },
    toggleEraser: (state, action: PayloadAction<boolean>) => {
      state.eraser = action.payload;
    },
    addSvgCanvas: (state, action: PayloadAction<string>) => {
      state.svgCanvas = action.payload;
    },
  },
});

export const {
  addCells,
  changeSize,
  changeActiveColor,
  changeBackgroundColor,
  changeZoom,
  toggleEraser,
  addSvgCanvas,
} = canvasSlice.actions;

export default canvasSlice.reducer;
