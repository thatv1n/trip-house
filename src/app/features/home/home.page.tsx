import styled from '@emotion/styled';
import dayjs from 'dayjs';
import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { Flex, Input, Typography } from '@/components';
import { EventsFilter, EventsFilterMobile } from '@/components/eventsFilter';
import { FilterType } from '@/components/eventsFilter/eventsFilter.types';
import { Icon } from '@/components/icon/icon';

import svgFilter from '#/icons/filter.svg';
import svgGeo from '#/icons/geo.svg';
import svgSource from '#/icons/search-mddem.svg';

import { getCountry } from '@/utils';
import { T, useTranslate } from '@tolgee/react';
import { getGeoSelector } from '../auth/auth.selectors';
import { EventsOrMap } from './components';
import { getEventsAction, paginationEventsAction } from './home.page.action';
import { HomePageLoading } from './home.page.loading';
import { getEventsSelector } from './home.page.selector';

const BtnMap = styled.button(({ theme }) => {
  return {
    width: 56,
    height: 56,
    borderRadius: 10,
    border: 'none',
    background: theme.color.white,
    cursor: 'pointer',
    marginLeft: 8,
    transition: 'opacity 0.3 ease-in-out',
    '&:active': {
      opacity: 0.5,
    },
    '@media (max-width: 734px)': { position: 'absolute', top: 13, left: 0, width: 32, height: 22 },
  };
});

const BtnFilter = styled.button(({ theme }) => {
  return {
    width: 56,
    height: 56,
    borderRadius: 10,
    border: 'none',
    background: theme.color.white,
    cursor: 'pointer',
    marginLeft: 16,
    display: 'none',
    transition: 'opacity 0.3 ease-in-out',
    '&:active': {
      opacity: 0.5,
    },

    '@media (max-width: 734px)': { position: 'absolute', top: 13, right: 9, width: 38, height: 25, display: 'block' },
  };
});

const Tabs = styled.div(({ theme }) => {
  return {
    background: theme.colors.bg,
    width: '100%',
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    padding: '0.3rem ',
    margin: '0 1.6rem',
    marginBottom: '1.3rem',
  };
});

const OneTab = styled.div<{ isBg: string }>(({ isBg }) => {
  return {
    width: '100%',
    height: '100%',
    background: isBg,
    borderRadius: '0.8rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background 0.2s ease-in-out',
  };
});

