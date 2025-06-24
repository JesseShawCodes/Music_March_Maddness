'use client'; // This is crucial for client-side components in App Router

import { Provider } from 'react-redux';
import store from './store'; // Adjust the path to your store

export function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
