/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-props-no-spreading */
import styled from '@emotion/styled';
import * as R from 'ramda';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import 'cropperjs/dist/cropper.css';

import { LoadingPage, Rightbar, SettingsForm } from './components';

import { Button, Col, Modal, Row } from '@/components';
import { getInterestAction, getListInterestSelector, isLoadingInterestSelector } from '@/features/interest';
import { InterestSelectorPage } from '@/features/interest/interest-selector.page';
import { getSingleLoadingSelector } from '@ro-loading';

import { logoutAuthAction } from '@/features/auth/auth.actions';
import { removeCountry } from '@/utils';
import { getMeProfileAction, updateUserProfileAction } from '../../profile.actions';
import { getProfileSelector } from '../../profile.selectors';
import { ProfileFormData, ProfileSettingsPayload } from '../../profile.types';

const Root = styled.div(() => {
  return {
    maxWidth: '123rem',
    width: '100%',
    margin: '0 auto',
    padding: '0 5rem',
    boxSizing: 'border-box',
    display: 'grid',
    position: 'relative',
    gridTemplateColumns: '2.1fr 1fr ',
    '@media (max-width: 734px)': {
      display: 'flex',
      flexDirection: 'column',
      padding: '0 0',
      marginTop: '-0.2rem',
      marginBottom: '7.1rem',
    },
  };
});

// TODO (luchko): Replace to <Content /> component after refactor adaptive.
const Body = styled.div(({ theme }) => {
  return {
    maxWidth: '77.7rem',
    backgroundColor: theme.colors.white,
    borderRadius: '1rem',
    padding: '2rem',
    marginBottom: '2rem',
    marginRight: '2rem',
    minHeight: 'calc(100vh - 12rem)',
    '@media (max-width: 734px)': {
      padding: '1.2rem 1.6rem',
      minHeight: 'auto',
      borderRadius: '0',
      marginBottom: '0rem',
      marginRight: '0',
      overflow: 'auto',
    },
  };
});

export const Settings: FC = () => {
  const profile = useSelector(getProfileSelector);
  const isLoading = useSelector((state) => getSingleLoadingSelector(state, 'meProfile'));
  const isUpdateLoading = useSelector((state) => getSingleLoadingSelector(state, 'updateUser'));
  const isInterestsLoading = useSelector(isLoadingInterestSelector);
  const interests = useSelector(getListInterestSelector);
  const dispatch = useDispatch();
  const [interestsSelected, setInterestsSelected] = useState<string[]>(profile?.user.interests.map(R.prop('id')) || []);
  const { control, register, handleSubmit, setValue } = useForm<ProfileFormData>({
    defaultValues: {
      firstName: profile?.user.firstName ?? '',
      lastName: profile?.user.lastName ?? '',
      email: profile?.user.email ?? '',
      sex: profile?.user.sex ?? 'male',
      city: profile?.user.city ?? '',
      age: profile?.user.age ?? new Date(),
      description: profile?.user.description ?? '',
      lang: profile?.user.lang ?? 'en',
    },
  });
  const [avatar, setAvatar] = useState<File | null>(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    dispatch(getMeProfileAction.started());
    dispatch(getInterestAction.started());
  }, []);

  useEffect(() => {
    if (profile) {
      setInterestsSelected(profile.user.interests.map(R.prop('id')));
      setValue('firstName', profile?.user.firstName ?? '');
      setValue('lastName', profile?.user.lastName ?? '');
      setValue('email', profile?.user.email ?? '');
      setValue('sex', profile?.user.sex ?? 'male');
      setValue('city', profile?.user.city ?? '');
      setValue('age', profile?.user.age ?? new Date());
      setValue('description', profile?.user.description ?? '');
      setValue('lang', profile?.user.lang ?? 'en');
    }
  }, [profile]);

  const submitHandler = handleSubmit((data) => {
    const payload: ProfileSettingsPayload = {
      ...data,
    };
    if (avatar) {
      payload.avatar = avatar;
    }

    dispatch(updateUserProfileAction.started(payload));
    setModal(true);
  });

  const submitIntererstHandler = (): void => {
    dispatch(updateUserProfileAction.started({ interestIds: interestsSelected }, { navigate: '/profile/settings' }));
  };

  if (isLoading || !profile || isInterestsLoading) {
    return <LoadingPage />;
  }

  const interestsPlaceholder = interestsSelected
    .map((interestId) => interests.find(R.propEq('id', interestId))?.title)
    .join(', ');

  const isModalClose = (e: any): void => {
    const { target } = e;

    if (target.getAttribute('data-target')) {
      setModal(false);
    }
  };

  const handleLogout = (): void => {
    dispatch(logoutAuthAction.started());
    removeCountry();
  };

  return (
    <Root>
      <Body>
        <Routes>
          <Route
            index
            element={
              <SettingsForm
                register={register}
                initialAvatar={profile.user.avatar}
                interests={interestsPlaceholder}
                isLoading={isUpdateLoading}
                control={control}
                onSubmit={submitHandler}
                onChangeAvatar={setAvatar}
              />
            }
          />
          <Route
            path="/interests"
            element={
              <InterestSelectorPage
                interestSelected={interestsSelected}
                onChangeInterests={setInterestsSelected}
                onSubmit={submitIntererstHandler}
              />
            }
          />
          <Route path="*" element={<Navigate to="/profile/settings" />} />
        </Routes>
        <Col mt="1.4rem" css={{ display: 'none', '@media (max-width: 734px)': { display: 'block' } }}>
          <Row justifyContent="center">
            <Button variant="secondary" fullSize onClick={handleLogout}>
              Выйти
            </Button>
          </Row>
        </Col>
      </Body>
      <Rightbar />
      {modal && (
        <Modal
          isModalClose={isModalClose}
          title="Данные сохранены"
          body="Ваши данные находятся на проверке. После согласования мы направим вам уведомление."
        />
      )}
    </Root>
  );
};
