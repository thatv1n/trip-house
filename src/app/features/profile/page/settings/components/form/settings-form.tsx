/* eslint-disable react/jsx-fragments */
/* eslint-disable react/jsx-props-no-spreading */
import svgSpinner from '#/icons/spinner.svg';
import { Box, Button, Col, Flex, ImageUploader, Input, Link, Radio, Row, Select, Typography } from '@/components';
import { Icon } from '@/components/icon/icon';
import { ProfileFormData } from '@/features/profile/profile.types';
import { Option, PictureEntity } from '@/types';
import { getDefaultPictureUrl } from '@/utils';
import styled from '@emotion/styled';
import { T, useTranslate } from '@tolgee/react';
import ru from 'date-fns/locale/ru';
import { FC, forwardRef, Fragment } from 'react';
import ReactDatePicker from 'react-datepicker';
import { Control, Controller, UseFormRegister } from 'react-hook-form';
import ReactTextareaAutosize from 'react-textarea-autosize';

const InputDate = styled.div(({ theme }) => {
  return {
    height: '4rem',
    background: theme.color.bg,
    borderRadius: '1rem',
    border: 'none',
    padding: '1rem 2rem',
    minWidth: '14rem',
    width: '100%',
    fontSize: '1.6rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  };
});

const MobileButton = styled.button(() => {
  return {
    display: 'none',
    '@media (max-width: 734px)': {
      position: 'absolute',
      top: -43,
      right: 5,
      display: 'block',
      border: 'none',
      background: 'none',
      cursor: 'pointer',
    },
  };
});

const AdaptiveButton = styled.div(() => {
  return {
    '@media (max-width: 734px)': {
      position: 'absolute',
      top: 10,
      right: 8,
    },
  };
});

const CustomInputDatePicker = forwardRef(({ value, onClick }: any, ref: any) => (
  <InputDate ref={ref} onClick={onClick}>
    {value}
  </InputDate>
));

interface SettingsFormProps {
  onSubmit: () => void;
  onChangeAvatar: (avatar: Option<File>) => void;
  register: UseFormRegister<ProfileFormData>;
  control: Control<ProfileFormData>;
  initialAvatar: Option<PictureEntity>;
  interests: string;
  isLoading: boolean;
}

export const SettingsForm: FC<SettingsFormProps> = ({
  register,
  initialAvatar,
  interests,
  isLoading,
  control,
  onChangeAvatar,
  onSubmit,
}) => {
  const { t } = useTranslate();
  return (
    <Fragment>
      <Row marginBottom="2.6rem">
        <Col>
          <Typography
            css={{
              fontSize: '2.2rem',
              fontWeight: 500,
              '@media (max-width: 734px)': { display: 'none' },
            }}
          >
            <T keyName="settings">Настройки</T>
          </Typography>
        </Col>
      </Row>
      <form onSubmit={onSubmit}>
        <Row>
          <Col>
            <ImageUploader url={getDefaultPictureUrl(initialAvatar)} onChange={onChangeAvatar} />
          </Col>
        </Row>
        <Row marginBottom="1.4rem">
          <Col>
            <Input
              placeholder="Введите имя"
              label={<T keyName="setting.page.name">Имя</T>}
              {...register('firstName', {
                required: true,
                pattern: /[a-zA-Zа-яА-Я0-9 ]{2,50}/,
              })}
            />
          </Col>
        </Row>
        <Row marginBottom="1.4rem">
          <Col>
            <Input
              placeholder="Введите фамилию"
              label={<T keyName="setting.page.surname">Фамилия</T>}
              {...register('lastName', { required: true, pattern: /[a-zA-Zа-яА-Я0-9 ]{3,50}/ })}
            />
          </Col>
        </Row>
        <Row marginBottom="1.4rem">
          <Col>
            <Input
              placeholder="Введите email"
              type="email"
              label="Email"
              {...register('email', {
                required: true,
              })}
            />
          </Col>
        </Row>
        <Row marginBottom="1rem">
          <Col>
            <Typography variant="body1">Язык</Typography>
          </Col>
        </Row>
        <Row marginBottom="1.4rem">
          <Col>
            <Select {...register('lang')} css={{ backgroundPosition: '97% center' }}>
              <option value="en">{t('common.lang.en')}</option>
              <option value="ru-RU">{t('common.lang.ru')}</option>
              <option value="lv-LV">{t('common.lang.lv')}</option>
              <option value="de-DE">{t('common.lang.de')}</option>
            </Select>
          </Col>
        </Row>
        <Row marginBottom="1rem">
          <Col>
            <Typography variant="body1" marginBottom="1rem">
              <T keyName="gender">Пол</T>
            </Typography>
          </Col>
        </Row>
        <Row marginBottom="1.4rem">
          <Col>
            <Flex flexDirection="column">
              <Box mb="1.4rem">
                <Radio
                  label={<T keyName="setting.page.female">Женский</T>}
                  value="female"
                  id="female"
                  {...register('sex')}
                />
              </Box>
              <Radio label={<T keyName="setting.page.male">Мужской</T>} value="male" id="male" {...register('sex')} />
            </Flex>
          </Col>
        </Row>
        <Row marginBottom="1rem">
          <Col>
            <Typography variant="body1">Дата рождения</Typography>
          </Col>
        </Row>
        <Row marginBottom="1.4rem">
          <Col>
            <Controller
              control={control}
              name="age"
              render={({ field }) => (
                <ReactDatePicker
                  selected={new Date(field.value)}
                  onChange={field.onChange}
                  popperClassName="popperDataPickerRange"
                  locale={ru}
                  dateFormat="P"
                  showYearDropdown
                  customInput={<CustomInputDatePicker />}
                />
              )}
            />
          </Col>
        </Row>
        <Row marginBottom="1.4rem">
          <Col>
            <Input
              placeholder="Введите имя"
              label={<T keyName="city">Город</T>}
              {...register('city', {
                required: true,
                pattern: /[а-яА-Яa-zA-Z0-9 ]{2,50}/,
              })}
            />
          </Col>
        </Row>
        <Row marginBottom="1rem">
          <Col>
            <Typography variant="body1">
              <T keyName="interests">Интересы</T>
            </Typography>
          </Col>
          <Col css={{ float: 'right' }}>
            <Link to="/profile/settings/interests" css={{ float: 'right' }}>
              <Typography variant="body1" color="mainPurple">
                <T keyName="setting.page.select">Выбрать</T>
              </Typography>
            </Link>
          </Col>
        </Row>
        <Row marginBottom="1.4rem">
          <Col>
            <Input value={interests} onChange={() => null} />
          </Col>
        </Row>
        <Row marginBottom="1.4rem">
          <Col>
            <Typography variant="body1" marginBottom="1rem">
              <T keyName="setting.page.profile_description">Описание профиля</T>
            </Typography>
          </Col>
        </Row>
        <Row marginBottom="1.4rem">
          <Col>
            <ReactTextareaAutosize
              {...register('description')}
              minRows={2}
              placeholder="Опишите профиль"
              css={(theme) => ({
                resize: 'none',
                padding: '1.2rem 1.6rem',
                borderRadius: '1.2rem',
                background: theme.color.bg,
                border: 'none',
                fontSize: '1.6rem',
                width: '100%',
              })}
            />
          </Col>
        </Row>
        <AdaptiveButton>
          {!isLoading ? (
            <Fragment>
              <Button fullSize type="submit" css={{ '@media (max-width: 734px)': { display: 'none' } }}>
                <T keyName="done">Готово</T>
              </Button>
              <MobileButton type="submit">
                <Typography variant="body1" color="mainPurple">
                  <T keyName="done">Готово</T>
                </Typography>
              </MobileButton>
            </Fragment>
          ) : (
            <Flex justifyContent="center">
              <Icon
                source={svgSpinner}
                css={{ width: '5rem', '@media (max-width: 734px)': { width: '2.5rem', marginRight: '2rem' } }}
              />
            </Flex>
          )}
        </AdaptiveButton>
      </form>
    </Fragment>
  );
};
