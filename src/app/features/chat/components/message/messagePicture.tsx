/* eslint-disable react/no-unknown-property */
import { getChatPictureUrls } from '@/utils';
import { FC, Fragment } from 'react';
import { mq } from 'src/theme';
import { MessageEntity } from '../../chat.types';

interface MessagePictureProps {
  message: MessageEntity;
}

export const MessagePicture: FC<MessagePictureProps> = ({ message }) => {
  return (
    <Fragment>
      {getChatPictureUrls(message.pictures!).map((pictureUrl) => (
        <img
          css={mq({
            maxWidth: ['35rem', '20rem'],
          })}
          key={pictureUrl}
          src={pictureUrl}
          alt=""
        />
      ))}
    </Fragment>
  );
};
