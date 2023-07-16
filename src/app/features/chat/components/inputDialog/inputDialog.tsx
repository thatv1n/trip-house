/* eslint-disable no-unused-expressions */
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import styled from '@emotion/styled';
import { FC, useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReactTextareaAutosize from 'react-textarea-autosize';

import { AudioPlayer, Flex, RecordVoice, Typography } from '@/components';
import { Icon } from '@/components/icon/icon';

import svgClose from '#/icons/close.svg';
import svgMicrophone from '#/icons/microphone.svg';
import svgPlus from '#/icons/plusColor.svg';
import svgSendMessage from '#/icons/sendMessage.svg';
import svgSmile from '#/icons/smileChat.svg';

import { sendMessageAction } from '@/features/chat/chat.actions';

import './inputDialog.css';

interface PropsTypes {
  scrollBottom: () => void;
}

const WrapSvg = styled.label(() => {
  return {
    display: 'flex',
    alignItems: 'flex-end',
    cursor: 'pointer',
    width: '2.5rem',
    paddingBottom: '0.5rem',
    marginRight: '1.4rem',
    opacity: 0.7,
    transition: ' 0.1s ease',
    '&:active': {
      opacity: 0.2,
    },
    '&:last-child': {
      marginRight: '0',
      width: 'auto',
    },
    '&:hover': {
      opacity: 1,
    },
  };
});

const ErrorForm = styled.p(() => {
  return {
    textAlign: 'center',
    color: 'red',
    mergeLeft: '0.5rem',
  };
});

const WrapEmojiModal = styled.div(() => {
  return {
    position: 'absolute',
    right: '2rem',
    bottom: '6rem',
    '@media (max-width: 375px)': { right: '1rem' },
    '@media (max-width: 320px)': { right: '0rem' },
  };
});

const fileTypes = ['JPEG', 'PNG', 'JPG'];

export const InputDialog: FC<PropsTypes> = ({ scrollBottom }) => {
  const dispatch = useDispatch();

  const { chatId } = useParams();
  const [textArea, setTextArea] = useState('');
  const [isModalEmoji, setIsModalEmoji] = useState(false);

  const [files, setFiles] = useState<any | null>([]);
  const [errorHandler, setErrorHandler] = useState('');
  const [loadFiles, setLoadFiles] = useState<any>([]);

  const [record, setRecord] = useState(false);
  const [isVoiceMessage, setIsVoiceMessage] = useState(false);
  const [fileVoice, setFileVoice] = useState<File>();

  const [urlVoice, setUrlVoice] = useState<string | null>(null);

  const handleChange = (file: File): void => {
    setFiles(file);
  };

  useEffect(() => {
    if (files.length) {
      for (let i = 0; i < files?.length; i++) {
        setLoadFiles((item: any) => [...item, files[i]]);
      }
    }
  }, [files]);

  const resetFiles = (): void => {
    setLoadFiles([]);
    setFiles([]);
    setUrlVoice(null);
  };

  const startRecordVoice = (): void => {
    setIsVoiceMessage(true);
    setRecord(true);
  };

  const resetVoice = (): void => {
    setIsVoiceMessage(false);
    setUrlVoice(null);
    setFiles([]);
  };

  const sendMessage = (): void => {
    if (textArea.length || files.length || fileVoice) {
      const fd = new FormData();
      fd.append('chatId', chatId!);
      if (textArea) {
        fd.append('text', textArea);
      }
      if (files.length) {
        for (const file of files) {
          fd.append('pictures[]', file);
        }
      }
      if (fileVoice) {
        fd.append('audio', fileVoice, 'audio.wav');
      }
      dispatch(sendMessageAction.started(fd));
      setLoadFiles([]);
      setFiles([]);
      setTextArea('');
      setIsModalEmoji(false);
      setUrlVoice(null);
      setIsVoiceMessage(false);
      scrollBottom();
    }
  };

  const PressEnter = (e: any): void => {
    if (e.keyCode === 13) {
      if (e.shiftKey) {
        e.preventDefault();
        setTextArea((item) => `${item}\n`);
      } else {
        e.preventDefault();
        sendMessage();
      }
    }
  };

  const modalEmoji = (): void => {
    setIsModalEmoji((item) => !item);
  };

  const viewFiles = files?.length ? (
    <div>
      <Typography mt="1rem" variant="body1">
        {files.length === 1 ? 'Прикрепленный файл:' : files.length > 1 && 'Прикрепленные файлы:'}
      </Typography>
      {files.length > 0 && (
        <Typography variant="body1" ml="1.4rem">
          {loadFiles.map((item: File, i: number) => (
            <div key={i}>{item.name}</div>
          ))}
          <Typography
            css={(theme: { color: { mainPurple: string } }) => ({ color: theme.color.mainPurple, cursor: 'pointer' })}
            onClick={resetFiles}
          >
            Очистить
          </Typography>
        </Typography>
      )}
    </div>
  ) : null;

  const addEmojiMessage = (e: any): void => {
    setTextArea((item) => `${item} ${e.native}`);
  };

  return (
    <Flex
      css={(theme: { color: { white: string } }) => ({
        padding: '2rem  1.7rem 1.8rem 1.4rem',
        background: theme.color.white,
        zIndex: 10,
        position: 'relative',
        borderRadius: '1rem',
      })}
    >
      {!urlVoice ? (
        <Flex mr="1.4rem" alignItems="flex-end" pb="-1rem">
          <FileUploader
            handleChange={(file: File) => handleChange(file)}
            name="file"
            types={fileTypes}
            onTypeError={(err: string) => setErrorHandler(err)}
            multiple
          >
            <WrapSvg>
              <Icon source={svgPlus} css={{ width: '2.4rem', height: '2.4rem' }} />
            </WrapSvg>
          </FileUploader>
        </Flex>
      ) : (
        <Flex mr="1.4rem" alignItems="flex-end" mb="0.6rem" onClick={resetVoice}>
          <WrapSvg>
            <Icon source={svgClose} css={{ width: '1.4rem', height: '1.4rem' }} />
          </WrapSvg>
        </Flex>
      )}

      <Flex css={{ width: '100%', marginRight: '1.4rem' }} flexDirection="column">
        {!isVoiceMessage && (
          <ReactTextareaAutosize
            onKeyDown={(e) => PressEnter(e)}
            onChange={(e) => setTextArea(e.target.value)}
            onClick={() => setIsModalEmoji(false)}
            minRows={1}
            value={textArea}
            placeholder="Сообщение"
            css={(theme) => ({
              resize: 'none',
              padding: '0.65rem 0.12rem 0.75rem 1.2rem',
              width: '100%',
              border: `1px solid ${theme.color.lightGray6}`,
              background: theme.color.bg,
              borderRadius: '18px',
              overflow: 'hidden',
              fontSize: '1.6rem',
              marginRight: '1.4rem',
            })}
          />
        )}
        {record && (
          <RecordVoice
            record={record}
            setRecord={setRecord}
            setIsVoiceMessage={setIsVoiceMessage}
            setFileVoice={setFileVoice}
            setUrlVoice={setUrlVoice}
          />
        )}

        {urlVoice && (
          <Flex
            css={{
              '@media (max-width: 425px)': { width: '100%', maxWidth: '25.5rem' },
              '@media (max-width: 375px)': { maxWidth: '22.7rem' },
              '@media (max-width: 320px)': { maxWidth: '17.4rem' },
            }}
          >
            <AudioPlayer urlVoice={urlVoice} messageId="input" />
          </Flex>
        )}
        {viewFiles}
        {errorHandler === 'File type is not supported' && (
          <ErrorForm>Такой тип файла не подходит, допустимые файлы формата JPEG,PNG!</ErrorForm>
        )}
        {errorHandler === 'File size is too big' && (
          <ErrorForm>Большой размер файла, размер не должен превышать 1МБ!</ErrorForm>
        )}
      </Flex>
      <WrapSvg onClick={sendMessage}>
        <Icon source={svgSendMessage} css={{ width: '2.4rem', height: '2.4rem' }} />
      </WrapSvg>
      <WrapSvg onClick={modalEmoji}>
        <Icon source={svgSmile} css={{ width: '2.4rem', height: '2.4rem' }} />
      </WrapSvg>

      {isModalEmoji && (
        <WrapEmojiModal>
          <Picker
            data={data}
            onEmojiSelect={addEmojiMessage}
            locale="ru"
            previewPosition="none"
            searchPosition="none"
            theme="light"
          />
        </WrapEmojiModal>
      )}
      {!isVoiceMessage && (
        <WrapSvg onClick={startRecordVoice}>
          <Icon source={svgMicrophone} css={{ width: '2rem', height: '2.5rem' }} />
        </WrapSvg>
      )}
    </Flex>
  );
};
