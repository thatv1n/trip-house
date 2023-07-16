/* eslint-disable no-restricted-syntax */
/* eslint-disable react/jsx-props-no-spreading */
import { Theme } from '@emotion/react';
import styled from '@emotion/styled';
import ru from 'date-fns/locale/ru';
import { FC, forwardRef, useEffect, useReducer, useRef, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { FileUploader } from 'react-drag-drop-files';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import ReactTextareaAutosize from 'react-textarea-autosize';

import '@/components/dataPickerRange/datapicker.style.css';

import svgPlus from '#/icons/plus_dnd.svg';
import './dnd.style.css';

import { Box, Button, Col, EventsMap, Flex, Input, Modal, Row, Select, Typography } from '@/components';
import { menuShortEventsState } from '@/components/eventsFilter/eventsFilter.types';
import { Icon } from '@/components/icon/icon';
import { AuthState } from '../auth/auth.types';

import pngChecked from '#/img/checked.png';

import imgArrowDownPurple from '#/img/arrow-down-purple.png';
import { getCategoryAction } from '@/components/eventsFilter/eventsFilter.action';
import { createEventApi } from './createEvent.api';
import { addressMapType } from './createEvent.types';
import { initialStateForm, reducerForm } from './CreateEventReducerForm';
import { T, useTranslate } from '@tolgee/react';

const WrapContainer = styled.div(() => {
  return {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 106,
    left: '-14rem',
    '@media (max-width: 1439px)': {
      position: 'static',
    },
    '@media (max-width: 734px)': {
      marginBottom: 0,
      paddingBottom: '7.1rem',
    },
  };
});

const Body = styled.div<{ isWidth: string; mr?: string; p?: string }>(({ theme, isWidth, mr, p }) => {
  return {
    width: '100%',
    maxWidth: isWidth,
    height: '100%',
    backgroundColor: theme.colors.white,
    borderRadius: '1rem',
    minWidth: '23.5rem',
    padding: p,
    marginRight: mr,
    '@media (max-width: 734px)': {
      marginTop: '-1rem',
    },
  };
});

const Tabs = styled.div(({ theme }) => {
  return {
    width: '100%',
    background: theme.colors.bg,
    height: 40,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    padding: '0.3rem 0.2rem',
    marginTop: '1.4rem',
  };
});

const OneTab = styled.div<{ isBg: string }>(({ isBg }) => {
  return {
    width: '100%',
    height: '100%',
    background: isBg,
    borderRadius: '0.8rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background 0.2s ease-in-out',
  };
});

const ErrorForm = styled.p(() => {
  return {
    textAlign: 'center',
    color: 'red',
    mergeLeft: '0.5rem',
  };
});

const InputDate = styled.div<{ bg: boolean; mobileVersion: boolean }>(({ theme, mobileVersion }) => {
  return {
    height: '4rem',
    borderRadius: '1rem',
    border: `1px solid ${theme.colors.bg}`,
    padding: '1rem 2rem',
    minWidth: '14rem',
    background: `url(${imgArrowDownPurple}) no-repeat `,
    backgroundPosition: '98% center',
    width: '100%',
    fontSize: '1.6rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.colors.white,

    '@media (max-width: 734px)': mobileVersion && {
      backgroundColor: theme.colors.white,
      padding: '1rem, 1.6rem 1.3rem 1rem',
      borderRadius: 0,
      height: '5.9rem',
    },
  };
});

const StyledCheckbox = styled.input(() => {
  return {
    position: 'absolute',
    zIndex: -1,
    opacity: 0,
    '&:checked + label:before': {
      background: `url(${pngChecked}) center/cover no-repeat`,
    },
  };
});

const cssLabel = (theme: Theme) => {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    userSelect: 'none',
    cursor: 'pointer',
    '&:before': {
      content: '""',
      display: 'inline-block',
      width: '2.4rem',
      minWidth: '2.4rem',
      height: '2.4rem',
      margin: '0 1rem 0 0',
      border: `1px solid ${theme.color.lightGray}`,
      borderRadius: '50px',
    },
  };
};

const CustomInputDatePicker = forwardRef(({ value, onClick, bg, mobileVersion }: any, ref: any) => (
  <InputDate className="example-custom-input" onClick={onClick} ref={ref} bg={bg} mobileVersion={mobileVersion}>
    {value || (
      <Flex css={{ position: 'relative', width: '100%' }}>
        <Typography css={{ width: '100%' }}>Выберите дату и время</Typography>
      </Flex>
    )}
  </InputDate>
));

const fileTypes = ['JPEG', 'PNG', 'JPG'];

