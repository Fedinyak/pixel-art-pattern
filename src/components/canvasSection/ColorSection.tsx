/* eslint-disable functional/prefer-immutable-types */
/* eslint-disable functional/no-conditional-statements */
/* eslint-disable functional/no-expression-statements */
/* eslint-disable functional/no-return-void */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
// import ColorPicker from './ColorPicker';
import { CloseSquareOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { changeActiveColor, changeBackgroundColor, toggleEraser } from '../../slices/counterCanvas';
import ColorPicker from './ColorPicker';

const ColorBox = ({ title, activeColor }:{ title: string; activeColor:string; }) => (
  <>
    <p><b>{title}</b></p>
    <div
      style={{
        width: '40px',
        height: '40px',
        border: '1px solid #9E9E9E',
        backgroundColor: activeColor,
      }}
    />
  </>
);

const ColorSection = () => {
  const {
    activeColor,
    backgroundColor,
  //   eraser,
  } = useSelector((state: any) => state.canvas);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onChange = (key: string) => {
    if (key === '3') {
      dispatch(toggleEraser(true));
    } else {
      dispatch(toggleEraser(false));
    }
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: <ColorBox title={t('activeColor')} activeColor={activeColor} />,
      children: <ColorPicker activeColor={activeColor} cb={changeActiveColor} />,
    },
    {
      key: '2',
      label: <ColorBox title={t('bgColor')} activeColor={backgroundColor} />,
      children: <ColorPicker activeColor={backgroundColor} cb={changeBackgroundColor} />,
    },
    {
      key: '3',
      // eslint-disable-next-line react/jsx-one-expression-per-line
      label: <><p><b>{t('eraser')}</b></p><CloseSquareOutlined style={{ fontSize: '50px', color: '#444444' }} /></>,
      children: <CloseSquareOutlined style={{ fontSize: '50px', marginTop: 20, marginBottom: 23 }} />,
    },
  ];

  return (
    <>
      <Tabs
        onChange={onChange}
        type="card"
        items={items}
        centered
      />
      {/* <p><b>Active color</b></p>
      <div
        style={{
          width: '40px',
          height: '40px',
          backgroundColor: activeColor,
        }}
      /> */}
      {/* <ColorPicker /> */}
    </>
  );
};

export default ColorSection;
