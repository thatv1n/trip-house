/* eslint-disable react/jsx-props-no-spreading */
import styled from '@emotion/styled';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import 'react-datepicker/dist/react-datepicker.css';

import { Flex } from '../box';
import { Button } from '../button';
import { Col, Row } from '../grid';
import { Select } from '../select';
import { Typography } from '../typography';
import { getCategoryAction, getCitiesAction } from './eventsFilter.action';
import { FilterType, menuShortEventsState } from './eventsFilter.types';

import { getGeoSelector } from '@/features/auth/auth.selectors';
import { getCitiesSelector } from './eventsFilter.selector';

import { DataPickerRange } from '../dataPickerRange';
import { Icon } from '../icon/icon';

import svgArrowLeftMobile from '#/icons/arrowLeftMobileBlack.svg';
import { getEventsAction } from '@/features/home/home.page.action';
import { getEventsSelector } from '@/features/home/home.page.selector';
import { getCountry, setCountry } from '@/utils';
import { getCountriesSelector } from '../header/header.selectors';

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
  isModalClose: (e: any) => void;
  categoriesSelect: any;
  setCategoriesSelected: (data: any) => void;
}

const WrapModalFilter = styled.div(({ theme }) => {
  return {
    position: 'absolute',
    width: '100%',
    paddingTop: '6rem',
    zIndex: '1',
    left: 0,
    top: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&::after': {
      content: "' '",
      position: 'absolute',
      backgroundColor: theme.color.transparentGray,
      width: '100%',
      height: '100%',
      top: 0,
    },
    '@media (max-width: 734px)': {
      borderRadius: 0,
      width: '100%',
      height: '100%',
      paddingTop: '0',
    },
  };
});

const WinModalFilter = styled.div(({ theme }) => {
  return {
    minHeight: 300,
    maxWidth: 1191,
    width: '100%',
    overflowY: 'hidden',
    top: 0,
    right: 0,
    overflowX: 'hidden',
    background: theme.color.white,
    zIndex: 2,
    borderRadius: 10,
    '@media (max-width: 1200px)': {
      width: 968,
    },
    '@media (max-width: 980px)': {
      width: 770,
    },
    '@media (max-width: 734px)': {
      borderRadius: 0,
      width: '100%',
      height: '100%',
      position: 'fixed',
      overflow: 'scroll',
      background: theme.color.bg,
    },
  };
});

const Body = styled.div(({ theme }) => {
  return {
    height: '90%',
    backgroundColor: theme.colors.bg,
    borderRadius: '1rem',
    minWidth: '23.5rem',
    marginTop: '1rem',
    marginBottom: '1rem',
    width: '100%',
  };
});

const MobileButton = styled.button(() => {
  return {
    '@media (max-width: 734px)': {
      position: 'absolute',
      top: 14,
      right: 16,
      border: 'none',
      background: 'none',
    },
  };
});

