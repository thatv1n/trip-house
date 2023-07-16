import { ComponentProps, FC, ReactNode } from 'react';
import styled from '@emotion/styled';
import { Box } from '../box';
import { BreakpointsExpand, Theme } from 'theme';
import { toPercent } from './utils';
import { useTheme } from '@emotion/react';

type Span = number | Partial<Record<keyof BreakpointsExpand, number>>;

interface StyledColProps extends ComponentProps<typeof Box> {
  span?: Span;
}

const generateWidth = (theme: Theme, span?: Span): string | Record<string, string> => {
  if (!span) {
    return '100%';
  }
  if (typeof span === 'number') {
    return toPercent(span / theme.grid.columns);
  }
  return (Object.keys(span) as (keyof BreakpointsExpand)[]).reduce((acc, item) => {
    acc[item] = toPercent(span[item]! / theme.grid.columns);
    return acc;
  }, {} as Record<string, string>);
};

export const StyledCol = styled(Box)<StyledColProps>(({ theme, span }) => {
  return {
    position: 'relative',
    flex: span ? '0 0 auto' : '1 0 0%',
    // width: span ? (generateWidth(span, theme) as string) : '100%',
    maxWidth: '100%',
    paddingLeft: `calc(${theme.grid.gutter} / 2)`,
    paddingRight: `calc(${theme.grid.gutter} / 2)`,
    // ...(span ? theme.mq[span]({ width: generateWidth }) : { width: '100%' }),
  };
});

interface ColProps extends StyledColProps {
  children: ReactNode;
}

export const Col: FC<ColProps> = ({ children, span, ...rest }) => {
  const theme = useTheme();
  return (
    <StyledCol span={span} width={generateWidth(theme, span)} {...rest}>
      {children}
    </StyledCol>
  );
};
