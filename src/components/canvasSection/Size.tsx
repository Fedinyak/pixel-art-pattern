/* eslint-disable functional/no-expression-statements */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable functional/no-return-void */

import React from 'react';
import { Select, Space, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { changeSize } from '../../slices/counterCanvas';

const { Text } = Typography;

const SelectSize = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const handleChange = (value: string) => {
    dispatch(changeSize(parseInt(value, 10)));
  };

  return (
    <>
      <Text>{t('selectSize')}</Text>
      <Space wrap>
        <Select
          defaultValue="3"
        // style={{ width: 120 }}
          onChange={handleChange}
          options={[
            { value: '3', label: '3 × 3' },
            { value: '4', label: '4 × 4' },
            { value: '5', label: '5 × 5' },
            { value: '6', label: '6 × 6' },
            { value: '7', label: '7 × 7' },
          ]}
        />
      </Space>
    </>
  );
};

export default SelectSize;
