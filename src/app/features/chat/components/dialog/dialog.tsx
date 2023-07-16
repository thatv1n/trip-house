/* eslint-disable react/jsx-props-no-spreading */
import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Flex, ModalUsers, Typography } from '@/components';
import { Icon } from '@/components/icon/icon';
import { HeaderCompanion } from '../headerCompanion';
import { InputDialog } from '../inputDialog';
import { Message } from '../message';

import svgSpinner from '#/icons/spinner.svg';
import { getDefaultPictureUrl } from '@/utils';
import { getSingleLoadingSelector } from '@ro-loading';
import { forwardMessagesAction, getDialogAction, paginationMessagesAction } from '../../chat.actions';
import { getChatFullByIdSelector, getMessagesByChatIdSelector, searchChatListSelector } from '../../chat.selectors';
import { ChatType } from '../../chat.types';

import pngChecked from '#/img/checked.png';
import { getUserSelector } from '@/features/auth/auth.selectors';
import { getByTargetInviteEventAction, getLastInviteByTargetSelector } from '@/features/invite-event';
import { InviteEventContainer } from '@/features/invite-event/components/invite-event/invite-event.container';

const Root = styled.div(({ theme }) => {
  return {
    width: '100%',
    minHeight: '66rem',
    backgroundColor: theme.colors.white,
    borderRadius: '1rem',
    zIndex: 10,
    '@media (max-width: 734px)': { minHeight: 'auto' },
  };
});

const Header = styled.div(({ theme }) => {
  return {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '5.6rem',
    borderBottom: `0.1rem solid ${theme.color.darkWhite}`,
    padding: '0 2.5rem',
    alignItems: 'center',
    '@media (max-width: 734px)': { height: '4.648rem', padding: '0 1.7rem' },
  };
});

const Body = styled.div(() => {
  return {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    maxHeight: '72rem',
    '@media (max-width: 734px)': { maxHeight: '100vh', height: '93dvh' },
  };
});

const BodyChat = styled.div<{ lengthChat: number }>(({ lengthChat }) => {
  return {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: lengthChat < 10 ? 'flex-end' : undefined,
    position: 'relative',
    width: '100%',
    height: '67.5rem',
    overflow: 'auto',
    marginTop: '0.2rem',
    '&::-webkit-scrollbar ': { width: 0 },
    '@media (max-width: 734px)': { padding: '0 1.6rem', height: '90dvh' },
  };
});

const StyledCheckbox = styled.input(() => {
  return {
    position: 'absolute',
    zIndex: -1,
    opacity: 0,
    '&:checked + label:before': {
      background: `url(${pngChecked}) center/cover no-repeat`,
      position: 'relative',
    },
  };
});

const WrapMessageChecked = styled.div(() => {
  return {
    display: 'flex',
    position: 'relative',
    padding: '0.8rem 5.2rem 0.5rem 5.2rem',
    alignItems: 'center',
    '@media (max-width: 734px)': { padding: '0' },
  };
});

