import { ChangeEvent, useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Input } from './input';

export default {
  title: 'Components/Input',
  component: Input,
} as ComponentMeta<typeof Input>;

export const Default: ComponentStory<typeof Input> = ({ label, placeholder, error }) => {
  const [value, setValue] = useState('');
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
  return <Input label={label} value={value} placeholder={placeholder} error={error} onChange={changeHandler} />;
};

Default.args = {
  label: 'label',
  placeholder: 'Enter some text',
};
