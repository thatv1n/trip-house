import { authAdminEpics } from '@/admin/adminAuth/auth-admin.epics';
import { EventsFilterEpic } from '@/components/eventsFilter';
import { GetCountriesEpic } from '@/components/header/header.epics';
import { authEpics, ChatEpics, GetEventsEpic, inviteEventEpic, profileEpic } from '@/features';
import { interestEpic } from '@/features/interest/interest.epics';
import { combineEpics } from 'redux-observable';

export const rootEpic = combineEpics(
  authEpics,
  EventsFilterEpic,
  GetEventsEpic,
  authAdminEpics,
  ChatEpics,
  profileEpic,
  interestEpic,
  inviteEventEpic,
  GetCountriesEpic,
);
