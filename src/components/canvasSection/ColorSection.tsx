/* eslint-disable functional/prefer-immutable-types */
/* eslint-disable functional/no-conditional-statements */
/* eslint-disable functional/no-expression-statements */
/* eslint-disable functional/no-return-void */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { CloseSquareOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { changeActiveColor, changeBackgroundColor, toggleEraser } from '../../slices/canvasSlice';
import ColorPicker from './ColorPicker';

const TabWrapper = styled.div`
  width: 64px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const TabEraserWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const TabEraserShadowBoxWrapper = styled.div`
  width: 245px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 10px, rgba(0, 0, 0, 0.16) 0px 2px 5px;
  border-radius: 2px;
  background: rgb(255, 255, 255);
  text-align: center;
`;

const Title = styled.p`
  margin-top: 0;
  margin-bottom: 4px;
  font-weight: bolder;
`;

const ColorBox = ({ title, activeColor }:{ title: string; activeColor:string; }) => (
  <TabWrapper>
    <Title>
      {title}
    </Title>
    <div
      style={{
        width: '40px',
        height: '40px',
        border: '1px solid #9E9E9E',
        backgroundColor: activeColor,
        marginLeft: 10,
        marginRight: 10,
      }}
    />
  </TabWrapper>
);

const EraserTab = ({ title }:{ title: string; }) => (
  <TabWrapper>
    <Title style={{ marginBottom: -1, paddingBottom: 4 }}>
      {title}
    </Title>
    <CloseSquareOutlined style={{
      fontSize: '49px',
      color: '#808080',
      display: 'contents',
    }}
    />
  </TabWrapper>
);

const EraserTabChildren = () => (
  <TabEraserWrapper>
    <TabEraserShadowBoxWrapper>
      <CloseSquareOutlined style={{
        fontSize: '49px',
        marginTop: 22,
        marginBottom: 22,
        color: '#808080',
      }}
      />
    </TabEraserShadowBoxWrapper>
  </TabEraserWrapper>
);

const ColorSection = () => {
  const {
    activeColor,
    backgroundColor,
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
      label: <EraserTab title={t('eraser')} />,
      children: <EraserTabChildren />,
    },
  ];

  return (
    <Tabs
      onChange={onChange}
      type="card"
      items={items}
      size="small"
      centered
    />
  );
};

export default ColorSection;
