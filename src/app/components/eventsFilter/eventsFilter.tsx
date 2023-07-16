/* eslint-disable react/jsx-props-no-spreading */
import styled from '@emotion/styled';
import { FC, memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import 'react-datepicker/dist/react-datepicker.css';

import { Flex } from '../box';
import { Button } from '../button';
import { Col, Row } from '../grid';
import { Select } from '../select';
import { Typography } from '../typography';
import { getCategoryAction } from './eventsFilter.action';
import { FilterType, menuShortEventsState } from './eventsFilter.types';

import { getCitiesSelector } from './eventsFilter.selector';

import { getCountry } from '@/utils';
import { DataPickerRange } from '../dataPickerRange';
import { useTranslate } from '@tolgee/react';

interface TypeProps {
  range: string;
  setRange: (active: any) => void;
  eventFilter: (data: FilterType) => void;
  setIsFilterEvent: (data: any | null) => void;
  setIsTextFilter: (data: string) => void;
  setDateRange: (data: any) => void;
  startDate: any;
  endDate: any;
  isMap: boolean;
}

const Body = styled.div(({ theme }) => {
  return {
    width: 343,
    height: '100%',
    backgroundColor: theme.colors.white,
    borderRadius: '1rem',
    minWidth: '23.5rem',
    padding: '1.6rem',
    '@media (max-width: 768px)': { margin: '0 auto', marginBottom: '1rem', width: '94%' },
    '@media (max-width: 734px)': { display: 'none' },
  };
});

const Tabs = styled.div(({ theme }) => {
  return {
    width: '100%',
    background: theme.colors.bg,
    height: 40,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    padding: '0.3rem 0.2rem',
    marginBottom: '3rem',
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

const InputRange = styled.input(({ theme }) => {
  return {
    borderRadius: '1rem',
    WebkitAppearance: 'none',
    '&::-webkit-slider-thumb': {
      appearance: 'none',
      backgroundColor: theme.color.mainPurple,
      cursor: 'pointer',
      height: ' 1.5rem',
      width: '1.5rem',
      borderRadius: '100%',
      marginTop: -5,
    },
    '&::-webkit-slider-runnable-track': {
      background: theme.color.bg,
      height: 5,
      width: '100%',
      borderRadius: 10,
      marginTop: 10,
    },
  };
});

export const EventsFilter: FC<TypeProps> = memo(
  ({ range, setRange, eventFilter, setIsFilterEvent, setIsTextFilter, setDateRange, startDate, endDate, isMap }) => {
    const categories = useSelector((state: menuShortEventsState) => state.menuShortEvents.categories);
    const cities = useSelector(getCitiesSelector);
    const getCountryLocalStorage = getCountry();
    const { t } = useTranslate();

    const dispatch = useDispatch();
    const tabs = [t('common.events', 'Ивенты')];
    const [activeTab, setActiveTab] = useState(0);

    const toggleTab = (key: number): void => {
      setActiveTab(key);
    };

    useEffect(() => {
      dispatch(getCategoryAction.started(null));
    }, []);

    const { register, handleSubmit, reset } = useForm();

    const ResetFilter = (): void => {
      reset();
      setRange('0');
      setIsFilterEvent({
        limit: isMap ? 101 : 20,
        offset: 0,
        country: getCountryLocalStorage,
      });
      setIsTextFilter('');
      setDateRange([null, null]);
    };

    return (
      <Body>
        <Tabs>
          {tabs.map((item, i) => {
            return (
              <OneTab isBg={`${activeTab === i && '#FFF'}`} onClick={() => toggleTab(i)} key={i}>
                <Typography variant="body1">{item}</Typography>
              </OneTab>
            );
          })}
        </Tabs>
        {activeTab >= 0 ? (
          <form onChange={handleSubmit(eventFilter)}>
            <Flex flexDirection="column">
              <Col marginBottom="3rem">
                <Row flexDirection="column">
                  <Typography variant="body1" marginBottom="1.4rem">
                    {t('event.venue', 'Место проведения')}
                  </Typography>
                  <Select {...register('city')}>
                    <option value="">Вся страна</option>
                    {cities?.map((item, i) => (
                      <option key={i}>{`${item}`}</option>
                    ))}
                  </Select>
                </Row>
              </Col>
              <Col marginBottom="3rem">
                <Row flexDirection="column">
                  <Typography variant="body1" marginBottom="1.4rem">
                    {t('event.date', 'Дата проведения')}
                  </Typography>
                  <Flex css={{ width: '100%' }}>
                    <DataPickerRange
                      setDateRange={setDateRange}
                      startDate={startDate}
                      endDate={endDate}
                      bg={false}
                      isClearButton={false}
                      typeArrowPurple={false}
                      mobileVersion={false}
                    />
                  </Flex>
                </Row>
              </Col>
              <Col marginBottom="3rem">
                <Row flexDirection="column">
                  <Typography variant="body1" marginBottom="1.4rem">
                    Расстояние {`: ${Number(range) / 1000} км`}
                  </Typography>
                  <InputRange
                    type="range"
                    value={range}
                    min={Number(0)}
                    max={90000}
                    {...register('radius')}
                    onChange={(e) => setRange(e.target.value)}
                    step="200"
                  />
                </Row>
              </Col>

              <Col marginBottom="3rem">
                <Row flexDirection="column">
                  <Typography variant="body1" marginBottom="1.4rem">
                    {t('event.category', 'Категория')}
                  </Typography>
                  <Select {...register('categoryId')}>
                    <option value="">Все категории</option>
                    {categories?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.title}
                      </option>
                    ))}
                  </Select>
                </Row>
              </Col>
            </Flex>
          </form>
        ) : null}
        <Button fullSize variant="secondary" onClick={ResetFilter}>
          {t('common.reset', 'Сбросить')}
        </Button>
      </Body>
    );
  },
);