export const EventsFilterMobile: FC<TypeProps> = ({
  setRange,
  eventFilter,
  setIsFilterEvent,
  setIsTextFilter,
  setDateRange,
  startDate,
  endDate,
  isMap,
  isModalClose,
  setCategoriesSelected,
  categoriesSelect,
}) => {
  const categories = useSelector((state: menuShortEventsState) => state.menuShortEvents.categories);
  const geo = useSelector(getGeoSelector);
  const cities = useSelector(getCitiesSelector);
  const events = useSelector(getEventsSelector);

  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  const getCountryLocalStorage = getCountry();
  const countries = useSelector(getCountriesSelector);

  useEffect(() => {
    dispatch(getCategoryAction.started(null));
  }, []);

  useEffect(() => {
    if (geo?.country) dispatch(getCitiesAction.started(getCountryLocalStorage));
  }, [geo]);

  const ResetFilter = (): void => {
    reset();
    setRange('0');
    const defaultFilterEvent = { limit: 20, offset: 0 };
    const mapFilterEvent = { limit: 101, offset: 0, lat: geo?.lat, lon: geo?.lon, radius: 22200 };
    setIsFilterEvent(isMap ? mapFilterEvent : defaultFilterEvent);
    setIsTextFilter('');
    setDateRange([null, null]);
  };

  const resetEventsFiltered = (): void => {
    ResetFilter();
    setCategoriesSelected('');
  };

  const selectCategories = categories.filter((item) => categoriesSelect === item.id);
  const viewSelectedCategory = selectCategories[0] ? selectCategories[0].title : 'Выберите категорию';

  const setCountryLocalStorage = (value: string) => {
    setCountry(value);
    dispatch(getCitiesAction.started(value));
    dispatch(getEventsAction.started({ limit: 20, offset: 0, country: value }));
  };

  return (
    <WrapModalFilter>
      <WinModalFilter>
        <Flex
          css={(theme: any) => ({
            padding: '1.8rem 3.2rem 1.8rem 7.1rem',
            width: '100%',
            borderBottom: `0.1rem solid ${theme.color.darkWhite}`,
            position: 'relative',
            justifyContent: 'space-between',
            '@media (max-width: 734px)': {
              justifyContent: 'center',
              background: theme.color.white,
              padding: '0.85rem 3.2rem 0.95rem  3.2rem',
              borderBottom: 'none',
            },
          })}
        >
          <Flex alignItems="center">
            <Typography
              variant="h1"
              css={{
                marginRight: '3rem',
                '@media (max-width: 734px)': {
                  marginRight: '0',
                },
              }}
            >
              Фильтр
            </Typography>
          </Flex>
          <Flex
            onClick={(e: HTMLButtonElement) => isModalClose(e)}
            data-target="closeButton"
            css={{
              width: 25,
              position: 'relative',
              top: -3,
              alignItems: 'center',
              '@media (max-width: 734px)': { position: 'absolute', left: 18, top: 16 },
            }}
          >
            <Icon
              source={svgArrowLeftMobile}
              css={{
                width: '0.8rem',
                cursor: 'pointer',
                display: 'none',
                '@media (max-width: 734px)': { display: 'block' },
              }}
            />
          </Flex>
        </Flex>
        <Body>
          <Flex alignItems="center">
            <Col marginBottom="0.2rem">
              <Row flexDirection="column">
                <Select
                  css={(theme) => ({
                    backgroundColor: theme.color.white,
                    padding: '1rem, 1.6rem 1.3rem 1rem',
                    borderRadius: 0,
                    height: '5.9rem',
                  })}
                  onChange={(e) => setCountryLocalStorage(e.target.value)}
                >
                  <option hidden>Выберите страну</option>
                  {countries?.map((item, i) => (
                    <option
                      key={i}
                      value={item}
                      selected={getCountryLocalStorage ? getCountryLocalStorage === item : false}
                    >
                      {item}
                    </option>
                  ))}
                </Select>
              </Row>
            </Col>
          </Flex>
          <form onChange={handleSubmit(eventFilter)}>
            <Flex flexDirection="column">
              <Col marginBottom="0.2rem">
                <Row flexDirection="column">
                  <Select
                    {...register('city')}
                    css={(theme) => ({
                      backgroundColor: theme.color.white,
                      padding: '1rem, 1.6rem 1.3rem 1rem',
                      borderRadius: 0,
                      height: '5.9rem',
                    })}
                  >
                    <option value="">Вся страна</option>
                    {cities?.map((item, i) => (
                      <option key={i}>{`${item}`}</option>
                    ))}
                  </Select>
                </Row>
              </Col>
              <Col marginBottom="0.2rem">
                <Row flexDirection="column">
                  <Flex css={{ width: '100%' }}>
                    <DataPickerRange
                      setDateRange={setDateRange}
                      startDate={startDate}
                      endDate={endDate}
                      bg
                      isClearButton={false}
                      typeArrowPurple={false}
                      mobileVersion
                    />
                  </Flex>
                </Row>
              </Col>

              <Col marginBottom="0.2rem">
                <Row flexDirection="column">
                  <Select
                    {...register('categoryId')}
                    onClick={(e: any) => setCategoriesSelected(`${e.target.value}`)}
                    css={(theme) => ({
                      backgroundColor: theme.color.white,
                      padding: '1rem, 1.6rem 1.3rem 1rem',
                      borderRadius: 0,
                      height: '5.9rem',
                    })}
                  >
                    <option value="">{viewSelectedCategory}</option>
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

          <Button
            fullSize
            variant="secondary"
            onClick={ResetFilter}
            css={{ '@media (max-width: 734px)': { display: 'none' } }}
          >
            Сбросить
          </Button>
          <Flex css={{ margin: '0 1.6rem', height: '4rem', position: 'fixed', width: '91%', bottom: '8rem' }}>
            <Button fullSize onClick={(e) => isModalClose(e)} data-target="closeButton">
              Показать {events?.length}
            </Button>
          </Flex>

          <MobileButton onClick={resetEventsFiltered}>
            <Typography variant="body1" css={(theme: any) => ({ color: theme.color.mainPurple, cursor: 'pointer' })}>
              Сбросить
            </Typography>
          </MobileButton>
        </Body>
      </WinModalFilter>
    </WrapModalFilter>
  );
};
