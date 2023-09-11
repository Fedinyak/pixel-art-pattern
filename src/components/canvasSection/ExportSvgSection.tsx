/* eslint-disable functional/no-expression-statements */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable functional/no-return-void */
// import * as fs from 'fs';
import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'antd';
// import { saveAs } from 'file-saver';

const FileSaver = require('file-saver');

const ExportSvgSection = () => {
  const { size, svgCanvas } = useSelector((state: any) => state.canvas);

  const fileName = `pixel-art-pattern-${size}×${size}.svg`;

  const handleDownloadSvg = () => {
    // fs.writeFileSync(fileName, svgCanvas);
    // var canvas = document.getElementById("my-canvas");
    // const canvas = svgCanvas;
    // canvas.toBlob((blob:any) => {
    //   saveAs(blob, fileName);
    // });
    const blob = new Blob([svgCanvas], { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(blob, fileName);
  };

  return (
    <>
      {/* <a href={svgCanvas} download={fileName}>Download link</a> */}
      <Button onClick={handleDownloadSvg}>
        Download SVG
      </Button>
    </>
  );
};

export default ExportSvgSection;
