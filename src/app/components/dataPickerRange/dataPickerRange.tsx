/* eslint-disable react/no-unused-prop-types */
import { forwardRef, FC } from 'react';
import DatePicker from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import styled from '@emotion/styled';

import 'react-datepicker/dist/react-datepicker.css';
import { Flex } from '../box';
import { Typography } from '../typography';

import imgArrowDownGray from '#/img/arrow-down-gray.png';
import imgArrowDownPurple from '#/img/arrow-down-purple.png';

import './datapicker.style.css';

interface TypeProps {
  setDateRange: (data: any) => void;
  startDate: any;
  endDate: any;
  typeArrowPurple: boolean;
  bg: boolean;
  isClearButton: boolean;
  mobileVersion: boolean;
}

const InputDate = styled.div<{ bg: boolean; mobileVersion: boolean; typeArrowPurple: boolean }>(
  ({ theme, bg, mobileVersion, typeArrowPurple }) => {
    return {
      height: '4rem',
      borderRadius: '1rem',
      border: `1px solid ${!bg ? theme.color.bg : theme.colors.white}`,
      padding: '1rem 2rem',
      minWidth: '14rem',
      background: `url(${!typeArrowPurple ? imgArrowDownGray : imgArrowDownPurple}) no-repeat `,
      backgroundPosition: !typeArrowPurple ? '93% center' : '93% center',
      width: '100%',
      fontSize: '1.6rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: !bg ? theme.color.bg : theme.colors.white,

      '@media (max-width: 734px)': mobileVersion && {
        backgroundColor: !bg ? theme.color.bg : theme.colors.white,
        padding: '1rem, 1.6rem 1.3rem 1rem',
        borderRadius: 0,
        height: '5.9rem',
      },
    };
  },
);

// eslint-disable-next-line react/no-unstable-nested-components
const CustomInputDatePicker = forwardRef(({ value, onClick, typeArrowPurple, bg, mobileVersion }: any, ref: any) => (
  <InputDate
    className="example-custom-input"
    onClick={onClick}
    ref={ref}
    bg={bg}
    mobileVersion={mobileVersion}
    typeArrowPurple={typeArrowPurple}
  >
    {value || (
      <Flex css={{ position: 'relative', width: '100%' }}>
        <Typography css={{ width: '100%' }}>Выберите дату</Typography>
      </Flex>
    )}
  </InputDate>
));

export const DataPickerRange: FC<TypeProps> = ({
  setDateRange,
  startDate,
  endDate,
  bg,
  typeArrowPurple,
  isClearButton,
  mobileVersion,
}) => {
  return (
    <DatePicker
      selectsRange
      startDate={startDate}
      endDate={endDate}
      onChange={(update: any) => {
        setDateRange(update);
      }}
      locale={ru}
      dateFormat="P"
      isClearable={isClearButton}
      popperClassName="popperDataPickerRange"
      customInput={<CustomInputDatePicker bg={bg} typeArrowPurple={typeArrowPurple} mobileVersion={mobileVersion} />}
    />
  );
};
