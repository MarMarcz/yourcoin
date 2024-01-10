// footerStore.ts
import { createStore } from 'redux';
import footerReducer from './footerReducer';

const devToolsExtension = typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION__;

export const footerStore = createStore(
  footerReducer,
  devToolsExtension && devToolsExtension()
);
