/* eslint-disable consistent-return */
import styled from '@emotion/styled';
import { FC, useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

import { Icon } from '@/components/icon/icon';

import svgPause from '#/icons/pause.svg';
import { Typography } from '@/components';

interface PropsType {
  urlVoice: string;
  messageId: string;
}

const RecVoice = styled.div<{ messageId: string }>(({ messageId }) => {
  return {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '39rem',
    width: '100%',
    height: '100%',
    maxHeight: '6rem',
    background: messageId === 'input' ? '#F4F3FE' : null,
    boxShadow: messageId !== 'input' && `0px 10px 30px rgba(38, 51, 77, 0.03)`,
    paddingLeft: '1.5rem',
    paddingRight: '1rem',
    borderRadius: '1rem',
    '@media (max-width: 734px)': { maxWidth: '30rem' },
  };
});

const ButtonPlay = styled.div(({ theme }) => {
  return {
    width: '4rem',
    height: '3rem',
    borderRadius: '50%',
    backgroundColor: theme.color.mainPurple,
    position: 'relative',
    cursor: 'pointer',
    transition: 'all 0.3 ease',
    marginRight: '1rem',
    opacity: 0.7,
    minHeight: '3rem',
    minWidth: '3rem',
    '&::before': {
      position: 'absolute',
      content: "''",
      width: '0',
      height: '0',
      border: '1em solid',
      borderColor: `transparent ${theme.color.white} transparent transparent`,
      left: '1.2rem',
      borderRadius: '0.3rem',
      top: '0.5rem',
      transform: 'rotate(180deg)',
    },
    '&:hover': {
      opacity: 1,
    },
  };
});

const ButtonPause = styled.div(({ theme }) => {
  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '4rem',
    height: '3rem',
    borderRadius: '50%',
    backgroundColor: theme.color.mainPurple,
    position: 'relative',
    cursor: 'pointer',
    transition: 'all 0.3 ease',
    marginRight: '1rem',
    opacity: 0.7,
    '&:hover': {
      opacity: 1,
    },

    '@media (max-width: 734px)': { width: '7rem' },
  };
});

export const AudioPlayer: FC<PropsType> = ({ urlVoice, messageId }) => {
  const [waveSurfer, setWaveSurfer] = useState<any>(null);
  const [isPlaying, setIsPlayings] = useState<boolean>(false);
  const [timer, setTimer] = useState('00:00');
  const refContainer = useRef<Element>();

  useEffect(() => {
    if (!urlVoice && !refContainer.current) return;
    const wavesurfer = WaveSurfer.create({
      container: `#${`wavesurfer-${messageId}`}`,
      waveColor: '#6C27AB',
      progressColor: '#6C27AB',
      barRadius: 3,
      barWidth: 3,
      barMinHeight: 1,
      barGap: 3,
      barHeight: 3,
      height: messageId === 'input' ? 35 : 45,
    });
    wavesurfer.load(urlVoice);
    setWaveSurfer(wavesurfer);
    return () => {
      wavesurfer.destroy();
    };
  }, [refContainer.current]);

  useEffect(() => {
    const container = document.querySelector(`#${`wavesurfer-${messageId}`}`);
    if (container) refContainer.current = container;
  }, [urlVoice, messageId]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = parseInt(String(seconds % 60), 10);
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  useEffect(() => {
    if (!waveSurfer) return;

    waveSurfer.on('ready', () => {
      const duration = waveSurfer.getDuration();
      setTimer(formatTime(duration));
    });

    waveSurfer.on('audioprocess', () => {
      const currentTime = waveSurfer.getCurrentTime();
      setTimer(formatTime(currentTime));
    });

    waveSurfer.on('finish', () => {
      setIsPlayings(false);
    });

    // eslint-disable-next-line consistent-return
    return () => {
      waveSurfer.unAll();
    };
  }, [waveSurfer, isPlaying]);

  const playMyRec = (): void => {
    waveSurfer.play();
    setIsPlayings(true);
  };

  const pauseMyRec = (): void => {
    waveSurfer.pause();
    setIsPlayings(false);
  };

  return (
    <RecVoice messageId={messageId}>
      {!isPlaying ? (
        <ButtonPlay onClick={playMyRec} />
      ) : (
        <ButtonPause onClick={pauseMyRec}>
          <Icon source={svgPause} css={{ width: '1rem', height: '1.2rem' }} />
        </ButtonPause>
      )}
      <div
        id={`wavesurfer-${messageId}`}
        style={{
          background: `${messageId === 'input' && '#F4F3FE'}`,
          width: '370px',
          borderRadius: '1rem',
        }}
      />

      <Typography
        css={(theme: { color: { lightGray5: string } }) => ({ color: theme.color.lightGray5, marginLeft: '2.1rem' })}
      >
        {timer}
      </Typography>
    </RecVoice>
  );
};
