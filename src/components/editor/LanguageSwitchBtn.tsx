/* eslint-disable functional/no-return-void */
/* eslint-disable functional/no-expression-statements */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable functional/prefer-immutable-types */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Segmented } from 'antd';
import { useTranslation } from 'react-i18next';

const LanguageSwitchBtn = (): JSX.Element => {
  const { i18n } = useTranslation();
  const getLang = i18n.language;

  const handleChange = (newLanguage: any) => {
    i18n.changeLanguage(newLanguage);
  };

  return (
    <Segmented
      options={[
        { label: 'En', value: 'en' },
        { label: 'Ru', value: 'ru' },
      ]}
      value={getLang}
      onChange={handleChange}
    />
  );
};
export default LanguageSwitchBtn;
