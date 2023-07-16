import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { Button, Flex, ModalUsers } from '@/components';

import { UserType } from '../aboutEvent/event.types';
import { infoProfileApi } from '../profile/components/header/components/infoProfile/infoProfile.api';
import { getChatsAction, getCreateChatAction } from './chat.actions';
import { Contacts, Dialog, MobileContacts, NoneChat } from './components';

const Root = styled.div(() => {
  return {
    maxWidth: '144rem',
    width: '100%',
    boxSizing: 'border-box',
    display: 'grid',
    marginLeft: 'auto',
    marginRight: 'auto',
    gridTemplateColumns: '0.4755fr 1fr',
    marginBottom: '2rem',

    '@media (max-width: 734px)': {
      display: 'flex',
      // position: id && 'fixed',
      flexDirection: 'column',
      padding: '0 0',
      marginBottom: '0',
    },
  };
});

const ChatContainer = styled.div(({ theme }) => {
  return {
    width: '100%',
    minHeight: '66rem',
    backgroundColor: theme.colors.white,
    borderRadius: '1rem',
    zIndex: 10,
    '@media (max-width: 734px)': { minHeight: 'auto' },
  };
});

export const ChatPage: React.FC = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [users, setUsers] = useState<UserType[]>([]);

  const dispatch = useDispatch();

  const isModalClose = (
    e: Event & {
      target: HTMLButtonElement;
    },
  ): void => {
    const { target } = e;
    if (target.getAttribute('data-target') || target.tagName === 'svg' || target.tagName === 'path') {
      setModal(false);
    }
  };

  const getChats = async () => {
    dispatch(getChatsAction.started());
  };

  const startCreateChat = async (): Promise<any> => {
    const response = await infoProfileApi.getMySubscription().then((res) => {
      return res.json();
    });
    if (response.success) {
      setUsers(response.data);
      setModal(true);
    } else {
      throw response.error;
    }
  };

  const createChat = async (userId: string) => {
    dispatch(getCreateChatAction.started(userId));
    getChats();
    setModal(false);
  };

  useEffect(() => {
    getChats();
  }, []);

  return (
    <Root>
      <Flex css={{ marginRight: '1rem', '@media (max-width: 734px)': { display: 'none' } }} flexDirection="column">
        <Contacts />
        <Button fullSize css={{ marginTop: '2rem' }} onClick={startCreateChat}>
          Создать чат
        </Button>
      </Flex>
      <ChatContainer>
        <Routes>
          <Route
            index
            element={
              <>
                <Flex
                  css={{
                    '@media (max-width: 734px)': { display: 'none' },
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  <NoneChat startCreateChat={startCreateChat} />
                </Flex>
                <MobileContacts startCreateChat={startCreateChat} />
              </>
            }
          />
          <Route
            path="/:chatId"
            element={
              <Flex>
                <Dialog />
              </Flex>
            }
          />
        </Routes>
      </ChatContainer>
      {modal && (
        <ModalUsers users={users} isModalClose={isModalClose} title="Выберите собеседника" createChat={createChat} />
      )}
    </Root>
  );
};
