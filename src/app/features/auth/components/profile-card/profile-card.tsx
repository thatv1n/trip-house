import { Box, Col, Flex, Row, Typography } from '@/components';
import styled from '@emotion/styled';
import React, { FC, Fragment } from 'react';
import { Theme } from 'theme';
import emptyAvatarImg from '#/img/empty-avatar.png';
import { UserOldSession } from '../../auth.types';

interface ProfileCardProps {
  userSession?: UserOldSession;
  onSelect: (phoneNumber: string) => void;
}

const UserAvatar = styled.div<{ avatarUrl: string }>(({ theme, avatarUrl }) => {
  return {
    background: `url('${avatarUrl}') no-repeat center`,
    width: '9.6rem',
    height: '9.6rem',
    borderRadius: '50%',
  };
});

export const ProfileCard: FC<ProfileCardProps> = ({ userSession, onSelect }) => {
  const handleClick = () => {
    if (userSession) {
      onSelect(userSession.phoneNumber);
    }
  };
  return (
    <Box
      css={(theme: Theme) => ({
        border: `.5px solid ${theme.color.mainGray}`,
        borderRadius: '2rem',
        padding: '3.7rem 4.8rem',
        marginRight: '2rem',
        height: '22.5rem',
        width: '19.2rem',
        marginBottom: '1rem',
        cursor: userSession ? 'pointer' : 'default',
      })}
      onClick={handleClick}
    >
      {userSession ? (
        <>
          <Row mb="1.6rem">
            <Col>
              <UserAvatar avatarUrl={userSession.avatarUrl} />
            </Col>
          </Row>
          <Row css={{ textAlign: 'center' }}>
            <Col>
              <Typography variant="body1" color="darkGray">
                {userSession.fullName || userSession.login}
              </Typography>
            </Col>
          </Row>
        </>
      ) : (
        <Flex alignItems="center" height="100%">
          <UserAvatar avatarUrl={emptyAvatarImg} />
        </Flex>
      )}
    </Box>
  );
};
