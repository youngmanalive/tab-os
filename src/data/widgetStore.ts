import { action, makeAutoObservable, reaction } from 'mobx';
import WidgetModel, { WidgetResource } from './widgetModel';
import storage from 'utils/storage';
import debounce from 'lodash.debounce';

export default class WidgetStore {
  widgets: WidgetModel[];

  constructor() {
    makeAutoObservable(this);

    this.widgets = storage.getWidgets().map(this.serialize);

    storage.listen(
      action((widgets) => {
        this.widgets = widgets.map(this.serialize);
      })
    );

    reaction(() => this.json, debounce(storage.setWidgets, 1500));
  }

  get displayedWidgets() {
    return this.widgets.filter((widget) => !widget.isSoftDeleted);
  }

  addNote = () => {
    this.addNew('note');
  };

  addQuote = () => {
    this.restoreOrAddNew('quote');
  };

  addClock = () => {
    this.restoreOrAddNew('clock');
  };

  addEmoji = () => {
    this.restoreOrAddNew('emoji');
  }

  setActiveWidget = (id: string) => {
    const index = this.findIndex(id);
    if (index > -1) {
      this.widgets.push(this.widgets.splice(index, 1)[0]);
    }
  };

  removeWidget = (id: string) => {
    const index = this.findIndex(id);
    if (index > -1) {
      this.widgets.splice(index, 1);
    }
  };

  findIndex = (id: string) => {
    return this.widgets.findIndex((widget) => widget.id === id);
  };

  findByType = (type: WidgetModel['content']['type']) => {
    return this.widgets.find((widget) => widget.content.type === type);
  };

  get canAddNote() {
    const noteWidgets = this.widgets.filter(
      (widget) => widget.content.type === 'note'
    );

    return noteWidgets.length < 3;
  }

  get canAddQuote() {
    const quote = this.findByType('quote');

    return !quote || quote.isSoftDeleted;
  }

  get canAddClock() {
    const clock = this.findByType('clock');

    return !clock || clock.isSoftDeleted;
  }

  get canAddEmoji() {
    const emoji = this.findByType('emoji');

    return !emoji || emoji.isSoftDeleted;
  }

  private get json() {
    return JSON.stringify(this.widgets);
  }

  private serialize = (resource: WidgetResource) =>
    new WidgetModel(this, resource);

  private restoreOrAddNew = (type: WidgetModel['content']['type']) => {
    const model = this.findByType(type);
    if (model && model.isSoftDeleted) {
      model.restore();
      return;
    }

    this.addNew(type);
  };

  private addNew = (type: WidgetModel['content']['type']) => {
    this.widgets.push(WidgetModel[type](this));
  }
}
