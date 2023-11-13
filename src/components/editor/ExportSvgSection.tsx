/* eslint-disable functional/no-expression-statements */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable functional/no-return-void */
// import * as fs from 'fs';
import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

const FileSaver = require('file-saver');

const ExportSvgSection = () => {
  const { size, svgCanvas } = useSelector((state: any) => state.canvas);
  const { t } = useTranslation();
  const fileName = `pixel-art-pattern-${size}×${size}.svg`;

  const handleDownloadSvg = () => {
    const blob = new Blob([svgCanvas], { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(blob, fileName);
  };

  return (
    <Button onClick={handleDownloadSvg}>
      {t('downloadSvg')}
    </Button>
  );
};

export default ExportSvgSection;
