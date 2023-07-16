import { AuthApi, GetEventsApi } from '@/features';
import { RoDependencies } from '@/types';
import { browserHistory } from '@/utils';
import { applyMiddleware, createStore, Middleware, Store } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware, Epic } from 'redux-observable';

import { AuthAdminApi } from '@/admin/adminAuth/auth-admin.api';
import { EventsFilterApi } from '@/components/eventsFilter';
import { GetCountriesApi } from '@/components/header/header.api';
import { ChatApi } from '@/features/chat/';
import { InterestApi } from '@/features/interest/interest.api';
import { ProfileApi } from '@/features/profile/profileNew.api';
import { rootReducer } from './reducer';
import { InviteEventApi } from '@/features/invite-event/invite-event.api';

interface ConfigureStoreOptions {
  epic: Epic;
  middlewares: Middleware[];
}

function configureDependency(): RoDependencies {
  return {
    history: browserHistory,
    authApi: new AuthApi(),
    getEventsApi: new GetEventsApi(),
    menuShortEventsApi: new EventsFilterApi(),
    authAdminApi: new AuthAdminApi(),
    chatApi: new ChatApi(),
    profileApi: new ProfileApi(),
    interestApi: new InterestApi(),
    inviteEventApi: new InviteEventApi(),
    getCountriesApi: new GetCountriesApi(),
  };
}

export function configureStore({ epic, middlewares = [] }: ConfigureStoreOptions): Store<unknown> {
  const dependencies = configureDependency();
  const epicMiddleware = createEpicMiddleware({
    dependencies,
  });
  // TODO (luchko): add compose from redux for production build before release.
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(epicMiddleware, ...middlewares)));
  epicMiddleware.run(epic);

  return store;
}
