import styled from '@emotion/styled';
import { FC, useEffect, useMemo, useState } from 'react';
import ImageGallery from 'react-image-gallery';

import { Flex, Typography } from '@/components';
import { Icon } from '@/components/icon/icon';

import 'react-image-gallery/styles/css/image-gallery.css';
import './modalProfileGallery.css';

import svgArrowLeftMobile from '#/icons/arrowLeftMobile.svg';
import svgClose from '#/icons/close.svg';
import { getUserSelector } from '@/features/auth/auth.selectors';
import { useSelector } from 'react-redux';
import { galleryApi } from './modalProfileGallery.api';
import { GeneratedForGallery, ModalProfileGalleryResponse } from './modalProfileGallery.types';

interface PropsType {
  isModalClose: (
    e: Event & {
      target: HTMLDivElement;
    },
  ) => void;
  title: string;
  setIsGallery: (data: boolean) => void;
  isGallery: boolean;
  id: string;
}

const WrapModalMember = styled.div(({ theme }) => {
  return {
    position: 'fixed',
    width: '100%',
    height: '100%',
    zIndex: '1',
    left: 0,
    top: 0,
    background: theme.color.transparentGray,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '@media (max-width: 734px)': {
      background: theme.color.bg,
    },
  };
});

const WinModalMembers = styled.div<{ isGallery: boolean }>(({ theme, isGallery }) => {
  return {
    minHeight: 300,
    minWidth: 300,
    maxWidth: 1191,
    width: '100%',
    height: '100%',
    maxHeight: '79vh',
    top: 0,
    right: 0,
    overflowY: !isGallery ? 'scroll' : 'hidden',
    overflowX: 'hidden',
    background: theme.color.white,
    zIndex: 2,
    borderRadius: 10,
    '&::-webkit-scrollbar': { width: 0 },
    '@media (max-width: 1200px)': {
      width: 975,
    },
    '@media (max-width: 980px)': {
      width: 751,
    },
    '@media (max-width: 734px)': {
      maxHeight: '100%',
    },
    '@media (max-width: 690px)': {
      width: 520,
    },
    '@media (max-width: 500px)': {
      width: '100%',
      height: '100%',
      maxHeight: '100vh',
    },
  };
});

const WrapPhotos = styled.div<{ isGallery: boolean }>(({ isGallery }) => {
  return {
    display: !isGallery ? 'grid' : '',
    gridTemplateColumns: !isGallery ? 'repeat(5, 1fr)' : '',
    gridTemplateRows: !isGallery ? '0fr' : '',
    gridColumnGap: '0px',
    gridRowGap: '0px',
    width: isGallery ? '100%' : '',
    '@media (max-width: 1200px)': {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
    '@media (max-width: 980px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
    '@media (max-width: 768px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
      margin: '0 auto',
    },
    '@media (max-width: 500px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
      marginBottom: '7.1rem',
    },
    '@media (max-width: 458px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  };
});

const Photo = styled.div<{ url: string }>(({ url }) => {
  return {
    display: 'block',
    width: '21.3rem',
    height: '21.3rem',

    margin: '0.7rem',
    cursor: 'pointer',
    background: `url(${url}) no-repeat center/cover`,
    '@media (max-width: 768px)': {
      width: '20.3rem',
      height: '20.3rem',
    },
    '@media (max-width: 500px)': {
      width: '11.1rem',
      height: '11.1rem',
      borderRadius: '1rem',
    },
    '@media (max-width:320px)': {
      width: '8.1rem',
      height: '8.1rem',
    },
  };
});

export const ModalProfileGallery: FC<PropsType> = ({ id, isModalClose, title, setIsGallery, isGallery }) => {
  const body = document.querySelector('body');
  const [images, setImages] = useState<ModalProfileGalleryResponse[]>([]);
  const [gallery, setGallery] = useState<GeneratedForGallery[]>([]);
  const user = useSelector(getUserSelector);

  const getGallery = async (): Promise<any> => {
    if (id === user?.id) {
      const response = await galleryApi.getMyGallery().then((res) => {
        return res.json();
      });
      if (response.success) {
        setImages(response.data);
      } else {
        throw response.error;
      }
    } else {
      const response = await galleryApi.getIdGallery(id).then((res) => {
        return res.json();
      });
      if (response.success) {
        setImages(response.data);
      } else {
        throw response.error;
      }
    }
  };

  const galleryMin = useMemo(() => {
    const obj: GeneratedForGallery[] = [];
    images.map((item: ModalProfileGalleryResponse) =>
      obj.push({
        original: `${__BASE_URL_PICTURE__}/${item.fullName}`,
        thumbnail: `${__BASE_URL_PICTURE__}/${item.fullName}`,
      }),
    );
    setGallery(obj);
    return obj;
  }, [images]);

  const viewGallery = (picture: GeneratedForGallery): void => {
    setGallery((item: GeneratedForGallery[]) => [{ original: picture.original, thumbnail: picture.original }, ...item]);
    setIsGallery(true);
  };

  useEffect(() => {
    if (body) body.style.overflow = 'hidden';
    return () => {
      if (body) body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    getGallery();
  }, [id]);

  return (
    <WrapModalMember onClick={(e: any) => isModalClose(e)} data-target="wrapperModalMember">
      <WinModalMembers isGallery={isGallery}>
        <Flex
          css={(theme: any) => ({
            padding: '1.8rem 3.2rem 1.8rem 7.1rem',
            width: '100%',
            borderBottom: `0.1rem solid ${theme.color.darkWhite}`,
            position: 'relative',
            justifyContent: 'space-between',
            '@media (max-width: 734px)': {
              justifyContent: 'center',
              padding: '0.85rem 3.2rem 1rem 7.1rem',
              borderBottom: 'none',
            },
          })}
          alignItems="center"
        >
          <Flex alignItems="center">
            <Typography variant="h1" mr="3rem">
              {title}
            </Typography>
          </Flex>
          <Flex
            onClick={(e: any) => isModalClose(e)}
            data-target="closeButton"
            justifyContent="center"
            alignItems="center"
            css={{ width: 25, height: 25, '@media (max-width: 734px)': { position: 'absolute', left: 9, top: 9 } }}
          >
            <Icon
              source={svgClose}
              css={{ width: 12, height: 12, cursor: 'pointer', '@media (max-width: 734px)': { display: 'none' } }}
            />
            <Icon
              source={svgArrowLeftMobile}
              css={{
                width: '0.9rem',
                height: '1.4rem',
                cursor: 'pointer',
                display: 'none',
                '@media (max-width: 734px)': { display: 'block' },
              }}
            />
          </Flex>
        </Flex>
        <Flex
          css={(theme: any) => ({
            padding: !isGallery && '0 2.8rem',
            height: isGallery && '90%',
            '@media (max-width: 500px)': {
              padding: '0 0.8rem',
              background: theme.color.bg,
              height: '100%',
            },
          })}
        >
          <WrapPhotos isGallery={isGallery}>
            {isGallery ? (
              <ImageGallery
                items={gallery}
                showPlayButton={false}
                showThumbnails={false}
                showFullscreenButton={false}
                infinite={false}
                slideDuration={0}
              />
            ) : (
              galleryMin.map((item, i) => {
                return <Photo url={item.thumbnail} key={i} onClick={() => viewGallery(item)} />;
              })
            )}
          </WrapPhotos>
        </Flex>
      </WinModalMembers>
    </WrapModalMember>
  );
};
