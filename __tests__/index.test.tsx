/* eslint-disable functional/no-return-void */
/* eslint-disable functional/no-expression-statements */
import stateCanvasCells from '../__fixtures__/canvasCells';
import svgResult from '../__fixtures__/svgResult';
import createSvgCanvas from '../src/utility/createSvgCanvas';

test('createSvgCanvas', () => {
  const size = 3;
  const backgroundColor = '#fb9e00';
  const svgCanvas = createSvgCanvas(size, stateCanvasCells, backgroundColor);
  expect(svgCanvas).toEqual(svgResult);
});
