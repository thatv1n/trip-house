import React, { ChangeEvent, useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Radio } from './radio';

export default {
  title: 'Components/Radio',
  component: Radio,
} as ComponentMeta<typeof Radio>;

export const Default: ComponentStory<unknown> = ({ label1, label2 }) => {
  const [value, setValue] = useState('');
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
  return (
    <form>
      <Radio
        label={label1}
        name="default-radio"
        value="radio1"
        checked={value === 'radio1'}
        onChange={changeHandler}
      />
      <Radio
        label={label2}
        name="default-radio"
        value="radio2"
        checked={value === 'radio2'}
        onChange={changeHandler}
      />
    </form>
  );
};

Default.args = {
  label1: 'label1',
  label2: 'label2',
};
