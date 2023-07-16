import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { getUserSelector } from '@/features/auth/auth.selectors';
import { getChatsSelector, getCountUnreadSelector, getMessagesSelector } from '@/features/chat/chat.selectors';
import { ChatListLs } from '@/features/chat/chat.types';
import { getChatNotifications, setChatNotifications } from '@/utils';

import { Typography } from '../typography';

const Root = styled.div(({ theme }) => {
  return {
    minWidth: '1.7rem',
    padding: '0.3rem',
    height: '1.7rem',
    borderRadius: '100%',
    background: theme.color.mainRed,
    position: 'absolute',
    display: 'grid',
    placeItems: 'center',
    left: '1.1rem',
    top: '-0.9rem',
  };
});

export const NotificationMessages = () => {
  const countUnread = useSelector(getCountUnreadSelector);
  // const { pathname } = useLocation();
  // const idOpenedChat = pathname.split('/').filter((item) => !!item)[1];
  //
  // const [count, setCount] = useState(0);
  //
  // const user = useSelector(getUserSelector);
  // const messages = useSelector(getMessagesSelector);
  // const chats = useSelector(getChatsSelector);
  // const sum = getChatNotifications()?.reduce((a, b) => a + (+b.count || 0), 0);
  //
  // useEffect(() => {
  //   const formatChats = Object.values(chats);
  //   const notification = getChatNotifications();
  //
  //   if (!notification.length) {
  //     const newArr = formatChats.map((item) => ({ chatId: item.id, lastMessage: item.lastMessage, count: 0 }));
  //     setChatNotifications(newArr);
  //   } else {
  //     formatChats.forEach((item) => {
  //       if (idOpenedChat !== item.id) {
  //         const find = notification.filter((itemOld) => itemOld.chatId === item.id)[0];
  //         const filter = notification.filter((itemOld) => itemOld.chatId !== item.id);
  //
  //         if (
  //           find?.chatId === item?.id &&
  //           find.lastMessage?.id !== item.lastMessage?.id &&
  //           user?.id !== item.lastMessage?.sender.id
  //         ) {
  //           const newArr: ChatListLs[] = [
  //             ...filter,
  //             {
  //               chatId: find.chatId,
  //               lastMessage: item.lastMessage,
  //               count: 1,
  //             },
  //           ];
  //           setChatNotifications(newArr);
  //         }
  //       }
  //     });
  //   }
  // }, [chats, idOpenedChat]);
  //
  // useEffect(() => {
  //   const sumRealtime = getChatNotifications()?.reduce((a, b) => a + (+b.count || 0), 0);
  //   setCount(sumRealtime || 0);
  // }, [messages]);

  return countUnread ? (
    <Root>
      <Typography color="white">{countUnread}</Typography>
    </Root>
  ) : null;
};
