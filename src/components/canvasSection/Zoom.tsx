/* eslint-disable no-restricted-globals */
/* eslint-disable functional/no-expression-statements */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable functional/no-return-void */
import React from 'react';
import {
  // Select,
  Space,
  Typography,
  Col,
  // InputNumber,
  Row,
  Slider, InputNumber,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { changeZoom } from '../../slices/canvasSlice';
// import { useDispatch } from 'react-redux';
// import { changeSize } from '../../slices/counterCanvas';

const { Text } = Typography;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 30px;
`;

// const IntegerStep = () => {
//   const { zoom}  = useSelector((state: any) => state.canvas);
//   const [inputValue, setInputValue] = useState(1);

//   const onChange = (newValue: number) => {
//     dispatch(changeSize(parseInt(value, 10)));
//     setInputValue(newValue);
//   };

//   return (
//     <Row>
//       <Col span={12}>
//         <Slider
//           min={1}
//           max={20}
//           onChange={onChange}
//           value={typeof zoom === 'number' ? zoom : 0}
//         />
//       </Col>
//       {/* <Col span={4}>
//         <InputNumber
//           min={1}
//           max={20}
//           style={{ margin: '0 16px' }}
//           value={inputValue}
//           onChange={onChange}
//         />
//       </Col> */}
//     </Row>
//   );
// };

// const DecimalStep: React.FC = () => {
//   const [inputValue, setInputValue] = useState(0);

//   const onChange = (value: number) => {
//     if (isNaN(value)) {
//       return;
//     }
//     setInputValue(value);
//   };

//   return (
//     <Row>
//       <Col span={12}>
//         <Slider
//           min={0}
//           max={1}
//           onChange={onChange}
//           value={typeof inputValue === 'number' ? inputValue : 0}
//           step={0.01}
//         />
//       </Col>
//       <Col span={4}>
//         <InputNumber
//           min={0}
//           max={1}
//           style={{ margin: '0 16px' }}
//           step={0.01}
//           value={inputValue}
//           onChange={onChange}
//         />
//       </Col>
//     </Row>
//   );
// };

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

  const maxZoom = 15;

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
          {/* <Col span={4}>
        <InputNumber
          min={1}
          max={20}
          style={{ margin: '0 16px' }}
          value={inputValue}
          onChange={onChange}
        />
      </Col>  */}
        </Row>
        {/* <DecimalStep /> */}
      </Space>

    </Wrapper>
  );
};

export default Zoom;
