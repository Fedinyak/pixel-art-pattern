/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable functional/prefer-immutable-types */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-restricted-imports */
/* eslint-disable functional/no-conditional-statements */
/* eslint-disable functional/no-return-void */
/* eslint-disable max-len */
/* eslint-disable functional/no-expression-statements */
/* eslint-disable functional/no-loop-statements */
/* eslint-disable functional/no-let */
/* eslint-disable array-callback-return */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import {
  addCells,
  addSvgCanvas,
  cellsType,
} from '../../slices/canvasSlice';
import Size from '../editor/Size';
import Zoom from '../editor/Zoom';
import Editor from '../editor/Editor';
import LanguageSwitchBtn from '../editor/LanguageSwitchBtn';
import createSvgCanvas from '../../utility/createSvgCanvas';
import ExportSvgSection from '../editor/ExportSvgSection';
import createCanvas from '../../utility/createCanvas';

const Logo = styled.h1`
  color: #FFFFFF;
  line-height: 0;
  font-size: 30px;
  font-weight: 900;
  margin-top: -11px;
  margin-bottom: 0px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 30px;
  padding-bottom: 750px;
  @media (min-width: 660px) {
    justify-content: flex-start;
    padding-bottom: 260px;
    padding-left: 60px;
  }
`;

const CanvasWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 300px;
  border: 1px solid #9e9e9e;
`;

const CanvasContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 320px;
  padding-left: 10px;
  padding-right: 10px;
  margin: auto;
  flex-direction: column;
  justify-content: center;
  background-color: #FFFFFF;
  z-index: 1;
  filter: drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.20));
  @media (min-width: 660px) {
    margin: 0;
  }
`;
const SizeWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;
const CanvasSection = () => {
  const {
    activeColor, backgroundColor, size, zoom, canvasWidth, eraser, cells, svgCanvas,
  } = useSelector((state: any) => state.canvas);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const repaintingBackgroundColor = () => {
    const repaintingCells: cellsType[] = [];
    cells.map((item: cellsType) => {
      if (item.backgroundType) {
        repaintingCells.push({ ...item, color: backgroundColor });
      } else {
        repaintingCells.push(item);
      }
    });
    return repaintingCells;
  };

  useEffect(() => {
    document.title = 'Pixel art pattern';
  }, []);

  useEffect(() => {
    dispatch(addCells(repaintingBackgroundColor()));
  }, [backgroundColor]);

  useEffect(() => {
    dispatch(addCells(createCanvas(size, backgroundColor)));
  }, [size]);

  useEffect(() => {
    const svg = createSvgCanvas(size, cells, backgroundColor);
    dispatch(addSvgCanvas(svg));
  }, [cells]);

  const handleClick = (e: any) => {
    console.log(e.target.id, 'e.target.id');
    const [, , indexCell] = e.target.id.split('-');

    const getCellIndex = (str: any) => {
      const [, getIndex] = str.split('index');
      return parseInt(getIndex, 10) - 1;
    };

    const newCells = [...cells];
    if (eraser) {
      const changedColor = {
        ...cells[getCellIndex(indexCell)],
        color: backgroundColor,
        backgroundType: true,
      };
      newCells[getCellIndex(indexCell)] = changedColor;
    } else {
      const changedColor = {
        ...cells[getCellIndex(indexCell)],
        color: activeColor,
        backgroundType: false,
      };
      newCells[getCellIndex(indexCell)] = changedColor;
    }
    dispatch(addCells(newCells));
    console.log(newCells, 'cells---');
  };

  return (
    <Container
      style={{
        backgroundColor,
        backgroundImage: `url(data:image/svg+xml;utf8;base64,${window.btoa(svgCanvas)})`,
        backgroundSize: zoom + 4,
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
      }}
    >
      <CanvasContainer>
        <div style={{ backgroundColor }}>
          <Logo>
            PIXEL ART PATTERN
          </Logo>
        </div>
        <div style={{ width: canvasWidth }}>
          <CanvasWrapper>
            {cells.map((item: any) => (
              <div
                style={{
                  backgroundColor: item.color,
                  width: `${canvasWidth / size}px`,
                  height: `${canvasWidth / size}px`,
                  boxSizing: 'border-box',
                  border: '1px solid #9E9E9E',
                }}
                onClick={handleClick}
                id={item.id}
                key={item.id}
              >
                <br />
              </div>
            ))}
          </CanvasWrapper>
        </div>
        <div style={{ width: canvasWidth, paddingBottom: 30 }}>
          <SizeWrap>
            <Size />
            <Button
              onClick={() => {
                dispatch(addCells(createCanvas(size, backgroundColor)));
              }}
            >
              {t('clearCanvas')}
            </Button>
          </SizeWrap>
          <Editor />
          <Zoom />
          <SizeWrap>
            <ExportSvgSection />
            <LanguageSwitchBtn />
          </SizeWrap>
        </div>
      </CanvasContainer>
    </Container>
  );
};

export default CanvasSection;
