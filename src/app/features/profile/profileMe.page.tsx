import styled from '@emotion/styled';
import { getSingleLoadingSelector } from '@ro-loading';
import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { LoadingProfile } from './components';
import { Profile } from './profile';
import { getMeProfileAction } from './profile.actions';
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

export const ProfileMePage: FC = () => {
  const profile = useSelector(getProfileSelector);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => getSingleLoadingSelector(state, 'meProfile'));

  useEffect(() => {
    dispatch(getMeProfileAction.started());
  }, []);

  if (isLoading || !profile) {
    return (
      <Root>
        <LoadingProfile />
      </Root>
    );
  }
  return <Profile profile={profile} />;
};
