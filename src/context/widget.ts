import WidgetModel, { WidgetContent } from 'data/widgetModel';
import { createContext, useContext } from 'react';

export const WidgetContext = createContext<WidgetModel | null>(null);

export const useWidget = <T extends WidgetContent = WidgetContent>() => {
  const widget = useContext(WidgetContext);

  if (!widget) {
    throw new Error('Widget not found');
  }

  return widget as WidgetModel<T>;
}