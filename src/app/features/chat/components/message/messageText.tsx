import { Typography } from '@/components';
import { FC } from 'react';

import { TextGroup } from './styled';

interface MessageTextProps {
  children: string;
}

export const MessageText: FC<MessageTextProps> = ({ children }) => {
  return (
    <TextGroup>
      <Typography variant="body1">{children}</Typography>
    </TextGroup>
  );
};
