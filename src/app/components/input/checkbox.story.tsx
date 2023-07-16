import React, { ChangeEvent, useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Checkbox } from './checkbox';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

export const Default: ComponentStory<typeof Checkbox> = ({ label }) => {
  const [value, setValue] = useState(false);
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.checked);
  return <Checkbox label={label} name="default-checkbox" checked={value} onChange={changeHandler} />;
};

Default.args = {
  label: 'label',
};
