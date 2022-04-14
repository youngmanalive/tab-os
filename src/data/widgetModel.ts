import { makeAutoObservable } from 'mobx';
import { v4 } from 'uuid';
import type WidgetStore from './widgetStore';

export default class WidgetModel<T extends WidgetContent = WidgetContent> {
  id: string;
  position: { x: number; y: number };
  size: { w: number; h: number };
  content: T;
  isSoftDeleted: boolean;
  isFullScreen: boolean;

  private store: WidgetStore;

  constructor(store: WidgetStore, data: WidgetResource) {
    this.id = data.id;
    this.position = data.position;
    this.size = data.size;
    this.content = data.content as T;
    this.isSoftDeleted = data.isSoftDeleted;
    this.isFullScreen = !!data.isFullScreen;
    this.store = store;

    makeAutoObservable(this);
  }

  setPosition = (x: number, y: number) => {
    this.position.x = x;
    this.position.y = y;
  };

  setSize = (w: number, h: number) => {
    this.size.w = w;
    this.size.h = h;
  };

  setContentData = (data: WidgetContent['data']) => {
    this.content.data = data;
  };

  setContentTitle = (title: string) => {
    this.content.title = title;
  };

  setActive = () => {
    this.store.setActiveWidget(this.id);
  };

  toggleFullScreen = () => {
    this.isFullScreen = !this.isFullScreen;
  };

  delete = () => {
    if (this.shouldSoftDelete) {
      this.isSoftDeleted = true;
      return;
    }

    this.store.removeWidget(this.id);
  };

  restore = () => {
    this.setActive();
    this.isSoftDeleted = false;
  };

  toJSON = (): WidgetResource => ({
    id: this.id,
    position: this.position,
    size: this.size,
    content: this.content,
    isSoftDeleted: this.isSoftDeleted,
    isFullScreen: this.isFullScreen,
  });

  get shouldSoftDelete() {
    return ['clock', 'quote', 'emoji'].includes(this.content.type);
  }

  static note = (store: WidgetStore) => {
    return new this(store, {
      ...this.defaults(),
      content: { type: 'note', title: 'New Note', data: '' },
    });
  };

  static quote = (store: WidgetStore) => {
    return new this(store, {
      ...this.defaults(),
      content: {
        type: 'quote',
        title: 'Quote',
        data: { author: '', content: '', lastRequested: 1500000000000 },
      },
    });
  };

  static clock = (store: WidgetStore) => {
    return new this(store, {
      ...this.defaults(),
      content: { type: 'clock', title: 'Clock', data: null },
    });
  };

  static emoji = (store: WidgetStore) => {
    return new this(store, {
      ...this.defaults(),
      content: { type: 'emoji', title: 'Emoji', data: null },
    });
  };

  private static defaults = () => ({
    id: v4(),
    size: { w: 350, h: 350 },
    position: { x: 10, y: 10 },
    isSoftDeleted: false,
  });
}

export interface Note {
  type: 'note';
  title: string;
  data: string;
}

export interface Clock {
  type: 'clock';
  title: 'Clock';
  data: null;
}

export interface Quote {
  type: 'quote';
  title: 'Quote';
  data: {
    lastRequested: number;
    content: string;
    author: string;
  };
}

export interface Emoji {
  type: 'emoji';
  title: 'Emoji';
  data: null;
}

export type WidgetContent = Note | Clock | Quote | Emoji;

export interface WidgetResource {
  id: string;
  position: { x: number; y: number };
  size: { w: number; h: number };
  content: WidgetContent;
  isSoftDeleted: boolean;
  isFullScreen?: boolean;
}
