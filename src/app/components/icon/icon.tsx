import { FC } from 'react';
import { Theme } from 'theme';

interface IconProps {
  source: string;
  className?: string;
}

export const Icon: FC<IconProps> = ({ source, className }) => {
  // eslint-disable-next-line react/no-danger
  return <div className={className} dangerouslySetInnerHTML={{ __html: source }} />;
};

export interface SvgIconProps {
  size?: string | number;
  width?: string | number;
  height?: string | number;
  className?: string;
  isInteractive?: boolean;
  isActive?: boolean;
}

export interface SvgIconTemplate {
  width: string;
  height: string;
  className?: string;
  isActive?: boolean;
}

export const createSvgIcon = (
  { size: defaultSize, width: defaultWidth, height: defaultHeight }: SvgIconProps,
  Component: FC<SvgIconTemplate>,
): FC<SvgIconProps> => {
  return ({ size, width, height, className, isInteractive = false, isActive = false, ...rest }: SvgIconProps) => {
    const _width = width || size || defaultWidth || defaultSize || 20;
    const finalWidth = typeof _width === 'number' ? `${_width}px` : _width;
    const _height = height || size || defaultHeight || defaultSize || 20;
    const finalHeight = typeof _height === 'number' ? `${_height}px` : _height;
    return (
      <Component
        css={
          isInteractive
            ? (theme: Theme) => ({
              cursor: 'pointer',
              color: isActive ? theme.palette.secondary.default : theme.color.lightGray,
              '&:hover': {
                color: theme.color.lightPurple,
              },
              '&:active': {
                color: theme.color.darkGray,
              },
            })
            : null
        }
        className={className}
        width={finalWidth}
        height={finalHeight}
        {...rest}
      />
    );
  };
};
