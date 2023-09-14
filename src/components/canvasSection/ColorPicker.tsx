/* eslint-disable functional/no-expression-statements */
/* eslint-disable functional/no-return-void */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useDispatch } from 'react-redux';
import Compact from 'react-color/lib/components/compact/Compact';

const ColorPickerTest = ({ activeColor, cb }:any) => {
  const dispatch = useDispatch();

  const handleChangeColor = (color:any) => {
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
