import { useWidget } from 'context/widget';
import type { Note as NoteContent } from 'data/widgetModel';
import { observer } from 'mobx-react';

const Note = () => {
  const widget = useWidget<NoteContent>();

  return (
    <>
      <textarea
        style={{
          backgroundColor: 'inherit',
          fontFamily: 'inherit',
          color: 'inherit',
          border: 0,
          resize: 'none',
          width: '100%',
          height: '100%',
          padding: 16,
          margin: 0,
          outline: 0,
        }}
        value={widget.content.data}
        onChange={(event) => widget.setContentData(event.currentTarget.value)}
      />
    </>
  );
};

export default observer(Note);
