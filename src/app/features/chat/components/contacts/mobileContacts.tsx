import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Button, Flex, Input } from '@/components';
import { Icon } from '@/components/icon/icon';
import { searchChatListSelector } from '../../chat.selectors';
import { Contact } from './components';

import svgSource from '#/icons/search-mddem.svg';
import svgSpinner from '#/icons/spinner.svg';
import { getSingleLoadingSelector } from '@ro-loading';
import { useTranslate } from '@tolgee/react';

interface PropsType {
  startCreateChat: (data: any) => void;
}

const Wrap = styled.div(({ theme }) => {
  return {
    display: 'none',
    position: 'absolute',
    height: '100%',
    width: '100%',
    background: theme.color.white,
    '@media (max-width: 734px)': { display: 'block' },
  };
});

const Root = styled.div(({ theme }) => {
  return {
    width: '100%',
    height: `calc(77dvh - 7.1rem)`,
    overflowY: 'scroll',
    '&::-webkit-scrollbar ': { width: 0 },
    backgroundColor: theme.colors.white,
    borderRadius: '1rem',
    padding: '1.6rem 0',
    position: 'relative',
    zIndex: 1,
  };
});

export const MobileContacts: React.FC<PropsType> = ({ startCreateChat }) => {
  const { t } = useTranslate();
  const isLoading = useSelector((state) => getSingleLoadingSelector(state, 'getChats'));
  const [search, setSearch] = useState<string>('');
  const chats = useSelector((state) => searchChatListSelector(state, search));

  return (
    <Wrap>
      <Flex
        css={(theme: { color: { white: string } }) => ({
          background: theme.color.white,
          justifyContent: 'center',
          marginTop: '1rem',
        })}
      >
        <Input
          placeholder={t('common.search', 'Поиск')}
          onChange={(e) => setSearch(e.target.value)}
          css={(theme) => ({
            background: theme.color.white,
            '@media (max-width: 734px)': { background: theme.color.bg, height: '4rem', width: '90%', margin: '0 auto' },
          })}
          wth="100%"
          icon={<Icon css={{ width: '100%', position: 'relative', left: '1rem' }} source={svgSource} />}
        />
      </Flex>
      {isLoading ? (
        <Root>
          <Flex css={{ width: '100%', height: '100%', justifyContent: 'center' }}>
            <Icon source={svgSpinner} css={{ width: '4.4rem' }} />
          </Flex>
        </Root>
      ) : (
        <Root>
          {chats?.map((item) => {
            return <Contact chat={item} key={item.id} />;
          })}
        </Root>
      )}

      <Button
        fullSize
        css={{ marginTop: '1.5rem', position: 'fixed', bottom: '8rem', zIndex: 2 }}
        onClick={startCreateChat}
      >
        Создать чат
      </Button>
    </Wrap>
  );
};
