import { observer } from 'mobx-react';

import type WidgetModel from 'data/widgetModel';
import WidgetContent from './components/content';
import WidgetHeader from './components/header';
import WidgetFrame from './components/frame';
import { WidgetContext } from 'context/widget';

interface WidgetProps {
  widget: WidgetModel;
}

const Widget = ({ widget }: WidgetProps) => (
  <WidgetContext.Provider value={widget}>
    <WidgetFrame>
      <WidgetHeader />
      <WidgetContent />
    </WidgetFrame>
  </WidgetContext.Provider>
);

export default observer(Widget);
