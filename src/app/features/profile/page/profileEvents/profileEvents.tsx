/* eslint-disable no-nested-ternary */
import styled from '@emotion/styled';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { EventsMap, Flex, Input } from '@/components';
import { Icon } from '@/components/icon/icon';

import svgGeo from '#/icons/geo.svg';
import svgSource from '#/icons/search-mddem.svg';
import { FilterType } from '@/components/eventsFilter/eventsFilter.types';
import { EventResponse } from '@/features/aboutEvent/event.types';
import { getGeoSelector, getUserSelector } from '@/features/auth/auth.selectors';

import { EventProfile } from './components/event/event';
import { profileEventsApi } from './profileEvents.api';
import { ProfileEventsLoading } from './profileEvents.loading';

const Root = styled.div(() => {
  return {
    minWidth: '23.5rem',
    maxWidth: '143.4rem',
    margin: '0 auto',
    width: '100%',
    minHeight: '23.2rem',
    padding: '2rem',
    '@media (max-width: 914px)': {
      minHeight: 'auto',
      borderRadius: '0',
      padding: '0 1rem',
      marginBottom: '7.1rem',
    },
  };
});

const WrapEvents = styled.div(() => {
  return {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',

    '@media (max-width: 830px)': {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
    marginTop: 20,
    '@media (max-width: 734px)': {
      marginTop: 10,
      display: 'auto',
    },
  };
});

const BtnMap = styled.button(({ theme }) => {
  return {
    width: 56,
    height: 56,
    borderRadius: 10,
    border: 'none',
    background: theme.color.white,
    cursor: 'pointer',
    marginLeft: 16,
  };
});

export const ProfileEvents = () => {
  const [isMap, setIsMap] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState<EventResponse[]>([]);

  const [isTextFilter, setIsTextFilter] = useState<string>('');
  const [stateOffset, setStateOffset] = useState<number>(0);
  const [isFilterEvent, setIsFilterEvent] = useState<FilterType | any>({ limit: 20, offset: 0 });
  const [activeInputSearch, setActiveInputSearch] = useState(false);

  const { pathname } = useLocation();
  const id = pathname.split('/').filter((item) => !!item)[2];

  const geo = useSelector(getGeoSelector);
  const user = useSelector(getUserSelector);

  const goToMap = (): void => {
    setIsMap((type) => !type);
  };

  const getEvents = async (params: any): Promise<any> => {
    if (id === user?.id) {
      const response = await profileEventsApi.getMyEvents(params).then((res) => {
        return res.json();
      });
      if (response.success) {
        setEvents(response.data);
        setIsLoading(false);
      } else {
        throw response.error;
      }
    } else {
      const response = await profileEventsApi.getIdEvents(id, params).then((res) => {
        return res.json();
      });
      if (response.success) {
        setEvents(response.data);
        setIsLoading(false);
      } else {
        throw response.error;
      }
    }
  };

  const paginationEvents = async (params: any): Promise<any> => {
    if (id === user?.id) {
      const response = await profileEventsApi.getMyEvents(params).then((res) => {
        return res.json();
      });
      if (response.success) {
        setEvents((items) => [...items, ...response.data]);
        setIsLoading(false);
      } else {
        throw response.error;
      }
    } else {
      const response = await profileEventsApi.getIdEvents(id, params).then((res) => {
        return res.json();
      });
      if (response.success) {
        setEvents((items) => [...items, ...response.data]);
        setIsLoading(false);
      } else {
        throw response.error;
      }
    }
  };

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const isTextSearch = useCallback(
    debounce((text) => {
      setIsFilterEvent((obj: FilterType) => ({ ...obj, text }));
    }, 1000),
    [],
  );

  useEffect(() => {
    const filter = { ...isFilterEvent, limit: 20, offset: stateOffset };
    if (stateOffset) {
      paginationEvents(filter);
    }
  }, [stateOffset]);

  useEffect(() => {
    if (activeInputSearch) isTextSearch(isTextFilter);
  }, [isTextFilter]);

  useEffect(() => {
    if (user && isFilterEvent) {
      getEvents(isFilterEvent);
    }
  }, [isFilterEvent, user]);

  useEffect(() => {
    if (inView && events?.length >= 7) {
      setStateOffset((count) => count + 20);
    }
  }, [inView]);

  return (
    <Root>
      <Flex css={{ '@media (max-width: 734px)': { display: 'none' } }}>
        <Input
          placeholder="Поиск"
          onClick={() => setActiveInputSearch(true)}
          onChange={(e) => setIsTextFilter(e.target.value)}
          value={isTextFilter}
          css={{ background: '#FFFFFF', height: '5.6rem' }}
          wth="100%"
          icon={<Icon css={{ width: '100%', left: '2.25rem' }} source={svgSource} />}
        />
        <BtnMap onClick={goToMap}>
          <Icon css={{ width: '2rem', height: '2rem', margin: '0 auto' }} source={svgGeo} />
        </BtnMap>
      </Flex>
      {isLoading ? (
        <WrapEvents>
          <ProfileEventsLoading />
        </WrapEvents>
      ) : !isMap ? (
        <WrapEvents>
          {events?.map((item) => {
            return (
              <EventProfile
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...item}
                key={item.id}
                lastElem={events[events.length - 1].id === item.id ? ref : null}
              />
            );
          })}
        </WrapEvents>
      ) : (
        <EventsMap
          position={geo?.lat ? [geo.lat, geo.lon] : [55.751244, 37.618423]}
          isProfileEvents={events || []}
          center={geo?.lat ? [geo.lat, geo.lon] : [55.751244, 37.618423]}
        />
      )}
    </Root>
  );
};
