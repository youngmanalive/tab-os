import { useWidget } from 'context/widget';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import AutosizeInput from 'react-input-autosize';

interface HeaderButtonProps {
  children: React.ReactNode;
  onClick: React.MouseEventHandler;
  color: 'red' | 'green';
}

const HeaderButton = ({ children, onClick, color }: HeaderButtonProps) => (
  <div
    className={`drag-box_header-button ${color}`}
    onMouseDown={(e) => e.stopPropagation()}
    onClick={onClick}
  >
    <div>{children}</div>
  </div>
);

const WidgetHeader = () => {
  const widget = useWidget();
  const [mouseDown, setMouseDown] = useState(0);

  const inputId = `title_${widget.id}`;

  const onMouseDown: React.MouseEventHandler<HTMLInputElement> = (event) => {
    if (document.activeElement?.id === inputId) {
      event.stopPropagation();
      setMouseDown(0);
    } else {
      event.preventDefault();
      setMouseDown(Date.now());
    }
  };

  const onMouseUp: React.MouseEventHandler<HTMLInputElement> = (event) => {
    if (mouseDown && Date.now() - mouseDown < 200) {
      event.currentTarget.focus();
    }
  };

  const onBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
    if (!event.currentTarget.value) {
      const { type } = widget.content;
      widget.setContentTitle(`${type[0].toUpperCase()}${type.slice(1)}`);
    }
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    widget.setContentTitle(event.currentTarget.value);
  };

  return (
    <div className='drag-box_header'>
      <AutosizeInput
        id={inputId}
        className='drag-box_title'
        value={widget.content.title}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onChange={onChange}
        onBlur={onBlur}
        maxLength={28}
        disabled={widget.content.type !== 'note'}
      />
      <div className='drag-box_header-controls'>
        <HeaderButton color='green' onClick={widget.toggleFullScreen}>
          &harr;
        </HeaderButton>
        <HeaderButton color='red' onClick={widget.delete}>
          &times;
        </HeaderButton>
      </div>
    </div>
  );
};

export default observer(WidgetHeader);
