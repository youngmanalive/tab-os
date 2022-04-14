import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react';

import { useSize } from 'context/size';
import { Resizable, ResizableBoxProps } from 'react-resizable';
import Draggable from 'react-draggable';
import { useWidget } from 'context/widget';

const MIN_WIDTH = 200;
const MIN_HEIGHT = 150;

const WidgetFrame: React.FC = ({ children }) => {
  const widget = useWidget();

  const { position, size } = widget;

  const nodeRef = useRef<HTMLDivElement>(null);
  const windowSize = useSize();

  useEffect(() => {
    const x =
      size.w > windowSize.width - position.x
        ? Math.max(0, windowSize.width - size.w)
        : position.x;
    const y =
      size.h > windowSize.height - position.y
        ? Math.max(0, windowSize.height - size.w)
        : position.y;
    const w = x
      ? size.w
      : Math.max(MIN_WIDTH, Math.min(size.w, windowSize.width - x));
    const h = y
      ? size.h
      : Math.max(MIN_HEIGHT, Math.min(size.h, windowSize.height - y));

    widget.setSize(w, h);
    widget.setPosition(x, y);
  }, [windowSize]); // eslint-disable-line react-hooks/exhaustive-deps

  const onResize: ResizableBoxProps['onResize'] = (_event, { size }) => {
    widget.setSize(
      Math.min(size.width, windowSize.width - position.x),
      Math.min(size.height, windowSize.height - position.y)
    );
  };

  const pos = !widget.isFullScreen ? position : { x: 0, y: 0 };
  const dim = !widget.isFullScreen
    ? size
    : { w: windowSize.width, h: windowSize.height };

  return (
    <Draggable
      bounds='body'
      handle='.drag-box_header'
      nodeRef={nodeRef}
      onDrag={(_, { x, y }) => widget.setPosition(x, y)}
      onMouseDown={widget.setActive}
      position={pos}
      disabled={widget.isFullScreen}
    >
      <div ref={nodeRef}>
        <Resizable
          width={dim.w}
          height={dim.h}
          minConstraints={[MIN_WIDTH, MIN_HEIGHT]}
          onResize={onResize}
        >
          <div
            className={`drag-box ${widget.isFullScreen ? 'full' : ''}`}
            style={{ width: dim.w, height: dim.h }}
          >
            {children}
          </div>
        </Resizable>
      </div>
    </Draggable>
  );
};

export default observer(WidgetFrame);