export const Dialog: React.FC = () => {
  const dispatch = useDispatch();
  const { chatId: id } = useParams();

  const bodyChat = useRef<HTMLDivElement | null>(null);

  const user = useSelector(getUserSelector);
  const chat = useSelector((state) => getChatFullByIdSelector(state, id!));
  const messages = useSelector((state) => getMessagesByChatIdSelector(state, id!));
  const isLoading = useSelector((state) => getSingleLoadingSelector(state, 'getDialog'));
  const inviteEvent = useSelector((state) => getLastInviteByTargetSelector(state, chat?.target?.id));

  const [isParams, setIsParams] = useState({ limit: 30, offset: 0 });
  const [timeoutId, setTimeoutId] = useState<any>(null);
  const [isMessageSelection, setIsMessageSelection] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);

  const [modal, setModal] = useState<boolean>(false);

  const [search, setSearch] = useState<string>('');
  const chats = useSelector((state) => searchChatListSelector(state, search));

  const handleDown = (): void => {
    if (!isMessageSelection) {
      const timeout = setTimeout(() => {
        setIsMessageSelection(true);
      }, 1000);
      setTimeoutId(timeout);
    }
  };

  const handleUp = (): void => {
    if (!isMessageSelection) {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }
    }
  };

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const scrollBottom = (): void => {
    if (bodyChat.current) bodyChat.current.scrollTop = bodyChat.current.scrollHeight + 200;
  };

  useEffect(() => {
    if (inView && messages?.length >= 30) {
      setIsParams((obj) => ({ ...obj, offset: obj.offset + 30, limit: 30 }));
    }
  }, [inView]);

  useEffect(() => {
    if (bodyChat.current && messages?.length && isParams.offset <= 0) scrollBottom();
  }, [messages]);

  useEffect(() => {
    if (id && isParams.offset) {
      const params = { chatId: id, ...isParams };
      dispatch(paginationMessagesAction.started(params));
    }
  }, [isParams]);

  useEffect(() => {
    dispatch(getDialogAction.started(id!, { withRead: true }));
    setIsParams({ offset: 0, limit: 30 });
  }, [id]);

  useEffect(() => {
    if (!isLoading) {
      scrollBottom();
    }
  }, [isLoading]);

  useEffect(() => {
    if (chat?.target?.id) {
      dispatch(getByTargetInviteEventAction.started(chat.target.id));
    }
  }, [chat?.target]);

  const selectMessage = (idMessage: string): void => {
    if (isMessageSelection) {
      if (!selectedMessages.includes(idMessage)) {
        setSelectedMessages((item: string[]) => [...item, idMessage]);
      } else {
        const del = selectedMessages.filter((item: string) => item !== idMessage);
        setSelectedMessages(del);
      }
    }
  };

  const forwardingMessages = (toChatId: string): void => {
    dispatch(forwardMessagesAction.started({ toChatId, messageIds: selectedMessages }));
    setModal(false);
    setIsMessageSelection(false);
    setSelectedMessages([]);
  };

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

  if (!chat || isLoading) {
    return (
      <Flex css={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <Icon source={svgSpinner} css={{ width: '4.4rem' }} />
      </Flex>
    );
  }

  const headerProps =
    chat.type === ChatType.PERSONAL
      ? {
          title:
            chat.target?.firstName && chat.target?.lastName
              ? `${chat.target.firstName} ${chat.target.lastName}`
              : chat.target!.login,
          navigateUrl: `/profile/${chat.target!.id}`,
          pictureUrl: getDefaultPictureUrl(chat.target?.avatar),
          sex: chat.target!.sex,
          onlineStatus: chat.target!.lastOnline,
        }
      : {
          title: chat.event!.title,
          navigateUrl: `/about-the-event/${chat.event!.id}`,
          pictureUrl: getDefaultPictureUrl(chat.event?.pictures),
          sex: null,
          onlineStatus: null,
          membersCount: chat.membersCount,
        };

  return (
    <Root>
      <Header>
        <HeaderCompanion
          title={headerProps.title}
          navigateUrl={headerProps.navigateUrl}
          pictureUrl={headerProps.pictureUrl}
          sex={headerProps.sex}
          onlineStatus={headerProps.onlineStatus}
          membersCount={headerProps.membersCount}
          selectedMessages={selectedMessages}
          isMessageSelection={isMessageSelection}
          setSelectedMessages={setSelectedMessages}
          setIsMessageSelection={setIsMessageSelection}
          setModal={setModal}
        />
      </Header>
      <Body>
        {inviteEvent ? <InviteEventContainer id={inviteEvent.id} /> : null}
        <BodyChat lengthChat={messages.length} ref={bodyChat}>
          {messages.length ? (
            messages.map((item) => {
              return (
                <WrapMessageChecked
                  key={item.id}
                  css={(theme) =>
                    item.sender.id === user?.id
                      ? {
                          justifyContent: 'flex-end',
                          backgroundColor: !!selectedMessages.includes(item.id) && theme.color.lightWhite,
                          padding: item.type === 'forward' && '0 5.2rem',
                        }
                      : {
                          backgroundColor: !!selectedMessages.includes(item.id) && theme.color.lightWhite,
                          padding: item.type === 'forward' && '0 5.2rem',
                        }
                  }
                >
                  {isMessageSelection && (
                    <StyledCheckbox
                      type="checkbox"
                      id={item.id}
                      defaultChecked={!!selectedMessages.includes(item.id)}
                      name={item.id}
                    />
                  )}

                  <Message
                    message={item}
                    userId={user?.id}
                    lastElem={messages[0].id === item.id ? ref : null}
                    handleDown={handleDown}
                    handleUp={handleUp}
                    selectMessage={selectMessage}
                    isMessageSelection={isMessageSelection}
                  />
                </WrapMessageChecked>
              );
            })
          ) : (
            <Flex justifyContent="center" mb="3.7rem">
              <Typography variant="body1" color="darkWhite">
                Сообщений нет
              </Typography>
            </Flex>
          )}
        </BodyChat>

        <InputDialog scrollBottom={scrollBottom} />
      </Body>
      {modal && (
        <ModalUsers
          chats={chats}
          isModalClose={isModalClose}
          title="Переслать сообщения"
          forwardingMessages={forwardingMessages}
        />
      )}
    </Root>
  );
};
