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
import {
  Button,
  // Space,
  // Layout,
  //  Col, Row
} from 'antd';
// import { incrementByAmount } from "../../slices/counterSlice";
// eslint-disable-next-line import/no-extraneous-dependencies
// import { Button } from 'antd';
// import { ColorPicker } from 'antd';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import {
  addCells,
  addSvgCanvas,
  cellsType,
  // changeActiveColor,
  // changeBackgroundColor,
  // changeSize,
  // changeZoom,
  // toggleEraser,
} from '../../slices/canvasSlice';
// import CanvasRepeatSection from './CanvasRepeatSection';
import Size from './Size';
import Zoom from './Zoom';
// import ColorPicker from './ColorPicker';
import ColorSection from './ColorSection';
import LanguageSwitchBtn from './LanguageSwitchBtn';
import createSvgCanvas from '../../utility/createSvgCanvas';
import ExportSvgSection from './ExportSvgSection';

// const { Content } = Layout;

const Logo = styled.h1`
  color: #FFFFFF;
  line-height: 0;
  font-size: 30px;
  /* font-size: 34.5px; */
  font-weight: 900;
  margin-top: -11px;
  margin-bottom: 0px;
  /* margin-right: -20px; */
  /* margin-left: -20px; */
  /* filter: drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.20)); */
`;

const Container = styled.div`
  display: flex;
  /* flex-wrap: nowrap; */
  justify-content: center;
  padding-top: 30px;
  padding-bottom: 320px;
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

// const CanvasRepeatWrapper = styled.div`
//   width: 100%;
//   /* width: 320px; */
//   height: 320px;
//   overflow: hidden;
//   filter: drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.20));
//   @media (min-width: 660px) {
//     width: 320px;
//     height: 640px;
//   }
// `;

// const CanvasRepeatFlexWrapper = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   width: 110%;
// `;

const SizeWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

// const FooterWrap = styled.footer`
//   margin-top: 60px;
//   width: 320px;
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-between;
//   align-items: center;
//   @media (min-width: 660px) {
//     /* width: 640px; */
//   }
// `;

// const Copyright = styled.p`
//   font-size: 14px;
//   color: #FFFFFF;
//   filter: drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.20));
// `;

