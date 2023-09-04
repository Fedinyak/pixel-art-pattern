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
    <div
      style={{
        display: 'flex', width: '100%', justifyContent: 'center', backgroundColor: '#ffffff',
      }}
    >

      <Compact
        color={activeColor}
        onChangeComplete={handleChangeColor}
      />
    </div>
  );
};

export default ColorPickerTest;
