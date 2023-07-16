import { authAdminReducer } from '@/admin/adminAuth/auth-admin.reducer';
import { EventsFilterReducer } from '@/components/eventsFilter/eventsFilter.reducer';
import { countriesReducer } from '@/components/header/header.reducers';
import { authReducer } from '@/features/auth/auth.reducer';
import { chatReducer } from '@/features/chat/chat.reducer';
import { eventsReducer } from '@/features/home/home.page.reducer';
import { interestReducer } from '@/features/interest/interest.reducer';
import { inviteEventReducer } from '@/features/invite-event/invite-event.reducer';
import { profileReducer } from '@/features/profile/profile.reducer';
import { loadingReducer } from '@ro-loading';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  auth: authReducer,
  events: eventsReducer,
  menuShortEvents: EventsFilterReducer,
  loading: loadingReducer,
  authA: authAdminReducer,
  chat: chatReducer,
  profile: profileReducer,
  interest: interestReducer,
  inviteEvent: inviteEventReducer,
  countries: countriesReducer,
});
