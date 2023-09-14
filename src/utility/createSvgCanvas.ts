/* eslint-disable max-len */
/* eslint-disable functional/no-conditional-statements */
/* eslint-disable functional/no-return-void */
/* eslint-disable functional/no-expression-statements */
const createSvgCanvas = (size:number, cells: any, backgroundColor:string) => {
  const openTag = `<svg
      version="1.1"
      baseProfile="full"
      width="${size}px"
      height="${size}px"
      xmlns="http://www.w3.org/2000/svg"
    >`;
  const closeTag = '</svg>';
  const result = [];
  result.push(openTag);

  cells.forEach((item: any) => {
    const [rowNum, colNum] = item.id.split('-');
    const [, row] = rowNum.split('row');
    const [, col] = colNum.split('col');
    // eslint-disable-next-line functional/no-let
    let color;
    if (item.backgroundType) {
      color = backgroundColor;
    } else {
      console.log(item.color);
      color = item.color;
    }
    // const colorRectangle = `<rect x="${col - 1}px" y="${row - 1}px" width="${zoom}px" height="${zoom}px" fill="${color}" />`;
    const colorRectangle = `<rect x="${col - 1}px" y="${row - 1}px" width="1px" height="1px" fill="${color}" />`;
    result.push(colorRectangle);
  });

  result.push(closeTag);
  return result.join('');
};

// { /* <svg
// version='1.1'
// baseProfile='full'
// width='3px'
// height='3px'
// xmlns='http://www.w3.org/2000/svg'
// eslint-disable-next-line max-len
// ><rect x='0px' y='0px' width='1px' height='1px' fill='#F44E3B' /><rect x='1px' y='0px' width='1px' height='1px' fill='#653294' /><rect x='2px' y='0px' width='1px' height='1px' fill='#a4dd00' /><rect x='0px' y='1px' width='1px' height='1px' fill='#d33115' /><rect x='1px' y='1px' width='1px' height='1px' fill='#f44e3b' /><rect x='2px' y='1px' width='1px' height='1px' fill='#f44e3b' /><rect x='0px' y='2px' width='1px' height='1px' fill='#F44E3B' /><rect x='1px' y='2px' width='1px' height='1px' fill='#b0bc00' /><rect x='2px' y='2px' width='1px' height='1px' fill='#653294' /></svg> */ }

export default createSvgCanvas;
