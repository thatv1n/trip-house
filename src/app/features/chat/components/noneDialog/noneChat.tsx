import svgCloudChat from '#/icons/cloudChat.svg';
import { Flex, Typography } from '@/components';
import { Icon } from '@/components/icon/icon';
import { FC } from 'react';

export const NoneChat: FC<{ startCreateChat: (data: string) => void }> = ({ startCreateChat }) => {
  return (
    <Flex justifyContent="center" alignItems="center" height="100%">
      <Typography variant="body1" textAlign="center">
        <Flex justifyContent="center" mb="1.5rem">
          <Icon source={svgCloudChat} css={{ width: '5rem' }} />
        </Flex>
        Выберите чат <br /> или
        <Typography
          onClick={startCreateChat}
          css={(theme: { color: { mainPurple: string } }) => ({
            color: theme.color.mainPurple,
            marginLeft: '0.5rem',
            cursor: 'pointer',
          })}
        >
          создайте новый
        </Typography>
      </Typography>
    </Flex>
  );
};
