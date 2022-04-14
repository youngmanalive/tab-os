import Widget from 'components/widget';
import WidgetStore from 'data/widgetStore';
import { observer } from 'mobx-react';

const widgetStore = new WidgetStore();

function App() {
  return (
    <div className='app'>
      <button onClick={widgetStore.addNote} disabled={!widgetStore.canAddNote}>
        note
      </button>
      <button
        onClick={widgetStore.addClock}
        disabled={!widgetStore.canAddClock}
      >
        clock
      </button>
      <button
        onClick={widgetStore.addQuote}
        disabled={!widgetStore.canAddQuote}
      >
        quote
      </button>
      <button
        onClick={widgetStore.addEmoji}
        disabled={!widgetStore.canAddEmoji}
      >
        emoji
      </button>
      {widgetStore.displayedWidgets.map((widget) => (
        <Widget key={widget.id} widget={widget} />
      ))}
    </div>
  );
}

export default observer(App);
