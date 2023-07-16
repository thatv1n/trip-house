import styled from '@emotion/styled';
import { FC, useState } from 'react';

import { Flex } from '@/components';
import { Interaction, Wall } from './components';
import { Header } from './components/header';
import { profileApi } from './profile.api';
import { ProfileEntity } from './profile.types';
import { useDispatch } from 'react-redux';
import { getByUserIdProfileAction } from './profile.actions';

const Root = styled.div(() => {
  return {
    maxWidth: '123rem',
    width: '100%',
    margin: '0 auto',
    padding: '0 5rem',
    boxSizing: 'border-box',
    display: 'grid',
    gridTemplateColumns: '1fr 2.1fr ',
    '@media (max-width: 734px)': {
      display: 'flex',
      flexDirection: 'column',
      padding: '0 0',
    },
  };
});

interface ProfileProps {
  profile: ProfileEntity;
}

export const Profile: FC<ProfileProps> = ({ profile }) => {
  const [isSendData, setIsSendData] = useState(false);
  const dispatch = useDispatch();

  // TODO (luchko): Move to redux.
  const subscribe = async (): Promise<any> => {
    setIsSendData(true);
    const params = new URLSearchParams();
    params.set('targetUserId', profile.user.id);
    const response = await profileApi.subscribeProfile(params).then((res) => {
      return res.json();
    });
    if (response.success) {
      dispatch(getByUserIdProfileAction.started(profile.user.id));
      setIsSendData(false);
    } else {
      setIsSendData(true);
      throw response.error;
    }
  };

  const unsubscribe = async (): Promise<any> => {
    setIsSendData(true);
    const params = new URLSearchParams();
    params.set('targetUserId', profile.user.id);
    const response = await profileApi.unsubscribeProfile(params).then((res) => {
      return res.json();
    });
    if (response.success) {
      dispatch(getByUserIdProfileAction.started(profile.user.id));
      setIsSendData(false);
    } else {
      setIsSendData(true);
      throw response.error;
    }
  };

  return (
    <Root>
      <Interaction profile={profile} isSendData={isSendData} subscribe={subscribe} unsubscribe={unsubscribe} />
      <Flex flexDirection="column">
        <Header profile={profile} isSendData={isSendData} subscribe={subscribe} unsubscribe={unsubscribe} />
        <Wall id={profile.user.id} getMyProfile={() => {}} />
      </Flex>
    </Root>
  );
};
