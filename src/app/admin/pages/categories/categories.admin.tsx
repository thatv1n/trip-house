/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect, useCallback, useRef } from 'react';
import styled from '@emotion/styled';
import debounce from 'lodash.debounce';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Icon } from '@/components/icon/icon';
import svgArrowLeft from '#/icons/chevron-up.svg';
import svgEdit from '#/icons/admin/edit-gray.svg';
import svgDel from '#/icons/admin/del.svg';

import { getCategoryAction } from '@/components/eventsFilter/eventsFilter.action';
import { menuShortEventsState } from '@/components/eventsFilter/eventsFilter.types';
import { Box, Button, Flex, Input, Typography } from '@/components';

import { categoriesAdminApi } from './categories.admin.api';

const ClickedIcon = styled.div(() => {
  return {
    transition: 'opacity 0.1s ease-in-out',
    cursor: 'pointer',
    '&:active': {
      opacity: '0.5',
    },
  };
});

export const CategoriesAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = useState('');
  const input = useRef<HTMLInputElement | null>(null);

  const categories = useSelector((state: menuShortEventsState) => state.menuShortEvents.categories);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    dispatch(getCategoryAction.started(null));
  }, []);

  useEffect(() => {
    input.current?.focus();
  }, [activeItem]);

  const EditCategory = useCallback(
    debounce(async (item: HTMLInputElement, id: string) => {
      const { value } = item;
      const params = new URLSearchParams();
      params.set('title', value);
      const response = await categoriesAdminApi.editCategory(params, id).then((res) => {
        return res.json();
      });
      if (response.success) {
        setActiveItem('');
        dispatch(getCategoryAction.started(null));
      } else {
        throw response.error;
      }
    }, 1000),
    [],
  );

  const addCategory = async (data: any): Promise<any> => {
    const params = new URLSearchParams();
    params.set('title', data.text);
    const response = await categoriesAdminApi.addCategory(params).then((res) => {
      return res.json();
    });
    if (response.success) {
      dispatch(getCategoryAction.started(null));
      reset();
    } else {
      throw response.error;
    }
  };

  const removeCategory = async (id: string): Promise<any> => {
    // eslint-disable-next-line no-restricted-globals
    const isAgree = confirm('Вы уверены что хотите удалить категорию?');
    if (isAgree) {
      const response = await categoriesAdminApi.delCategory(id).then((res) => {
        return res.json();
      });
      if (response.success) {
        dispatch(getCategoryAction.started(null));
      } else {
        throw response.error;
      }
    }
  };

  return (
    <Box css={{ width: '100%' }}>
      <Box css={{ padding: 40 }}>
        <Typography
          onClick={() => navigate('/admin-panel')}
          css={(theme: { color: { mainPurple: any } }) => ({
            fontSize: 35,
            color: theme.color.mainPurple,
            marginRight: 50,
            display: 'flex',
            cursor: 'pointer',
            marginBottom: 40,
          })}
        >
          <Icon source={svgArrowLeft} css={{ width: 24, marginRight: 16 }} />
          Категории
        </Typography>
        <Typography css={{ fontSize: 16 }}>Введите название новой категории</Typography>
        <form onSubmit={handleSubmit(addCategory)}>
          <Flex mt="2rem">
            <Input
              css={(theme) => ({
                background: theme.color.white,
                border: `1px solid ${theme.color.mainPurple}`,
                width: 343,
                marginRight: 10,
              })}
              placeholder="Текст"
              {...register('text', {
                required: true,
                pattern: /[0-9a-zA-Zа-яА-Я ]*/g,
              })}
            />
            <Button css={{ width: 226 }}>Добавить</Button>
          </Flex>
        </form>
      </Box>
      <Flex flexDirection="column" css={{ borderBottom: '1px solid black' }}>
        {categories?.map((item) => (
          <div key={item.id}>
            <Flex
              alignItems="center"
              justifyContent="space-between"
              css={{
                borderTop: '1px solid black',
                padding: ' 1.2rem  4.4rem 1.2rem  4rem',
                width: '100%',
              }}
            >
              {activeItem === item.id ? (
                <Input
                  defaultValue={item.title}
                  css={activeItem === item.id ? { fontSize: 16, width: '500px' } : { fontSize: 16, width: '500px' }}
                  ref={activeItem === item.id ? input : null}
                  onChange={(e) => EditCategory(e.target, `${item.id}`)}
                />
              ) : (
                <Typography css={{ fontSize: 16 }}>{item.title}</Typography>
              )}
              <Flex>
                <ClickedIcon onClick={() => setActiveItem(`${item.id}`)}>
                  <Icon source={svgEdit} css={{ width: 24, marginRight: 21 }} />
                </ClickedIcon>
                <ClickedIcon onClick={() => removeCategory(`${item.id}`)}>
                  <Icon source={svgDel} css={{ width: 24 }} />
                </ClickedIcon>
              </Flex>
            </Flex>
          </div>
        ))}
      </Flex>
    </Box>
  );
};