export const CreateEvent: FC = () => {
  const tabs = ['Ивент'];
  const { t } = useTranslate();
  const categories = useSelector((state: menuShortEventsState) => state.menuShortEvents.categories);
  const geo = useSelector((state: AuthState) => state.auth?.geoIp);

  const [activeTab, setActiveTab] = useState(0);
  const [loadFile, setloadFile] = useState<File | null>(null);
  const [textArea, setTextArea] = useState('');
  const [startDate, setStartDate] = useState<any>();
  const [modal, setModal] = useState(false);
  const [bodyModal, setBodyModal] = useState({ title: '', body: '' });

  const select = useRef(null);
  const textAreaRef = useRef<HTMLDivElement | null>(null);
  const refDnD = useRef<HTMLDivElement | null>(null);
  const addressRef = useRef<HTMLInputElement>(null);

  const [stateForm, dispatchForm] = useReducer(reducerForm, initialStateForm);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleChange = (file: File): void => {
    dispatchForm({ type: 'SET_ERROR', payload: '' });
    setloadFile(file);
  };

  const toggleTab = (key: number): void => {
    setActiveTab(key);
  };

  const onSubmit = async (data: any): Promise<any> => {
    dispatchForm({ type: 'SET_ERROR', payload: '' });
    const maxNumberOfPeople = Number(data.maxNumberOfPeople.replace('человек', '').trim());

    const errorHandler = (message: string): void => dispatchForm({ type: 'SET_ERROR', payload: message });

    if (!loadFile) {
      errorHandler('null');
      refDnD.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (!textArea.length) {
      errorHandler('Введите описание ивента!');
      textAreaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (maxNumberOfPeople > 99) {
      errorHandler('Количество участвующих не должно быть больше 99!');
      return;
    }
    if (!addressRef.current?.value) {
      errorHandler('Выберите место на карте!');
      return;
    }
    if (!startDate) {
      errorHandler('Укажите дату и время!');
      return;
    }

    const obj = {
      description: textArea,
      geo: { lat: stateForm.position[0], lng: stateForm.position[1] },
      ...data,
      address: {
        country: stateForm.addressMap.country,
        city: stateForm.addressMap.city,
        detail: addressRef.current?.value,
      },
      startAt: new Date(startDate),
      categoryIds: stateForm.categoriesChecked,
      maxNumberOfPeople: Number(maxNumberOfPeople),
      large: loadFile,
      small: loadFile,
    };

    const fd = new FormData();

    Object.entries(obj).forEach(([key, value]) => {
      if (['categoryIds', 'geo', 'address'].includes(key)) {
        fd.append(key, JSON.stringify(value));
      } else {
        fd.append(key, value);
      }
    });

    const response = await createEventApi.createEvent(fd).then((res) => {
      return res.json();
    });

    if (!response.success) {
      setBodyModal({ title: 'Ошибка', body: 'Ошибка при создании,проверьте заполнение всех полей' });
      setModal(true);
      throw response.error;
    }

    setloadFile(null);
    setTextArea('');
    dispatchForm({ type: 'SET_ADDRESS', payload: { country: '', city: '', detail: '' } });
    dispatchForm({ type: 'SET_POSITION', payload: [0, 0] });
    dispatchForm({ type: 'SET_CATEGORIES', payload: [] });
    reset();
    setStartDate('');
    setBodyModal({
      title: 'Ивент создан',
      body: 'Ваш ивент находится на проверке. После согласования мы направим вам уведомление.',
    });
    setModal(true);
  };

  const checkedCategories = (e: any): void => {
    const { target } = e;
    const category = target.value;
    const isChecked = stateForm.categoriesChecked.includes(category);

    if (category && !isChecked) {
      const categoriesNew = [...stateForm.categoriesChecked, category];
      dispatchForm({ type: 'SET_CATEGORIES', payload: categoriesNew });
    } else if (isChecked) {
      const categoriesNew = stateForm.categoriesChecked.filter((id: string) => id !== category);
      dispatchForm({ type: 'SET_CATEGORIES', payload: categoriesNew });
    }

    target.value = '';
  };

  const categoriesText = categories
    ?.map((tag) => (stateForm.categoriesChecked.includes(`${tag.id}`) ? tag.title : null))
    .filter(Boolean)
    .join(', ');

  useEffect(() => {
    dispatch(getCategoryAction.started(null));
  }, []);

  useEffect(() => {
    dispatchForm({ type: 'SET_POSITION', payload: geo?.lat ? [geo.lat, geo.lon] : [55.751244, 37.618423] });
  }, [geo]);

  const setPosition = (value: number[]): void => {
    dispatchForm({ type: 'SET_POSITION', payload: value });
  };

  const setAddress = (value: addressMapType): void => {
    dispatchForm({ type: 'SET_ADDRESS', payload: value });
  };

  const isModalClose = (e: any): void => {
    const { target } = e;

    if (target.getAttribute('data-target')) {
      setModal(false);
    }
  };

  useEffect(() => {
    const addressValue = addressRef.current;
    if (addressValue) addressValue.value = stateForm.addressMap.detail;
  }, [stateForm.addressMap.detail]);

  return (
    <Box>
      <WrapContainer>
        <Body
          isWidth="34.3rem"
          mr="2rem"
          p="2rem 2rem 3rem 2rem"
          css={{
            '@media (max-width: 734px)': {
              display: 'none',
            },
          }}
        >
          <Typography variant="h1">{t('event.creation', 'Создание')}</Typography>
          <Tabs>
            {tabs.map((item, i) => {
              return (
                <OneTab isBg={`${activeTab === i && '#FFF'}`} onClick={() => toggleTab(i)} key={i}>
                  <Typography variant="body1">{item}</Typography>
                </OneTab>
              );
            })}
          </Tabs>
        </Body>
        <Body
          isWidth="77.7rem"
          css={{
            padding: '3rem 2rem 3.2rem 3rem',
            '@media (max-width: 734px)': {
              padding: '3rem 2rem 2rem 2rem',
            },
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex flexDirection="column">
              <Col marginBottom="1.4rem">
                <Row flexDirection="column">
                  <Typography variant="body1" marginBottom="1rem">
                    <T keyName="event.name">Название ивента</T>
                  </Typography>
                  <Input
                    placeholder="Введите название ивента"
                    css={(theme) => ({
                      background: theme.color.white,
                      height: '4.5rem',
                      border: `2px solid ${theme.color.bg}`,
                    })}
                    wth="100%"
                    {...register('title', {
                      required: true,
                      pattern: /[a-zA-Zа-яА-Я0-9 ]{3,50}/,
                    })}
                    aria-invalid={errors.title ? 'true' : 'false'}
                  />
                  {errors.title && <ErrorForm>Название должно быть не меньше трех символов</ErrorForm>}
                </Row>
              </Col>
              <Col>
                <Row flexDirection="column" ref={refDnD}>
                  <FileUploader
                    handleChange={(file: File) => handleChange(file)}
                    name="file"
                    types={fileTypes}
                    onTypeError={(err: string) => dispatchForm({ type: 'SET_ERROR', payload: err })}
                    maxSize="10"
                    onSizeError={(file: string) => dispatchForm({ type: 'SET_ERROR', payload: file })}
                  >
                    <Flex
                      alignItems="center"
                      justifyContent="center"
                      css={(theme: { color: { bg: any } }) => ({
                        width: '100%',
                        maxWidth: '77.7rem',
                        height: '10rem',
                        background: theme.color.bg,
                        borderRadius: '2rem',
                      })}
                    >
                      <Icon source={svgPlus} css={{ width: '2.3rem', marginRight: '1.2rem' }} />
                      <Typography
                        variant="body1"
                        css={(theme: any) => ({ color: theme.color.mainPurple, cursor: 'pointer' })}
                      >
                        <T keyName="event.add_cover">Добавить обложку</T>
                      </Typography>
                    </Flex>
                  </FileUploader>
                  {stateForm.errorHandler === 'File type is not supported' && (
                    <ErrorForm>Такой тип файла не подходит, допустимые файлы формата JPEG,PNG!</ErrorForm>
                  )}
                  {stateForm.errorHandler === 'File size is too big' && (
                    <ErrorForm>Большой размер файла, размер не должен превышать 10МБ!</ErrorForm>
                  )}
                  {stateForm.errorHandler === 'null' && <ErrorForm>Добавьте обложку!</ErrorForm>}
                  <Typography variant="body1" justifyContent="center" display="flex" mt="1rem">
                    {loadFile ? `Имя обложки: ${loadFile.name}` : ''}
                  </Typography>
                </Row>
              </Col>
              <Col marginBottom="1.4rem">
                <Row flexDirection="column" css={{ position: 'relative' }}>
                  <Typography variant="body1" marginBottom="1rem" ref={textAreaRef}>
                    <T keyName="event.description">Описание ивента</T>
                  </Typography>
                  <Typography variant="mini1" css={{ position: 'absolute', zIndex: 5, right: 20, bottom: 6 }}>
                    {textArea.length}/2000
                  </Typography>
                  <ReactTextareaAutosize
                    onChange={(e) => setTextArea(e.target.value.substring(0, 2000))}
                    minRows={2}
                    value={textArea}
                    placeholder={t('event.describe', 'Опишите мероприятие')}
                    css={(theme) => ({
                      resize: 'none',
                      padding: '1.2rem 1.6rem',
                      borderRadius: '1.2rem',
                      border: `2px solid ${theme.color.bg}`,
                      fontSize: '1.4rem',
                    })}
                  />
                  {stateForm.errorHandler === 'Введите описание ивента!' && (
                    <ErrorForm>{stateForm.errorHandler}</ErrorForm>
                  )}
                </Row>
              </Col>
              <Col marginBottom="1.4rem">
                <Row flexDirection="column">
                  <Typography variant="body1" marginBottom="1rem">
                    <T keyName="event.category">Категория</T>
                  </Typography>
                  <Select ref={select} colorArrow css={{ height: '4.5rem' }} onClick={(e) => checkedCategories(e)}>
                    <option value="">{categoriesText || 'Выберите категории'}</option>
                    {categories?.map((item) => (
                      <option value={`${item.id}`} key={item.id}>
                        {item.title}
                      </option>
                    ))}
                  </Select>
                </Row>
                <Row />
              </Col>
              <Col marginBottom="1.4rem">
                <Row flexDirection="column">
                  <Typography variant="body1" marginBottom="1rem">
                    <T keyName="event.number_of_people">Количество людей</T>
                  </Typography>
                  <Input
                    placeholder={t('event.number_of_people.example', 'Например, 13 человек')}
                    css={(theme) => ({
                      background: theme.color.white,
                      height: '4.5rem',
                      border: `2px solid ${theme.color.bg}`,
                    })}
                    wth="100%"
                    {...register('maxNumberOfPeople', { required: true })}
                  />
                </Row>
                {stateForm.errorHandler === 'Количество участвующих не должно быть больше 99!' && (
                  <ErrorForm>{stateForm.errorHandler}</ErrorForm>
                )}
              </Col>
              <Col marginBottom="1.4rem">
                <Row flexDirection="column">
                  <Typography variant="body1" marginBottom="1rem">
                    <T keyName="event.date_and_time">Дата и время ивента</T>
                  </Typography>
                  <ReactDatePicker
                    selected={startDate}
                    showTimeSelect
                    locale={ru}
                    popperClassName="popperDataPickerRange"
                    dateFormat="d MMMM, в HH:mm"
                    customInput={<CustomInputDatePicker />}
                    onChange={(date: any) => setStartDate(date)}
                  />
                </Row>
                {stateForm.errorHandler === 'Укажите дату и время!' && <ErrorForm>{stateForm.errorHandler}</ErrorForm>}
              </Col>
              <Col marginBottom="1.4rem">
                <Row flexDirection="column">
                  <Typography
                    variant="body1"
                    css={{
                      '@media (max-width: 768px)': {
                        marginBottom: '1rem',
                      },
                    }}
                  >
                    Выберите место на карте
                  </Typography>
                  <EventsMap
                    createEvent
                    position={stateForm.position}
                    center={geo?.lat ? [geo.lat, geo.lon] : [55.751244, 37.618423]}
                    setPosition={setPosition}
                    setAddress={setAddress}
                  />
                </Row>
                {stateForm.errorHandler === 'Выберите место на карте!' && (
                  <ErrorForm>{stateForm.errorHandler}</ErrorForm>
                )}
              </Col>
              <Col marginBottom="1.4rem">
                <Row flexDirection="column">
                  <Typography variant="body1" marginBottom="1rem">
                    <T keyName="event.venue">Место проведения</T>
                  </Typography>
                  <Typography variant="body1" marginBottom="1rem">
                    <Input
                      placeholder="Например, Тверская улица, дом 15, кв 43"
                      css={(theme) => ({
                        background: theme.color.white,
                        height: '4.5rem',
                        border: `2px solid ${theme.color.bg}`,
                      })}
                      wth="100%"
                      ref={addressRef}
                      disabled={!stateForm.addressMap.detail}
                    />
                  </Typography>
                </Row>
              </Col>
              <Col marginBottom="1.4rem">
                <Flex>
                  <StyledCheckbox type="checkbox" id="myCheckbox" defaultChecked name="myCheckbox" />
                  <Typography htmlFor="myCheckbox" css={cssLabel} as="label" variant="body1">
                    <T keyName="event.publish_contacts">Опубликовать мои контакты</T>
                  </Typography>
                </Flex>
              </Col>
              <Button fullSize type="submit">
                <Typography variant="body1" css={(theme: any) => ({ color: theme.color.white })}>
                  <T keyName="event.create">Создать</T>
                </Typography>
              </Button>
            </Flex>
          </form>
        </Body>
      </WrapContainer>
      {modal && <Modal isModalClose={isModalClose} title={bodyModal.title} body={bodyModal.body} />}
    </Box>
  );
};
