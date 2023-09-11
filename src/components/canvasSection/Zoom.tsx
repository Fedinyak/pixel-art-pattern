/* eslint-disable no-restricted-globals */
/* eslint-disable functional/no-expression-statements */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable functional/no-return-void */
import React from 'react';
import {
  Space,
  Typography,
  Col,
  Row,
  Slider, InputNumber,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { changeZoom } from '../../slices/canvasSlice';

const { Text } = Typography;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const Zoom = () => {
  const { zoom } = useSelector((state: any) => state.canvas);
  const dispatch = useDispatch();
  const onChange = (newValue: number) => {
    dispatch(changeZoom(newValue));
  };

  const { t } = useTranslation();

  const handleChangeZoom = (newValue: any) => {
    dispatch(changeZoom(newValue));
  };

  const maxZoom = 100;

  return (
    <Wrapper>
      <Space size="small">
        <Text>{t('zoom')}</Text>
        <InputNumber
          min={1}
          max={maxZoom}
          defaultValue={zoom}
          value={zoom}
        // size="large"
          onChange={handleChangeZoom}
        />
      </Space>
      <Space style={{ width: 120 }} direction="vertical">
        <Row>
          <Col span={24}>
            <Slider
              min={1}
              max={maxZoom}
              onChange={onChange}
              value={typeof zoom === 'number' ? zoom : 0}
            />
          </Col>
        </Row>
      </Space>

    </Wrapper>
  );
};

export default Zoom;
