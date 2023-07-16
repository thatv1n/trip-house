import styled from '@emotion/styled';
import { FC, useEffect, useRef, useState } from 'react';

import { Typography } from '../typography';

import svgRecBubble from '#/icons/RecBubble.svg';
import { Flex } from '../box';
import { Icon } from '../icon/icon';

interface PropsType {
  record: boolean;
  setRecord: (data: boolean) => void;
  setIsVoiceMessage: (data: boolean) => void;
  setFileVoice: (data: any) => void;
  setUrlVoice: (data: any) => void;
}

const RecVoice = styled.div(() => {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '39rem',
    width: '100%',
    height: '3.5rem',
    background: '#F4F3FE',
    padding: '0.5rem 1.5rem',
    borderRadius: '1rem',
    '@media (max-width: 734px)': { maxWidth: '30rem' },
  };
});

const ButtonStopRec = styled.div(({ theme }) => {
  return {
    width: '3rem',
    height: '3rem',
    minWidth: '3rem',
    borderRadius: '50%',
    backgroundColor: theme.color.mainPurple,
    position: 'relative',
    cursor: 'pointer',
    marginRight: '1rem',
    transition: 'all 0.3 ease',
    opacity: 0.7,
    '&::before': {
      position: 'absolute',
      content: "''",
      width: '1.2rem',
      height: '1.2rem',
      top: '30%',
      left: '0.9rem',
      borderRadius: '0.1rem',
      backgroundColor: theme.color.white,
    },
    '&:hover': {
      opacity: 1,
    },
  };
});

export const RecordVoice: FC<PropsType> = ({ record, setRecord, setIsVoiceMessage, setFileVoice, setUrlVoice }) => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
  const chunksRef = useRef<Blob[]>([]);
  const [currentSeconds, setCurrentSeconds] = useState<number>(0);
  const timerRef = useRef<any>();

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = parseInt(String(seconds % 60), 10);
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const startRecordVoice = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContext.createMediaStreamSource(stream);
      let recorder: MediaRecorder;
      try {
        recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      } catch {
        recorder = new MediaRecorder(stream, { mimeType: 'video/mp4' });
      }
      setMediaRecorder(recorder);

      timerRef.current = setInterval(() => {
        setCurrentSeconds((seconds) => seconds + 1);
      }, 1000);

      recorder.start();
      setIsVoiceMessage(true);
      setRecord(true);

      recorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setFileVoice(blob);
        chunksRef.current = [];
        const url = URL.createObjectURL(blob);
        setUrlVoice(url);
      };
    } catch (error) {
      alert(error);
    }
  };

  const stopRecordVoice = (): void => {
    if (!mediaRecorder) {
      return;
    }
    mediaRecorder.stop();
    setRecord(false);
    clearInterval(timerRef.current);
  };

  useEffect(() => {
    if (record) startRecordVoice();
  }, [record]);

  return (
    <RecVoice>
      <ButtonStopRec onClick={stopRecordVoice} />
      <Flex alignItems="center">
        <Icon source={svgRecBubble} css={{ width: '3.4rem', marginRight: '1.5rem' }} />
        <Typography css={(theme: { color: { darkWhite: string } }) => ({ color: theme.color.darkWhite })}>
          {formatTime(currentSeconds)}
        </Typography>
      </Flex>
    </RecVoice>
  );
};