export const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslate();

  const [range, setRange] = useState<string>('0');
  const [isMap, setIsMap] = useState<boolean>(false);
  const [isFilterEvent, setIsFilterEvent] = useState<FilterType>({ limit: 20, offset: 0 });
  const [isTextFilter, setIsTextFilter] = useState<string>('');
  const [stateOffset, setStateOffset] = useState<number>(0);
  const [dateRange, setDateRange] = useState([null, null]);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [categoriesSelect, setCategoriesSelected] = useState<any>('');
  const [activeInputSearch, setActiveInputSearch] = useState(false);

  const [startDate, endDate] = dateRange;

  const geo = useSelector(getGeoSelector);
  const events = useSelector(getEventsSelector);

  const getCountryLocalStorage = getCountry();

  const location = useLocation().pathname.split('/');

  const goToMap = (): void => {
    if (location[2]?.length) {
      navigate('/events');
      setIsMap(false);
    } else {
      setIsMap((type) => !type);
    }
    if (isMap)
      setIsFilterEvent((obj: FilterType) => ({
        ...obj,
        limit: 20,
      }));
  };

  const EventFilter = useCallback(
    (data: FilterType): void => {
      const { city, categoryId } = data;
      setIsFilterEvent((obj: FilterType) => ({
        ...obj,
        lat: geo?.lat,
        lon: geo?.lon,
        categoryId,
        radius: range,
        city,
        country: getCountryLocalStorage,
      }));
    },
    [geo, range],
  );

  useEffect(() => {
    setIsFilterEvent((obj: FilterType) => ({ ...obj, country: getCountryLocalStorage }));
  }, []);

  const isTextSearch = useCallback(
    debounce((text) => {
      setIsFilterEvent((obj: FilterType) => ({ ...obj, text }));
    }, 1000),
    [],
  );

  const isModalClose = (e: any): void => {
    const { target } = e;
    if (
      target.getAttribute('data-target') ||
      target.tagName === 'path' ||
      (target.tagName === 'svg' && !target.className.baseVal)
    ) {
      setIsShowFilter(false);
    }
  };

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (isFilterEvent) dispatch(getEventsAction.started(isFilterEvent));
  }, [isFilterEvent]);

  useEffect(() => {
    const filter = { ...isFilterEvent, limit: 20, offset: stateOffset };
    if (stateOffset) {
      dispatch(paginationEventsAction.started(filter));
    }
  }, [stateOffset]);

  useEffect(() => {
    if (location[2]?.length) setIsMap(true);
  }, [location]);

  useEffect(() => {
    if (isMap) {
      setIsFilterEvent((obj: FilterType) => ({
        ...obj,
        limit: 101,
        offset: 0,
      }));
    }
  }, [isMap]);

  useEffect(() => {
    if (dateRange[0] && dateRange[1]) {
      setIsFilterEvent((obj: FilterType) => ({
        ...obj,
        dateStart: dayjs(dateRange[0]).toString(),
        dateEnd: dayjs(dateRange[1]).toString(),
      }));
    }
  }, [dateRange]);

  useEffect(() => {
    if (activeInputSearch) isTextSearch(isTextFilter);
  }, [isTextFilter]);

  useEffect(() => {
    if (inView && events?.length >= 7) {
      setStateOffset((count) => count + 20);
    }
  }, [inView]);

  useEffect(() => {
    if (events) setIsLoading(false);
  }, [events]);

  return (
    <Flex
      css={(theme) => ({
        justifyContent: 'center',
        marginBottom: '4.7rem',
        '@media (max-width: 768px)': {
          flexDirection: 'column',
          marginBottom: '7.1rem',
        },
      })}
    >
      <Flex
        css={(theme: { color: { white: string } }) => ({
          background: theme.color.white,
          display: 'none',
          position: 'relative',
          top: -2,
          '@media (max-width: 734px)': { display: 'flex' },
        })}
      >
        <Tabs>
          <OneTab isBg="#FFF">
            <Typography variant="body1">
              <T keyName="common.events">Ивенты</T>
            </Typography>
          </OneTab>
        </Tabs>
      </Flex>
      <EventsFilter
        range={range}
        setRange={setRange}
        eventFilter={EventFilter}
        setIsFilterEvent={setIsFilterEvent}
        setIsTextFilter={setIsTextFilter}
        setDateRange={setDateRange}
        startDate={startDate}
        endDate={endDate}
        isMap={isMap}
      />
      <Flex
        flexDirection="column"
        css={{ maxWidth: 1070, width: '100%', marginLeft: '2rem', '@media (max-width: 768px)': { marginLeft: '0' } }}
      >
        <Flex
          css={(theme: { color: { white: string } }) => ({
            '@media (max-width: 734px)': {
              background: theme.color.white,
              height: '5rem',
              padding: '0 1.6rem',
              marginTop: '-0.2rem',
              marginBottom: '1rem',
            },
          })}
        >
          <Input
            placeholder={t('common.search', 'Поиск')}
            onClick={() => setActiveInputSearch(true)}
            onChange={(e) => setIsTextFilter(e.target.value)}
            css={(theme) => ({
              background: theme.color.white,
              height: '5.6rem',
              '@media (max-width: 734px)': { background: theme.color.bg, height: '4rem' },
            })}
            wth="100%"
            value={`${isTextFilter}`}
            icon={
              <Icon css={{ width: '100%', '@media (max-width: 734px)': { marginTop: '-1rem' } }} source={svgSource} />
            }
          />
          <BtnMap onClick={goToMap}>
            <Icon css={{ width: '2rem', height: '2rem', margin: '0 auto' }} source={svgGeo} />
          </BtnMap>
          <BtnFilter onClick={() => setIsShowFilter((view) => !view)}>
            <Icon css={{ width: '2rem', height: '2rem', margin: '0 auto' }} source={svgFilter} />
          </BtnFilter>
          {isShowFilter && (
            <EventsFilterMobile
              range={range}
              setRange={setRange}
              eventFilter={EventFilter}
              setIsFilterEvent={setIsFilterEvent}
              setIsTextFilter={setIsTextFilter}
              setDateRange={setDateRange}
              startDate={startDate}
              endDate={endDate}
              isMap={isMap}
              isModalClose={isModalClose}
              setCategoriesSelected={setCategoriesSelected}
              categoriesSelect={categoriesSelect}
            />
          )}
        </Flex>
        {isLoading ? <HomePageLoading /> : <EventsOrMap isMap={isMap} lastElem={ref} range={range} />}
      </Flex>
    </Flex>
  );
};
