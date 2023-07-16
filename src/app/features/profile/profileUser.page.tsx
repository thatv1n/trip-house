import styled from '@emotion/styled';
import { getSingleLoadingSelector } from '@ro-loading';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { LoadingProfile } from './components';
import { Profile } from './profile';
import { getByUserIdProfileAction } from './profile.actions';
import { getProfileSelector } from './profile.selectors';

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

export const ProfileUserPage: FC = () => {
  const profile = useSelector(getProfileSelector);
  const { userId } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => getSingleLoadingSelector(state, 'meProfile'));

  useEffect(() => {
    if (userId) {
      dispatch(getByUserIdProfileAction.started(userId));
    }
  }, [userId]);

  if (isLoading || !profile) {
    return (
      <Root>
        <LoadingProfile />
      </Root>
    );
  }
  return <Profile profile={profile} />;
};
