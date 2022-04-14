import type { WidgetResource } from 'data/widgetModel';

const STORAGE_KEY = '__tabOS_widgets';

class Storage {
  getWidgets = () => {
    try {
      return JSON.parse(
        localStorage.getItem(STORAGE_KEY) || '[]'
      ) as WidgetResource[];
    } catch (e) {
      console.warn('Error fetching stored widgets');
      return [];
    }
  };

  setWidgets = (data: string) => {
    try {
      localStorage.setItem(STORAGE_KEY, data);
      console.log('Widgets saved!');
    } catch (e) {}
  };

  listen = (callback: (widgets: WidgetResource[]) => void) => {
    window.addEventListener('storage', (event) => {
      if (event.key === STORAGE_KEY) {
        callback(this.getWidgets());
      }
    })
  }
}

export default new Storage();