const CanvasSection = () => {
  const {
    activeColor, backgroundColor, size, zoom, canvasWidth, eraser, cells, svgCanvas,
  } = useSelector((state: any) => state.canvas);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const createCanvas = (canvasSize: number): cellsType[] => {
    const resultCells = [];
    let counter = 0;
    for (let i = 0; i < canvasSize; i += 1) {
      for (let j = 0; j < canvasSize; j += 1) {
        counter += 1;
        resultCells.push({
          id: `row${i + 1}-col${j + 1}-index${counter}`,
          color: backgroundColor,
          backgroundType: true,
          // [`row${i + 1}col${j + 1}`]: { id: `row${i + 1}-col${j + 1}`, color: color, backgroundType: true, },
        });
      }
    }
    return resultCells;
  };

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
    dispatch(addCells(repaintingBackgroundColor()));
  }, [backgroundColor]);

  useEffect(() => {
    dispatch(addCells(createCanvas(size)));
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

  // const count = 1000;
  // const count = Math.round(((window.innerWidth / (size * (zoom + 1))) * ((window.innerHeight / 2) / (size * (zoom + 1)))) / 4 + 160);

  return (
    <Container
      style={{
        // display: 'flex',
        // flexWrap: 'nowrap',
        // justifyContent: 'center',
        // paddingTop: 30,
        // paddingBottom: 30,
        backgroundColor,
        backgroundImage: `url(data:image/svg+xml;utf8;base64,${window.btoa(svgCanvas)})`,
        // backgroundImage: `url(data:image/svg+xml;utf8,${svgCanvas})`,
        // backgroundImage: 'url("data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAxMzMzIDc1MCIgdmVyc2lvbj0iMS4xIj48cGF0aCBkPSJtIDAsMCAxMzMzLDAgMCwzMjAuNTMgLTcyLjY3LDQ4LjQyIDUyLjQ1LDM3LjU3IC0xMjYuMzEsNTIuODQgNTAuMTMsMTM2LjE5IC0xOS45OCwzNy4yNiAtMzkuNDcsLTExLjcxIC0zOC43NSw0MC40NyAtNjMuMzIsLTEyLjA3IC0zMC40NCwtMTM1LjYgLTcuOTQsMy4yOCAyNC43NCwxNDAuOTUgLTM4LjEzLDMwLjI2IC00NC4zNSwtMy4zMyAtMzUuODMsMjMuMzkgLTQ4LjkzLC0xMy4yMiAtMzguMjQsLTE0MS40OCAtMTAuNTcsMy42OCA2LjIsMTQ4Ljk3IC0zMy44OCwyMC40NiAtMjUuMjYsLTEzLjg1IC0yMi40OCwzMS40OSAtMjcuMzYsLTIyLjMyIC0zMiwyNC4zNCBMIDY4MC41NSw3MTguNiA2NjQuNyw1NjQgbCAtMTcuMDgsMC45MSAtMjEuODgsMTU5LjczIC0yOS4xNywyNS4zNiAtMS43MiwwIC0yNy44NCwtMjMuMDIgLTIzLjMsMTMuODggLTIxLjYsLTIwLjcxIC0yMi4zMSwxMS4yMSAtMjQuMTMsLTIzLjE4IDEwLjE0LC0xNTUuNCAtNC43NywtMi4yIC0zMy42NCwxNTcuNjMgLTI5Ljk3LDE0LjIxIC04LjgsLTEuMTcgLTM1LjIxLC0yMC4zOCAtMzQuMTcsMTAuNDEgLTguNjMsLTIuNzkgLTMyLjkzLC0yNi42OCAyNC45NiwtMTUxLjU0IC0xMC42NiwtMi4wOSAtNDUuNjIsMTQwLjM0IC0zMi40OSwxNS4zMyAtNTUuMDgsLTQwLjM2IC0zOC45OSw5LjA3IEwgMTA2LjgyLDYxOC40MyAxNTMuMjYsNDg2LjA2IDguODUsNDI4LjU3IDYzLjkzLDM4MC44NiAwLDMzMy4wNSB6IiBmaWxsPSIjZDIzZTJjIi8+PHBhdGggZD0iTSAzMDIuNzYsMzQuNTggNDY0Ljk4LDE1OC45MyA0MjMuMDcsMzY3LjM3IDI3Ny4yNywyODQuMjIgMTgxLjc5LDMzMi42NiA4MS41NywxNDMuMDggeiIgZmlsbD0iI2E4MzEyMyIvPjxwYXRoIGQ9Im0gMTA3OC45Miw0MC4xMSAxOTYuOSw3Ny44NCAtMTA5Ljk5LDI1My4wNyAtMTAzLjg5LC02MC4wNyAtMTUuMzcsMS45IC0xMTkuMDUsNDkuMjIgLTI1LjQ3LC0yMjcuMzQgeiIgZmlsbD0iI2E4MzEyMyIvPjxwYXRoIGQ9Im0gNjA1LjY1LDMyMi43NCAzLjYsMTA3LjE5IC0xMDAuNzYsMS41NyA2NC41OSwtMzMuMzggeiIgZmlsbD0iI2E4MzEyMyIvPjxwYXRoIGQ9Im0gNzE4LjUxLDMyNS4zIDMzLjMzLDc3LjAyIDc5LjQxLDI4LjI3IC0xMTkuOSwxOS40OSB6IiBmaWxsPSIjYTgzMTIzIi8+PC9zdmc+")',
        // backgroundImage: 'url(data:image/svg+xml;utf8,<svg version="1.1" baseProfile="full" width="3px" height="3px" xmlns="http://www.w3.org/2000/svg" ><rect x="0px" y="0px" width="1px" height="1px" fill="%23009CE0" /><rect x="1px" y="0px" width="1px" height="1px" fill="%23009CE0" /><rect x="2px" y="0px" width="1px" height="1px" fill="%23009CE0" /><rect x="0px" y="1px" width="1px" height="1px" fill="009CE0" /><rect x="1px" y="1px" width="1px" height="1px" fill="%23009CE0" /><rect x="2px" y="1px" width="1px" height="1px" fill="%23009CE0" /><rect x="0px" y="2px" width="1px" height="1px" fill="%23009CE0" /><rect x="1px" y="2px" width="1px" height="1px" fill="%23009CE0" /><rect x="2px" y="2px" width="1px" height="1px" fill="%23009CE0" /></svg>)',
        // backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width=\'10\' height=\'10\'><linearGradient id=\'gradient\'><stop offset=\'10%\' stop-color=\'%23F00\'/><stop offset=\'90%\' stop-color=\'%23fcc\'/> </linearGradient><rect fill=\'url(%23gradient)\' x=\'0\' y=\'0\' width=\'100%\' height=\'100%\'/></svg>")',
        backgroundSize: zoom + 4,
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
      }}
    >
      {/* <div style={{
        width: '100%',
        height: '100%',
        backgroundColor,
        backgroundImage: `url(data:image/svg+xml;utf8;base64,${window.btoa(svgCanvas)})`,
        // backgroundImage: `url(data:image/svg+xml;utf8,${svgCanvas})`,
        // backgroundImage: 'url("data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAxMzMzIDc1MCIgdmVyc2lvbj0iMS4xIj48cGF0aCBkPSJtIDAsMCAxMzMzLDAgMCwzMjAuNTMgLTcyLjY3LDQ4LjQyIDUyLjQ1LDM3LjU3IC0xMjYuMzEsNTIuODQgNTAuMTMsMTM2LjE5IC0xOS45OCwzNy4yNiAtMzkuNDcsLTExLjcxIC0zOC43NSw0MC40NyAtNjMuMzIsLTEyLjA3IC0zMC40NCwtMTM1LjYgLTcuOTQsMy4yOCAyNC43NCwxNDAuOTUgLTM4LjEzLDMwLjI2IC00NC4zNSwtMy4zMyAtMzUuODMsMjMuMzkgLTQ4LjkzLC0xMy4yMiAtMzguMjQsLTE0MS40OCAtMTAuNTcsMy42OCA2LjIsMTQ4Ljk3IC0zMy44OCwyMC40NiAtMjUuMjYsLTEzLjg1IC0yMi40OCwzMS40OSAtMjcuMzYsLTIyLjMyIC0zMiwyNC4zNCBMIDY4MC41NSw3MTguNiA2NjQuNyw1NjQgbCAtMTcuMDgsMC45MSAtMjEuODgsMTU5LjczIC0yOS4xNywyNS4zNiAtMS43MiwwIC0yNy44NCwtMjMuMDIgLTIzLjMsMTMuODggLTIxLjYsLTIwLjcxIC0yMi4zMSwxMS4yMSAtMjQuMTMsLTIzLjE4IDEwLjE0LC0xNTUuNCAtNC43NywtMi4yIC0zMy42NCwxNTcuNjMgLTI5Ljk3LDE0LjIxIC04LjgsLTEuMTcgLTM1LjIxLC0yMC4zOCAtMzQuMTcsMTAuNDEgLTguNjMsLTIuNzkgLTMyLjkzLC0yNi42OCAyNC45NiwtMTUxLjU0IC0xMC42NiwtMi4wOSAtNDUuNjIsMTQwLjM0IC0zMi40OSwxNS4zMyAtNTUuMDgsLTQwLjM2IC0zOC45OSw5LjA3IEwgMTA2LjgyLDYxOC40MyAxNTMuMjYsNDg2LjA2IDguODUsNDI4LjU3IDYzLjkzLDM4MC44NiAwLDMzMy4wNSB6IiBmaWxsPSIjZDIzZTJjIi8+PHBhdGggZD0iTSAzMDIuNzYsMzQuNTggNDY0Ljk4LDE1OC45MyA0MjMuMDcsMzY3LjM3IDI3Ny4yNywyODQuMjIgMTgxLjc5LDMzMi42NiA4MS41NywxNDMuMDggeiIgZmlsbD0iI2E4MzEyMyIvPjxwYXRoIGQ9Im0gMTA3OC45Miw0MC4xMSAxOTYuOSw3Ny44NCAtMTA5Ljk5LDI1My4wNyAtMTAzLjg5LC02MC4wNyAtMTUuMzcsMS45IC0xMTkuMDUsNDkuMjIgLTI1LjQ3LC0yMjcuMzQgeiIgZmlsbD0iI2E4MzEyMyIvPjxwYXRoIGQ9Im0gNjA1LjY1LDMyMi43NCAzLjYsMTA3LjE5IC0xMDAuNzYsMS41NyA2NC41OSwtMzMuMzggeiIgZmlsbD0iI2E4MzEyMyIvPjxwYXRoIGQ9Im0gNzE4LjUxLDMyNS4zIDMzLjMzLDc3LjAyIDc5LjQxLDI4LjI3IC0xMTkuOSwxOS40OSB6IiBmaWxsPSIjYTgzMTIzIi8+PC9zdmc+")',
        // backgroundImage: 'url(data:image/svg+xml;utf8,<svg version="1.1" baseProfile="full" width="3px" height="3px" xmlns="http://www.w3.org/2000/svg" ><rect x="0px" y="0px" width="1px" height="1px" fill="%23009CE0" /><rect x="1px" y="0px" width="1px" height="1px" fill="%23009CE0" /><rect x="2px" y="0px" width="1px" height="1px" fill="%23009CE0" /><rect x="0px" y="1px" width="1px" height="1px" fill="009CE0" /><rect x="1px" y="1px" width="1px" height="1px" fill="%23009CE0" /><rect x="2px" y="1px" width="1px" height="1px" fill="%23009CE0" /><rect x="0px" y="2px" width="1px" height="1px" fill="%23009CE0" /><rect x="1px" y="2px" width="1px" height="1px" fill="%23009CE0" /><rect x="2px" y="2px" width="1px" height="1px" fill="%23009CE0" /></svg>)',
        // backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width=\'10\' height=\'10\'><linearGradient id=\'gradient\'><stop offset=\'10%\' stop-color=\'%23F00\'/><stop offset=\'90%\' stop-color=\'%23fcc\'/> </linearGradient><rect fill=\'url(%23gradient)\' x=\'0\' y=\'0\' width=\'100%\' height=\'100%\'/></svg>")',
        backgroundSize: zoom + 5,
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
      }}
      > */}

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
            {/* </div> */}
          </CanvasWrapper>
        </div>
        <div style={{ width: canvasWidth, paddingBottom: 30 }}>
          <SizeWrap>
            <Size />
            <Button
              onClick={() => {
                dispatch(addCells(createCanvas(size)));
              }}
            >
              {t('clearCanvas')}
            </Button>
          </SizeWrap>

          <ColorSection />
          <Zoom />
          <SizeWrap>
            <ExportSvgSection />
            <LanguageSwitchBtn />
          </SizeWrap>
          {/* <Button onClick={handleDownloadSvg} >
              Export svg
            </Button> */}
          {/* <Copyright>© Andrey Fedinyak</Copyright> */}
        </div>
      </CanvasContainer>

      {/* <CanvasRepeatWrapper>
        <CanvasRepeatFlexWrapper style={{
          backgroundImage: `url(data:image/svg+xml;utf8;base64,${window.btoa(svgCanvas)})`,
          // backgroundImage: `url(data:image/svg+xml;utf8,${svgCanvas})`,
          // backgroundImage: 'url("data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAxMzMzIDc1MCIgdmVyc2lvbj0iMS4xIj48cGF0aCBkPSJtIDAsMCAxMzMzLDAgMCwzMjAuNTMgLTcyLjY3LDQ4LjQyIDUyLjQ1LDM3LjU3IC0xMjYuMzEsNTIuODQgNTAuMTMsMTM2LjE5IC0xOS45OCwzNy4yNiAtMzkuNDcsLTExLjcxIC0zOC43NSw0MC40NyAtNjMuMzIsLTEyLjA3IC0zMC40NCwtMTM1LjYgLTcuOTQsMy4yOCAyNC43NCwxNDAuOTUgLTM4LjEzLDMwLjI2IC00NC4zNSwtMy4zMyAtMzUuODMsMjMuMzkgLTQ4LjkzLC0xMy4yMiAtMzguMjQsLTE0MS40OCAtMTAuNTcsMy42OCA2LjIsMTQ4Ljk3IC0zMy44OCwyMC40NiAtMjUuMjYsLTEzLjg1IC0yMi40OCwzMS40OSAtMjcuMzYsLTIyLjMyIC0zMiwyNC4zNCBMIDY4MC41NSw3MTguNiA2NjQuNyw1NjQgbCAtMTcuMDgsMC45MSAtMjEuODgsMTU5LjczIC0yOS4xNywyNS4zNiAtMS43MiwwIC0yNy44NCwtMjMuMDIgLTIzLjMsMTMuODggLTIxLjYsLTIwLjcxIC0yMi4zMSwxMS4yMSAtMjQuMTMsLTIzLjE4IDEwLjE0LC0xNTUuNCAtNC43NywtMi4yIC0zMy42NCwxNTcuNjMgLTI5Ljk3LDE0LjIxIC04LjgsLTEuMTcgLTM1LjIxLC0yMC4zOCAtMzQuMTcsMTAuNDEgLTguNjMsLTIuNzkgLTMyLjkzLC0yNi42OCAyNC45NiwtMTUxLjU0IC0xMC42NiwtMi4wOSAtNDUuNjIsMTQwLjM0IC0zMi40OSwxNS4zMyAtNTUuMDgsLTQwLjM2IC0zOC45OSw5LjA3IEwgMTA2LjgyLDYxOC40MyAxNTMuMjYsNDg2LjA2IDguODUsNDI4LjU3IDYzLjkzLDM4MC44NiAwLDMzMy4wNSB6IiBmaWxsPSIjZDIzZTJjIi8+PHBhdGggZD0iTSAzMDIuNzYsMzQuNTggNDY0Ljk4LDE1OC45MyA0MjMuMDcsMzY3LjM3IDI3Ny4yNywyODQuMjIgMTgxLjc5LDMzMi42NiA4MS41NywxNDMuMDggeiIgZmlsbD0iI2E4MzEyMyIvPjxwYXRoIGQ9Im0gMTA3OC45Miw0MC4xMSAxOTYuOSw3Ny44NCAtMTA5Ljk5LDI1My4wNyAtMTAzLjg5LC02MC4wNyAtMTUuMzcsMS45IC0xMTkuMDUsNDkuMjIgLTI1LjQ3LC0yMjcuMzQgeiIgZmlsbD0iI2E4MzEyMyIvPjxwYXRoIGQ9Im0gNjA1LjY1LDMyMi43NCAzLjYsMTA3LjE5IC0xMDAuNzYsMS41NyA2NC41OSwtMzMuMzggeiIgZmlsbD0iI2E4MzEyMyIvPjxwYXRoIGQ9Im0gNzE4LjUxLDMyNS4zIDMzLjMzLDc3LjAyIDc5LjQxLDI4LjI3IC0xMTkuOSwxOS40OSB6IiBmaWxsPSIjYTgzMTIzIi8+PC9zdmc+")',
          // backgroundImage: 'url(data:image/svg+xml;utf8,<svg version="1.1" baseProfile="full" width="3px" height="3px" xmlns="http://www.w3.org/2000/svg" ><rect x="0px" y="0px" width="1px" height="1px" fill="%23009CE0" /><rect x="1px" y="0px" width="1px" height="1px" fill="%23009CE0" /><rect x="2px" y="0px" width="1px" height="1px" fill="%23009CE0" /><rect x="0px" y="1px" width="1px" height="1px" fill="009CE0" /><rect x="1px" y="1px" width="1px" height="1px" fill="%23009CE0" /><rect x="2px" y="1px" width="1px" height="1px" fill="%23009CE0" /><rect x="0px" y="2px" width="1px" height="1px" fill="%23009CE0" /><rect x="1px" y="2px" width="1px" height="1px" fill="%23009CE0" /><rect x="2px" y="2px" width="1px" height="1px" fill="%23009CE0" /></svg>)',
          // backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width=\'10\' height=\'10\'><linearGradient id=\'gradient\'><stop offset=\'10%\' stop-color=\'%23F00\'/><stop offset=\'90%\' stop-color=\'%23fcc\'/> </linearGradient><rect fill=\'url(%23gradient)\' x=\'0\' y=\'0\' width=\'100%\' height=\'100%\'/></svg>")',
          backgroundSize: zoom + 5,
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
        }}
        > */}
      {/* {
              [...Array(count)].map(() => (
                // eslint-disable-next-line react/jsx-key
                <CanvasRepeatSection cells={cells} size={size} zoom={zoom} />
              ))
            } */}
      {/* </CanvasRepeatFlexWrapper>
      </CanvasRepeatWrapper> */}
      {/* <FooterWrap>
        <LanguageSwitchBtn />
        <p>{count}</p>
        <Copyright>© Andrey Fedinyak</Copyright>
      </FooterWrap> */}
      {/* </div> */}
    </Container>
  );
};

export default CanvasSection;

// {
//   row1: [
//     {
//       col1: {
//         id: "row1-col1",
//         color: "#8f2c82",
//       },
//     },
//     {
//       col2: {
//         id: "row1-col2",
//         color: "#833333",
//       },
//     },
//   ],
// },
// {
//   row2: [
//     {
//       col1: {
//         id: "row2-col1",
//         color: "#222222",
//       },
//     },
//     {
//       col2: {
//         id: "row2-col2",
//         color: "#111111",
//       },
//     },
//   ],
// },

// rows: [
//   {
//     'row1col1': {
//       id: "row1col1",
//       color: "#8f2c82",
//     }
//   },
// {
//     'row1col1': {
//       id: "row1col1",
//       color: "#8f2c82",
//     }
//   },
// ]
// rows: [
//   {
//       id: "row1col1",
//       color: "#8f2c82",
//   },
// rows: [
// {
//   row1: [
//     {
//       col1: {
//         id: "row1-col1",
//         color: "#8f2c82",
//       },
//     },
// }
// ]
