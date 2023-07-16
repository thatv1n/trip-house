import styled from '@emotion/styled';
import { Option } from '@/types';
import { forwardRef, useCallback, useRef, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import Cropper from 'react-cropper';
import { Flex } from '../box';
import { Button } from '../button';
import { Typography } from '../typography';
import debounce from 'lodash.debounce';
import { maxImageUploadSize } from 'src/constants';

const ImgProfile = styled.div<{ url: string }>(({ url }) => {
  return {
    width: '100px',
    height: '100px',
    maxHeight: '35rem',
    borderRadius: '100%',
    background: `url(${url}) center/cover no-repeat`,
    marginBottom: '1rem',
  };
});

interface ImageUploaderProps {
  onChange: (file: Option<File>) => void;
  url: string;
  fileTypes?: string[];
}

export const ImageUploader = forwardRef<HTMLInputElement, ImageUploaderProps>(
  ({ fileTypes = ['JPEG', 'PNG', 'JPG'], url, onChange }, ref) => {
    const [loadFile, setloadFile] = useState<File | null>(null);
    const [error, setError] = useState<Option<string>>('');
    const [cropView, setCropView] = useState<string | null>(null);
    const [isBase64, setIsBase64] = useState(true);

    const cropperRef = useRef<HTMLImageElement>(null);

    const dataURLtoFile = (dataurl: any, filename: string): File => {
      const arr = dataurl.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    };
    const handleChange = (file: File): void => {
      setError(null);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onloadend = (e: any) => {
        setloadFile(e.target.result);
      };
    };

    const onSave = (): void => {
      const file = dataURLtoFile(isBase64, `${Date.now()}.png`);
      if (file.size > maxImageUploadSize) {
        setError('Большой размер файла, размер не должен превышать 10МБ!');
        return;
      }
      onChange(file);
      setCropView(`${isBase64}`);
      setloadFile(null);
    };

    const onCancel = (): void => {
      setloadFile(null);
      onChange(null);
    };

    const onCrop = useCallback(
      debounce(() => {
        const imageElement: any = cropperRef?.current;
        const cropper: any = imageElement?.cropper;
        setIsBase64(cropper.getCroppedCanvas().toDataURL());
      }, 500),
      [],
    );
    return (
      <Flex ref={ref} justifyContent="center">
        {!loadFile ? (
          <FileUploader handleChange={handleChange} name="file" types={fileTypes} onTypeError={setError}>
            <Flex
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              css={{
                width: '100%',
                cursor: 'pointer',
              }}
            >
              <ImgProfile url={cropView ?? url} />
              <Typography variant="body1" color="mainPurple">
                Изменить аватар
              </Typography>
            </Flex>
          </FileUploader>
        ) : (
          <Flex alignItems="center" mb="1rem" flexDirection="column">
            <Cropper
              src={`${loadFile}`}
              style={{ height: 350, width: 305 }}
              initialAspectRatio={16 / 9}
              guides={false}
              crop={onCrop}
              ref={cropperRef}
            />
            <Button onClick={onSave} css={{ margin: '1rem 0', width: '30rem' }}>
              Сохранить и продолжить
            </Button>
            <Button onClick={onCancel} variant="secondary" css={{ width: '30rem' }}>
              Отменить
            </Button>
          </Flex>
        )}
        {error ? <Typography color="red">{error}</Typography> : null}
        {/*
        {errorHandler === 'File type is not supported' && (
          <ErrorForm>Такой тип файла не подходит, допустимые файлы формата JPEG,PNG!</ErrorForm>
        )}
        {errorHandler === 'File size is too big' && (
          <ErrorForm>Большой размер файла, размер не должен превышать 1МБ!</ErrorForm>
        )}
*/}
      </Flex>
    );
  },
);
