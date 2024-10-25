import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { createStore } from './store/store';
import { createRouter } from './components/router';

// import { localServerApi as localApi } from './api/local-server-api';
import { createServerApi } from './api/server-api';

const serverApi = createServerApi({
  host: "localhost",
  port: 3030
});

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement!);
const store = createStore(serverApi);
const router = createRouter(store);

root.render(
  <Provider store={store}>
    <ThemeProvider theme={{}}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>,
);
