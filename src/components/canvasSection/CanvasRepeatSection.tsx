/* eslint-disable functional/no-expression-statements */
/* eslint-disable array-callback-return */
import React from 'react';

const CanvasRepeatSection = (props: any): any => {
  const { cells, size, zoom } = props;
  return (
    <div style={{ width: size * (zoom * 3) }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
        {cells.map((item: any) => (
          <div
            style={{
              backgroundColor: item.color,
              width: `${zoom * 3}px`,
              height: `${zoom * 3}px`,
              boxSizing: 'border-box',
              // border: "medium dashed green",
            }}
            id={item.id}
            key={item.id}
          />
        ))}
      </div>
    </div>
  );
};

export default CanvasRepeatSection;
