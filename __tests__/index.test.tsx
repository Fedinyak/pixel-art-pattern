/* eslint-disable functional/no-return-void */
/* eslint-disable functional/no-expression-statements */
import createSvgCanvas from '../src/utility/createSvgCanvas';
import stateCanvasCellsSize3 from '../__fixtures__/canvasCellsSize3';
import stateCanvasCellsSize7 from '../__fixtures__/canvasCellsSize7';
import svgResultSize3 from '../__fixtures__/svgResultSize3';
import svgResultSize7 from '../__fixtures__/svgResultSize7';
import createCanvas from '../src/utility/createCanvas';
import cellsSize3 from '../__fixtures__/cellsSize3';
import cellsSize7 from '../__fixtures__/cellsSize7';

test('createCanvas', () => {
  const canvasSize3 = createCanvas(3, '#009CE0');
  expect(canvasSize3).toEqual(cellsSize3);
  const canvasSize7 = createCanvas(7, '#009CE0');
  expect(canvasSize7).toEqual(cellsSize7);
});

test('createSvgCanvas', () => {
  const svgCanvasSize3 = createSvgCanvas(3, stateCanvasCellsSize3, '#fb9e00');
  expect(svgCanvasSize3).toEqual(svgResultSize3);
  const svgCanvasSize7 = createSvgCanvas(7, stateCanvasCellsSize7, '#000000');
  expect(svgCanvasSize7).toEqual(svgResultSize7);
});
