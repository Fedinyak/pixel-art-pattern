/* eslint-disable no-restricted-globals */
/* eslint-disable functional/no-expression-statements */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable functional/no-return-void */
import React from 'react';
import {
  // Select,
  Space, Typography, Col,
  // InputNumber,
  Row, Slider,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { changeZoom } from '../../slices/counterCanvas';
// import { useDispatch } from 'react-redux';
// import { changeSize } from '../../slices/counterCanvas';

const { Text } = Typography;

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
  return (
    <>
      <Text>
        Zoom
        {' '}
        {`${zoom}`}
      </Text>
      <Space style={{ width: '100%' }} direction="vertical">
        <Row>
          <Col span={12}>
            <Slider
              min={1}
              max={6}
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
      </Col> */}
        </Row>
        {/* <DecimalStep /> */}
      </Space>
    </>
  );
};

export default Zoom;
