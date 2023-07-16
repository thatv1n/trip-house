import styled from '@emotion/styled';
import { FC, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import ReactTextareaAutosize from 'react-textarea-autosize';

import { Button, Flex, Typography } from '@/components';
import { Icon } from '@/components/icon/icon';

import svgPaperclip from '#/icons/paperclip.svg';
import svgSpinner from '#/icons/spinner.svg';

import { sendPostApi } from './sendPost.api';

const Root = styled.div(({ theme }) => {
  return {
    backgroundColor: theme.colors.white,
    borderRadius: '1rem',
    minWidth: '23.5rem',
    padding: '2rem',
    marginBottom: '2rem',
    width: '100%',
    minHeight: '7.2rem',
    display: 'flex',
    flexDirection: 'column',
    '@media (max-width: 734px)': {
      marginBottom: '1rem',
      borderRadius: '0',
      padding: '1.2rem 1.6rem',
      minHeight: 'auto',
    },
  };
});

const BtnAttachFile = styled.button(({ theme }) => {
  return {
    width: '4rem',
    height: '4rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    background: theme.colors.bg,
    borderRadius: '1rem',
    cursor: 'pointer',
    transition: '0.2s ease-in-out',
    marginRight: '0.9rem',
    '&:hover': {
      background: '#d9d9d9',
    },
    '&:active': {
      background: theme.colors.bg,
    },
  };
});

const WrapModalLoadFile = styled.div(({ theme }) => {
  return {
    position: 'fixed',
    width: '100%',
    height: '100%',
    zIndex: '1',
    left: 0,
    top: 0,
    backgroundColor: theme.color.transparentGray,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
});

const ModalFileMain = styled.div(({ theme }) => {
  return {
    width: '100%',
    maxWidth: 1076,
    background: theme.color.bg,
    zIndex: 2,
    borderRadius: 10,
    '@media (max-width: 734px)': { maxWidth: 300 },
  };
});

const ErrorForm = styled.p(() => {
  return {
    textAlign: 'center',
    color: 'red',
    marginTop: '2rem',
  };
});

const fileTypes = ['JPEG', 'PNG', 'JPG'];

export const SendPost: FC<{ getWall: () => void; getMyProfile: () => void }> = ({ getWall, getMyProfile }) => {
  const [isLoadFile, setIsLoadFile] = useState(false);
  const [loadFile, setloadFile] = useState<File | null>(null);
  const [errorHandler, setErrorHandler] = useState('');
  const [textArea, setTextArea] = useState('');
  const [isSendPost, setIsSendPost] = useState(false);

  const handleChange = (file: File): void => {
    setErrorHandler('');
    if (file) setIsLoadFile(false);
    setloadFile(file);
  };

  const isModalClose = (
    e: Event & {
      target: any;
    },
  ): void => {
    const { target } = e;
    if (target.getAttribute('data-target')) {
      setIsLoadFile(false);
    }
  };

  const createPost = async (): Promise<any> => {
    setIsSendPost(true);
    const fd = new FormData();
    if (textArea) fd.append('text', textArea);
    if (loadFile) fd.append('pictures[]', loadFile);
    const response = await sendPostApi.createPost(fd).then((res) => {
      return res.json();
    });
    if (response.success) {
      setloadFile(null);
      setTextArea('');
      getWall();
      setIsSendPost(false);
      getMyProfile();
    } else {
      throw response.error;
    }
  };
  const createPostEnter = (e: any): void => {
    if (e.keyCode === 13) {
      createPost();
    }
  };

  const createPostButton = (): void => {
    createPost();
  };
  return (
    <Root>
      <Flex>
        <BtnAttachFile onClick={() => setIsLoadFile(true)}>
          <Icon source={svgPaperclip} css={{ width: '1.8rem', height: '1.9rem' }} />
        </BtnAttachFile>
        <ReactTextareaAutosize
          onChange={(e) => setTextArea(e.target.value.substring(0, 2000))}
          onKeyDown={(e) => createPostEnter(e)}
          minRows={1}
          value={textArea}
          placeholder="Что у вас нового?"
          css={(theme) => ({
            resize: 'none',
            padding: '1.15rem 2rem',
            borderRadius: '1.2rem',
            border: 'none',
            width: '100%',
            background: theme.color.bg,
            fontSize: '1.4rem',
          })}
        />
        {(textArea || loadFile) &&
          (!isSendPost ? (
            <Button css={{ marginLeft: '1rem', height: '4rem' }} onClick={createPostButton}>
              Опубликовать
            </Button>
          ) : (
            <Icon source={svgSpinner} css={{ width: '5rem' }} />
          ))}
        {isLoadFile && (
          <WrapModalLoadFile onClick={(e: any) => isModalClose(e)} data-target="wrapModalLoadFile">
            <ModalFileMain>
              <FileUploader
                handleChange={(file: File) => handleChange(file)}
                name="file"
                types={fileTypes}
                onTypeError={(err: string) => setErrorHandler(err)}
                maxSize="10"
                onSizeError={(file: string) => setErrorHandler(file)}
              >
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                  css={(theme: { color: { bg: any } }) => ({
                    width: '100%',
                    height: '34.6rem',
                    background: theme.color.bg,
                    borderRadius: '2rem',
                    padding: '1rem',
                    '@media (max-width: 734px)': { height: 200 },
                  })}
                >
                  <Flex
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
                    css={(theme: { color: { lightGray3: string } }) => ({
                      border: `1px dashed ${theme.color.lightGray3}`,
                      borderRadius: '2rem',
                      width: '100%',
                      height: '100%',
                    })}
                  >
                    <Typography
                      css={(theme: any) => ({
                        color: theme.color.lightGray3,
                        cursor: 'pointer',
                        fontSize: '3.8rem',
                        '@media (max-width: 734px)': { fontSize: '1.6rem' },
                        marginBottom: '6rem',
                      })}
                    >
                      Бросьте файл для загрузки сюда
                    </Typography>

                    <Button
                      css={{
                        width: '34.6rem',
                        height: '6.1rem',
                        '@media (max-width: 734px)': { width: 'auto', height: 'auto' },
                      }}
                    >
                      Загрузить файл
                    </Button>
                    {errorHandler === 'File type is not supported' && (
                      <ErrorForm>Такой тип файла не подходит, допустимые файлы формата JPEG,PNG!</ErrorForm>
                    )}
                    {errorHandler === 'File size is too big' && (
                      <ErrorForm>Большой размер файла, размер не должен превышать 1МБ!</ErrorForm>
                    )}
                  </Flex>
                </Flex>
              </FileUploader>
            </ModalFileMain>
          </WrapModalLoadFile>
        )}
      </Flex>
      {loadFile && (
        <Typography variant="body1" mt="1rem">
          {loadFile ? `Имя файла: ${loadFile.name}` : ''}
        </Typography>
      )}
    </Root>
  );
};
