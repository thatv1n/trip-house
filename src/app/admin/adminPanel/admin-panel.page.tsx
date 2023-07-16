/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { moderateEventApi } from './admin-panel.api';

import { getCitiesSelector } from '@/components/eventsFilter/eventsFilter.selector';

import { getCitiesAction } from '@/components/eventsFilter/eventsFilter.action';

import { Box, Col, Flex, Input, Row, Select, Typography } from '@/components';
import { Icon } from '@/components/icon/icon';
import { EventAdmin } from '../components';

import { FilterType } from '@/components/eventsFilter/eventsFilter.types';
import { EventAdminResponse, FilterAdminType } from './admin-panel.types';

import svgSource from '#/icons/search-mddem.svg';

import 'react-datepicker/dist/react-datepicker.css';

import { DataPickerRange } from '@/components/dataPickerRange';
import { getIpAdminAction } from '../adminAuth/auth-admin.action';
import { getGeoAdminSelector, getSessionAdminSelector } from '../adminAuth/auth-admin.selectors';

const Header = styled.div(() => {
  return {
    width: '100%',
    marginBottom: 30,
    display: 'flex',
    justifyContent: 'space-between',
  };
});

const WrapEvents = styled.div(() => {
  return {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    '@media (max-width: 1300px)': {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
    marginTop: 20,
  };
});

export const AdminPanelPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isFilterEvent, setIsFilterEvent] = useState<FilterAdminType | any>({ limit: 20, offset: 0 });
  const [events, setEvents] = useState<EventAdminResponse[]>([]);
  const [stateOffset, setStateOffset] = useState<number>(0);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const session = useSelector(getSessionAdminSelector);
  const cities = useSelector(getCitiesSelector);
  const geo = useSelector(getGeoAdminSelector);

  const { register, handleSubmit } = useForm();

  const getEventsModerate = async (filter: FilterAdminType | null): Promise<any> => {
    const response = await moderateEventApi.getEvent(filter).then((res) => {
      return res.json();
    });
    if (response.success) {
      setEvents(response.data);
      setIsLoading(false);
    } else {
      throw response.error;
    }
  };

  const paginationEventsModerate = async (filter: FilterAdminType | null): Promise<any> => {
    const response = await moderateEventApi.getEvent(filter).then((res) => {
      return res.json();
    });
    if (response.success) {
      setEvents((items) => [...items, ...response.data]);
      setIsLoading(false);
    } else {
      throw response.error;
    }
  };

  const EventFilter = (data: FilterAdminType): void => {
    const { city, status, text } = data;
    const filter: FilterAdminType = {
      city,
      status,
      text: text?.length > 3 && text,
    };
    setIsFilterEvent((obj: FilterAdminType) => ({ ...obj, ...filter }));
  };

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (geo?.country) dispatch(getCitiesAction.started(geo?.country));
  }, [geo]);

  useEffect(() => {
    if (session?.id) {
      dispatch(getIpAdminAction.started());
    }
  }, [session]);

  useEffect(() => {
    const filter = { ...isFilterEvent, limit: 20, offset: stateOffset };
    if (stateOffset) {
      paginationEventsModerate(filter);
    }
  }, [stateOffset]);

  useEffect(() => {
    setIsLoading(true);
    setIsFilterEvent((obj: FilterType) => ({
      ...obj,
      dateStart: dateRange[0] && dayjs(dateRange[0]).toString(),
      dateEnd: dateRange[1] && dayjs(dateRange[1]).toString(),
    }));
  }, [dateRange]);

  useEffect(() => {
    if (session && isFilterEvent) {
      getEventsModerate(isFilterEvent);
    }
  }, [isFilterEvent, session]);

  useEffect(() => {
    if (inView && events?.length >= 7) {
      setStateOffset((count) => count + 20);
    }
  }, [inView]);

  return (
    <Box css={{ padding: 40, width: '100%' }}>
      <Header>
        <Typography
          css={(theme: { color: { mainPurple: any } }) => ({
            fontSize: 35,
            color: theme.color.mainPurple,
            marginRight: 50,
          })}
        >
          Ивенты
        </Typography>
        <Typography
          css={(theme: { color: { mainPurple: any } }) => ({
            fontSize: 16,
            color: theme.color.mainPurple,
            textDecoration: 'underline',
            cursor: 'pointer',
          })}
          onClick={() => {
            navigate('categories');
          }}
        >
          Категории
        </Typography>
      </Header>
      <form onChange={handleSubmit(EventFilter)}>
        <Flex alignItems="center" flexWrap="wrap">
          <Typography
            css={(theme: { color: { black: any } }) => ({ fontSize: 16, color: theme.color.black, marginRight: 30 })}
          >
            Фильтр:
          </Typography>
          <Select
            colorArrow
            css={{ backgroundPosition: '90%', width: 186, padding: '1.1rem 1.6rem', marginRight: 20 }}
            {...register('status')}
          >
            <option disabled>По статусу</option>
            <option value="saved">На проверке</option>
            <option value="published">Опубликованные</option>
            {/* <option value="onModerate">На проверке</option> */}
            <option value="rejected">Удаленные</option>
          </Select>
          <Flex css={{ width: '23.6rem' }}>
            <DataPickerRange
              setDateRange={setDateRange}
              startDate={startDate}
              endDate={endDate}
              typeArrowPurple
              bg
              isClearButton
              mobileVersion={false}
            />
          </Flex>
          <Select
            colorArrow
            css={{ backgroundPosition: '90%', width: 186, padding: '1.1rem 1.6rem', margin: '0 2rem' }}
            {...register('city')}
          >
            <option value="">Все города</option>
            {cities?.map((item, i) => (
              <option key={i}>{`${item}`}</option>
            ))}
          </Select>
          <Input
            placeholder="Поиск"
            css={(theme) => ({ background: theme.color.white, width: 290 })}
            icon={<Icon css={{ width: '100%' }} source={svgSource} />}
            {...register('text')}
          />
        </Flex>
      </form>
      {isLoading ? (
        <Col css={{ marginTop: 20 }}>
          <Row>
            <Typography variant="body1">Загрузка...</Typography>
          </Row>
        </Col>
      ) : events?.length !== 0 ? (
        <WrapEvents>
          {events?.map((item: EventAdminResponse) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <EventAdmin
              key={item?.id}
              {...item}
              lastElem={events[events.length - 1].id === item.id ? ref : null}
              getEventsModerate={getEventsModerate}
              isFilterEvent={isFilterEvent}
            />
          ))}
        </WrapEvents>
      ) : (
        <Col css={{ marginTop: 20 }}>
          <Row>
            <Typography variant="body1">Сейчас ничего нет!</Typography>
          </Row>
        </Col>
      )}
    </Box>
  );
};
