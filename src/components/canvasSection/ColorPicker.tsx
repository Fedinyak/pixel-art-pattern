/* eslint-disable functional/no-expression-statements */
/* eslint-disable functional/no-return-void */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
// import { Compact } from 'react-color';
import {
  useDispatch,
  //  useSelector
} from 'react-redux';
import Compact from 'react-color/lib/components/compact/Compact';
// import { changeActiveColor } from '../../slices/counterCanvas';

const ColorPickerTest = ({ activeColor, cb }:any) => {
  console.log(cb, 'cb');
  // const { activeColor } = useSelector((state: any) => state.canvas);
  const dispatch = useDispatch();

  const handleChangeColor = (color:any) => {
    // console.log(color.hex, 'color');
    dispatch(cb(color.hex));
  };
  return (
    <Compact
      color={activeColor}
      onChangeComplete={handleChangeColor}
      // disableAlpha={false}
      // eslint-disable-next-line max-len
      // presetColors={['#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', '#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#FFFFFF']}
      // width="250px"
    />
  );
};

export default ColorPickerTest;
