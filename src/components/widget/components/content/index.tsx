import { useWidget } from 'context/widget';
import { WidgetContent as WidgetContentType } from 'data/widgetModel';
import { observer } from 'mobx-react';
import Note from './note';
import Quote from './quote';
import Clock from './clock';
import Emoji from './emoji';

const WIDGET_CONTENT_MAP: { [key in WidgetContentType['type']]: () => JSX.Element } =
  {
    note: Note,
    quote: Quote,
    clock: Clock,
    emoji: Emoji,
  };

const WidgetContent = () => {
  const widget = useWidget();

  const Component = WIDGET_CONTENT_MAP[widget.content.type];

  return <div className='drag-box_content'><Component /></div>;
};

export default observer(WidgetContent);
