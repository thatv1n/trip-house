/* eslint-disable react/jsx-props-no-spreading */
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Flex, Input } from '@/components';
import { Icon } from '@/components/icon/icon';
import { getSingleLoadingSelector } from '@ro-loading';
import { searchChatListSelector } from '../../chat.selectors';
import { Contact } from './components';

import svgSource from '#/icons/search-mddem.svg';
import svgSpinner from '#/icons/spinner.svg';
import { useTranslate } from '@tolgee/react';

const Root = styled.div(({ theme }) => {
  return {
    width: '100%',
    height: '100%',
    minHeight: '66rem',
    maxHeight: '66rem',
    minWidth: '31.5rem',
    maxWidth: '45.4rem',
    overflowY: 'scroll',
    '&::-webkit-scrollbar ': { width: 0 },
    backgroundColor: theme.colors.white,
    marginTop: '1.5rem',
    borderRadius: '1rem',
    padding: '1.6rem 0',
    '@media (max-width: 734px)': { display: 'none' },
  };
});

export const Contacts: React.FC = () => {
  const { t } = useTranslate();
  const isLoading = useSelector((state) => getSingleLoadingSelector(state, 'getChats'));

  const [search, setSearch] = useState<string>('');
  const chats = useSelector((state) => searchChatListSelector(state, search));

  return (
    <>
      <Input
        placeholder={t('common.search', 'Поиск')}
        onChange={(e) => setSearch(e.target.value)}
        css={(theme) => ({
          background: theme.color.white,
          height: '5.6rem',
          '@media (max-width: 734px)': { background: theme.color.bg, height: '4rem' },
        })}
        wth="100%"
        icon={<Icon css={{ width: '100%', '@media (max-width: 734px)': { marginTop: '-1rem' } }} source={svgSource} />}
      />
      {isLoading ? (
        <Root>
          <Flex css={{ width: '100%', height: '100%', justifyContent: 'center' }}>
            <Icon source={svgSpinner} css={{ width: '4.4rem' }} />
          </Flex>
        </Root>
      ) : (
        <Root>
          {chats.map((item) => {
            return <Contact chat={item} key={item.id} />;
          })}
        </Root>
      )}
    </>
  );
};
