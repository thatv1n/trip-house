import styled from '@emotion/styled';
import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { Flex, Input, MobileEventItem, Typography } from '@/components';
import { Icon } from '@/components/icon/icon';

import svgArrowLeftMobile from '#/icons/arrowLeftMobile.svg';
import svgClose from '#/icons/close.svg';
import svgSource from '#/icons/search-mddem.svg';

import { FilterType } from '@/components/eventsFilter/eventsFilter.types';
import { EventResponse } from '@/features/aboutEvent/event.types';

import { profileEventsApi } from '@/features/profile/page/profileEvents/profileEvents.api';

import svgSpinner from '#/icons/spinner.svg';

interface PropsType {
  isModalClose: (e: any) => void;
  invite: (id: string) => void;
}

const WrapModalEvents = styled.div<{ countEvents: number }>(({ theme, countEvents }) => {
  return {
    position: countEvents <= 8 ? 'fixed' : 'absolute',
    width: '100%',
    height: countEvents <= 8 ? '100%' : '',
    paddingTop: '6rem',
    zIndex: '10',
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
      paddingBottom: '100%',
      top: 0,
    },
    '@media (max-width: 734px)': {
      position: 'absolute ',
      borderRadius: 0,
      width: '100%',
      height: '100%',
      paddingTop: '0',
      marginBottom: '7.1rem',
    },
  };
});

const WinModalEvents = styled.div<{ countEvents: number }>(({ theme, countEvents }) => {
  return {
    minHeight: 300,
    maxWidth: 968,
    height: countEvents <= 8 ? '84vh' : '',
    width: '100%',
    overflowY: 'hidden',
    top: 0,
    right: 0,
    overflowX: 'hidden',
    background: theme.color.bg,
    zIndex: 2,
    borderRadius: 10,
    '&::-webkit-scrollbar': { width: 0 },
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

const WrapEventsItem = styled.div(() => {
  return {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: '1fr',
    gridColumnGap: '2rem',
    gridRowGap: '0px',
    '@media (max-width: 1200px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    '@media (max-width: 980px)': {
      gridTemplateColumns: 'repeat(1, 1fr)',
      width: '100%',
    },
    '@media (max-width: 768px)': {
      margin: '0 auto',
      marginBottom: '7.1rem',
    },
  };
});

export const ModalEvents: React.FC<PropsType> = ({ isModalClose, invite }) => {
  const [events, setEvents] = useState<EventResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isTextFilter, setIsTextFilter] = useState<string>('');
  const [stateOffset, setStateOffset] = useState<number>(0);
  const [isFilterEvent, setIsFilterEvent] = useState<FilterType | any>(null);
  const [activeInputSearch, setActiveInputSearch] = useState(false);

  const body = document.querySelector('body');

  const getEvents = async (params: any): Promise<any> => {
    const response = await profileEventsApi.getMyEvents(params).then((res) => {
      return res.json();
    });
    if (response.success) {
      setEvents(response.data);
      setIsLoading(false);
    } else {
      throw response.error;
    }
  };

  const paginationEvents = async (params: any): Promise<any> => {
    const response = await profileEventsApi.getMyEvents(params).then((res) => {
      return res.json();
    });
    if (response.success) {
      setEvents((items) => [...items, ...response.data]);
      setIsLoading(false);
    } else {
      throw response.error;
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
    const handleOverflow = () => {
      if (events.length <= 8 && body) {
        body.style.overflow = 'hidden';
      } else if (body) {
        body.style.overflow = 'auto';
      }
    };

    handleOverflow();
    return () => {
      if (body) body.style.overflow = 'auto';
    };
  }, [events, body]);

  useEffect(() => {
    if (activeInputSearch) isTextSearch(isTextFilter);
  }, [isTextFilter]);

  useEffect(() => {
    const filter = { ...isFilterEvent, limit: 20, offset: stateOffset };
    if (stateOffset) {
      paginationEvents(filter);
    }
  }, [stateOffset]);

  useEffect(() => {
    if (inView && events?.length >= 7) {
      setStateOffset((count) => count + 20);
    }
  }, [inView]);

  useEffect(() => {
    getEvents(isFilterEvent);
  }, [isFilterEvent]);

  return (
    <WrapModalEvents onClick={(e) => isModalClose(e)} data-target="wrapperModalMember" countEvents={events.length}>
      <WinModalEvents countEvents={events.length}>
        <Flex
          css={(theme: any) => ({
            padding: '1.8rem 3.2rem 1.8rem 7.1rem',
            width: '100%',
            borderBottom: `0.1rem solid ${theme.color.darkWhite}`,
            position: 'relative',
            background: theme.color.white,
            justifyContent: 'space-between',
            '@media (max-width: 734px)': {
              justifyContent: 'center',
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
              Выберите ивент
            </Typography>
            <Flex css={{ '@media (max-width: 734px)': { display: 'none' } }}>
              <Input
                placeholder="Поиск"
                css={{ height: '4rem', marginRight: '2rem' }}
                wth="34.3rem"
                onClick={() => setActiveInputSearch(true)}
                onChange={(e) => setIsTextFilter(e.target.value)}
                icon={<Icon css={{ width: '100%', left: '2.25rem' }} source={svgSource} />}
              />
            </Flex>
          </Flex>
          <Flex
            onClick={(e: HTMLButtonElement) => isModalClose(e)}
            data-target="closeButton"
            css={{
              width: '2rem',
              height: '2rem',
              position: 'relative',
              top: -3,
              alignItems: 'center',
              '@media (max-width: 734px)': { position: 'absolute', left: 17, top: 12 },
            }}
          >
            <Icon
              source={svgClose}
              css={{ width: 12, cursor: 'pointer', '@media (max-width: 734px)': { display: 'none' } }}
            />
            <Icon
              source={svgArrowLeftMobile}
              css={{
                width: '0.85rem',
                height: ' 1.4rem',
                cursor: 'pointer',
                display: 'none',
                '@media (max-width: 734px)': { display: 'block' },
              }}
            />
          </Flex>
        </Flex>
        <Flex
          css={{
            marginTop: '3.2rem',
            padding: '0 6.1rem',
            '@media (max-width: 734px)': { display: 'block', marginTop: '1rem', padding: '0 ' },
          }}
        >
          <WrapEventsItem>
            {isLoading ? (
              <Flex css={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Icon source={svgSpinner} css={{ width: '4.4rem' }} />
              </Flex>
            ) : (
              events?.map((item) => {
                return (
                  <MobileEventItem
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...item}
                    key={item.id}
                    isInvite
                    invite={invite}
                    lastElem={events[events.length - 1].id === item.id ? ref : null}
                  />
                );
              })
            )}
          </WrapEventsItem>
        </Flex>
      </WinModalEvents>
    </WrapModalEvents>
  );
};
