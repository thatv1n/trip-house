import { Global, ThemeProvider } from '@emotion/react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { Root } from '@/components/root';
import { configureStore, rootEpic } from '@/store';
import { baseLine } from '../styles';
import { theme } from '../theme';
import { Router } from './components';
import { browserHistory, initTolgee, wsMiddleware } from './utils';
import { profileAuthAction } from './features/auth/auth.actions';
import { profileAuthAdminAction } from './admin/adminAuth/auth-admin.action';
import { TolgeeProvider } from '@tolgee/react';

const rootDomNode = document.getElementById('root');
const store = configureStore({ epic: rootEpic, middlewares: [wsMiddleware] });
store.dispatch(profileAuthAdminAction.started());
store.dispatch(profileAuthAction.started());

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(rootDomNode!);
const tolgee = initTolgee();

root.render(
  <ThemeProvider theme={theme}>
    <TolgeeProvider tolgee={tolgee} fallback="Tolgee loading...">
      <Global styles={baseLine} />
      <Provider store={store}>
        <Router history={browserHistory}>
          <Root />
        </Router>
      </Provider>
    </TolgeeProvider>
  </ThemeProvider>,
);
